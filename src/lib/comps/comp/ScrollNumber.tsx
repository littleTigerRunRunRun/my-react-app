import { useState, useEffect } from "react"

function NumberUnit(props: {
  num: string,
  x: number,
  height: number,
  attr: React.SVGProps<SVGTextElement>,
  animationDelay: number,
  nums?: Array<string>
}) {
  const nums = props.nums || ['', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  const position = nums.indexOf(props.num)

  return <g className="number-unit" transform={`translate(${props.x}, 0)`}>
    <g mask="url(#svg_pt_csn_mask)">
      <g className="move" style={{
        transform: `translate(0, ${position * -props.height}px)`,
        transitionDelay: `${props.animationDelay}s`
      }}>
        {
          nums.map((num, index) => {
            return <text
              key={index}
              {...props.attr}
              x={0}
              y={index * props.height}
            >
              { num }
            </text>
          })
        }
      </g>
    </g>
  </g>
}

const integerRegex = /^\d+$/

// 4位数以内的带千分符和单位的数字滚动动画
function ScrollNumber(props: {
  count: string,
  // width: number,
  // height: number,
  // interval: number,
  attr: React.SVGProps<SVGTextElement>
}) {
  const [length, setLength] = useState(1)
  const height = 48
  const adu = 0.2
  const [num1, setNum1] = useState('')
  const [num2, setNum2] = useState('')
  const [num3, setNum3] = useState('')
  const [num4, setNum4] = useState('')
  const [num5, setNum5] = useState('')

  useEffect(() => {
    const nums = `${props.count}`.split('').reverse()
    console.log(props.count)
    const pureNums = nums.filter((str) => integerRegex.test(str))
    if (integerRegex.test(nums[0])) {
      setLength(pureNums.length)
      setNum5('')
    } else {
      setLength(pureNums.length - 1)
      setNum5(nums[0])
    }
    setNum1('')
    setNum2('')
    setNum3('')
    setNum4('')
    pureNums.forEach((num, index) => {
      if (index === 0) setNum4(num)
      else if (index === 1) setNum3(num)
      else if (index === 2) setNum2(num)
      else if (index === 3) setNum1(num)
    })
  }, [props.count])

  return <g
    className="comp-scroll-number"
    style={{
      transform: `translate(${(3.5 - length * 0.5) * -25}px, ${height * -0.5 + 10}px)`
    }}
  >
    <NumberUnit
      num={num1}
      x={0}
      height={height}
      attr={props.attr}
      animationDelay={adu * 3}
    />
    <NumberUnit
      num={num2}
      x={25}
      height={height}
      attr={props.attr}
      animationDelay={adu * 2}
    />
    <NumberUnit
      num={num3}
      x={50}
      height={height}
      attr={props.attr}
      animationDelay={adu}
    />
    <NumberUnit
      num={num4}
      x={75}
      height={height}
      attr={props.attr}
      animationDelay={0}
    />
    <NumberUnit
      num={num5}
      x={100}
      height={height}
      attr={props.attr}
      animationDelay={0}
      nums={['', 'K', 'M', 'B']}
    />
  </g>
}

export default ScrollNumber