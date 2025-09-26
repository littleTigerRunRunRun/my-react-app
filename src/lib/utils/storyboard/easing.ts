export type EasingType = 'linear' | 'easeIn' | 'easeOut' | 'easeInOut' | 'goback' | 'smoothGoback' | 'turnBackIn1' | 'turnBackIn2' | 'turnBackOut1' | 'turnBackOut2'

export type EasingFunction = (t: number, b: number, e: number, d: number) => number

// 使得value不小于min不大于max
function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value))
}

const bezier = (():((mX1:number, mY1:number, mX2:number, mY2:number) => ((aX:number)=>number)|undefined) => {
  const kSplineTableSize = 11
  const kSampleStepSize = 1.0 / (kSplineTableSize - 1.0)

  function A(aA1:number, aA2:number) { return 1.0 - 3.0 * aA2 + 3.0 * aA1 };
  function B(aA1:number, aA2:number) { return 3.0 * aA2 - 6.0 * aA1 };
  function C(aA1:number) { return 3.0 * aA1 };

  // 等价于 f(x, y) = (0, 0)t^3 + P1(1 - t)t^2 + P2(1 - t)^2 * t + (1, 1)t^3
  function calcBezier(aT:number, aA1:number, aA2:number) { return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT };
  function getSlope(aT:number, aA1:number, aA2:number) { return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1) };

  function binarySubdivide(aX:number, aA:number, aB:number, mX1:number, mX2:number) {
    let currentX; let currentT; let i = 0
    do {
      currentT = aA + (aB - aA) / 2.0
      currentX = calcBezier(currentT, mX1, mX2) - aX
      if (currentX > 0.0) { aB = currentT } else { aA = currentT };
    } while (Math.abs(currentX) > 0.0000001 && ++i < 10)
    return currentT
  }

  function newtonRaphsonIterate(aX:number, aGuessT:number, mX1:number, mX2:number) {
    for (let i = 0; i < 4; ++i) {
      const currentSlope = getSlope(aGuessT, mX1, mX2)
      if (currentSlope === 0.0) return aGuessT
      const currentX = calcBezier(aGuessT, mX1, mX2) - aX
      aGuessT -= currentX / currentSlope
    }
    return aGuessT
  }

  function bezier(mX1:number, mY1:number, mX2:number, mY2:number):((aX:number)=>number)|undefined {
    if (!(mX1 >= 0 && mX1 <= 1 && mX2 >= 0 && mX2 <= 1)) return
    const sampleValues = new Float32Array(kSplineTableSize)

    if (mX1 !== mY1 || mX2 !== mY2) {
      for (let i = 0; i < kSplineTableSize; ++i) {
        sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2)
      }
    }

    function getTForX(aX:number) {
      let intervalStart = 0
      let currentSample = 1
      const lastSample = kSplineTableSize - 1

      for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
        intervalStart += kSampleStepSize
      }

      --currentSample

      const dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample])
      const guessForT = intervalStart + dist * kSampleStepSize
      const initialSlope = getSlope(guessForT, mX1, mX2)

      if (initialSlope >= 0.001) {
        return newtonRaphsonIterate(aX, guessForT, mX1, mX2)
      } else if (initialSlope === 0.0) {
        return guessForT
      } else {
        return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2)
      }
    }

    return (x:number) => {
      if (mX1 === mY1 && mX2 === mY2) return x
      if (x === 0 || x === 1) return x
      return calcBezier(getTForX(x), mY1, mY2)
    }
  }

  return bezier
})()

export const Easing: Record<string, EasingFunction> = new Proxy({
  // t=当前动画运行了多长时间,b=动画开始位置,c动画结束位置,d=动画总时长,p是处理后的当前时间占比percent
  // t = total = 当前动画运行了多长时间
  // b = begin = 动画开始位置
  // e = end = 动画结束位置
  // d = duration = 动画总时长
  // p = percent 是一个中间计算量，表示动画运行百分比
  linear(t: number, b: number, e: number, d: number): number {
    const p: number = clamp(t, 0, d) / d
    return ((e - b) * p + b)
  },
  easeIn(t: number, b: number, e: number, d: number): number {
    const p: number = clamp(t, 0, d) / d
    return (e - b) * p * p * p + b
  },
  easeOut(t: number, b: number, e: number, d: number): number {
    const p: number = 1 - clamp(t, 0, d) / d
    return (e - b) * (1 - p * p * p) + b
  },
  easeInOut(t: number, b: number, e: number, d: number): number {
    let p = clamp(t, 0, d) / d
    if (p < 0.5) {
      p = p * 2
      return (e - b) * p * p * p * 0.5 + b
    } else {
      p = 2 - p * 2
      return (e - b) * (1 - p * p * p * 0.5) + b
    }
  },
  goback(t: number, b: number, e: number, d: number): number {
    const p: number = clamp(t, 0, d) / d
    return (e - b) * Math.sin(p * Math.PI) + b
  },
  smoothGoBack(t: number, b: number, e: number, d: number): number {
    const p: number = clamp(t, 0, d) / d
    return (e - b) * (Math.sin(p * Math.PI * 2 - Math.PI * 0.5) * 0.5 + 0.5) + b
  },
  turnBackIn1(t: number, b: number, e: number, d: number): number {
    const p: number = clamp(t, 0, d) / d - 0.1
    return (e - b) * (5 / 4 * p * p - 1 / 60) + b
  },
  turnBackIn2(t: number, b: number, e: number, d: number): number {
    const p: number = clamp(t, 0, d) / d - 0.2
    return (e - b) * (5 / 3 * p * p - 1 / 15) + b
  },
  turnBackOut1(t: number, b: number, e: number, d: number): number {
    const p: number = clamp(t, 0, d) / d - 0.9
    return (e - b) * (-5 / 4 * p * p + 61 / 60) + b
  },
  turnBackOut2(t: number, b: number, e: number, d: number): number {
    const p: number = clamp(t, 0, d) / d - 0.8
    return (e - b) * (-5 / 3 * p * p + 16 / 15) + b
  }
}, {
  get(target:Record<string, EasingFunction>, propKey:string) {
    if (target.hasOwnProperty(propKey)) return target[propKey]
    if (propKey.indexOf('cubic-bezier') > -1) {
      // 使用的是贝塞尔曲线
      try {
        const argus:Array<number> = propKey.split('(')[1].split(')')[0].split(',').map((str) => parseFloat(str))
        const bz:((aX:number) => number) | undefined = bezier(argus[0], argus[1], argus[2], argus[3])
        if (bz) {
          target[propKey] = function(t, b, e, d) {
            return b + (e - b) * bz(clamp(t, 0, d) / d)
          }
        }
        return target[propKey]
      } catch (e) {
        console.log(e)
      }
    }
    return target.linear
  }
})
