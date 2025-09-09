export default {
  global: {
    size: {
      width: 480 + 560 + 680, // 480 = leftWidth 560 = centerWidth 680 = rightWidth
      height: 480, // 只有center有高度
      hp: 120, // 水平方向padding
      vp: 200, // 竖直方向padding
    },
    color: {
      safe: '#01FEF7',
      low: '#0F8CF0',
      middle: '#EB9600',
      high: '#CD3737',
      critical‌: '#8A0207'
    }
  },
  left: {
    size: {
      width: 480,
      height: 0 // free
    }
  },
  center: {
    size: {
      width: 560,
      height: 480
    },
    position: {
      x: 0,
      y: 0
    },
    bgFenceCircle: {
      r: 240,
      width: 40,
      thickness: 2,
      num: 150,
      opacity: 0.1
    },
    bgOuterCircle: {
      r: 133,
      width: 3,
      opacity: 1
    },
    bgInnerCircle: {
      r: 123,
      width: 2,
      opacity: 0.6
    }
  },
  right: {
    size: {
      width: 680,
      height: 0 // free
    }
  }
}