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
  // left内容是又对齐的
  left: {
    size: {
      width: 480,
      height: 480 // free
    },
    position: {
      x: -20,
      y: 0
    },
    source: {
      width: 300,
      height: 50,
      picHeight: 32,
      x: -30,
      lineEndRate: -0.427,
      normalPoint: {
        r: 5,
        fill: '#000000',
        strokeWidth: 2,
        stroke: '#97ACBD',
        lineStroke: '#97ACBD'
      },
      dangerPoint: {
        r: 10,
        fill: 'url(#svg_pt_rg_dangerPoint)',
        strokeWidth: 0,
        stroke: 'transparent',
        lineStroke: '#FE191E'
      }
    },
    arc: {
      r: 400,
      cx: -450,
      opacity: 0.6,
      stroke: '#97ACBD',
      strokeWidth: 2,
      outerLineStrokeWidth: 9,
      outerLineOpacty: 0.2
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
      thickness: 1,
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
    },
    pointsLayer: [
      { r: 78, size: 2.8, num: 23 },
      { r: 59, size: 2.4, num: 23 },
      { r: 40, size: 1.6, num: 23 },
      { r: 30, size: 1.5, num: 19 },
      { r: 19, size: 1.4, num: 11 }
    ],
    column: {
      leftPosition: { x: -240, y: 0 },
      rightPosition: { x: 240, y: 0 },
      label: { size: 14, color: '#848484', spacing: 2, position: { x: 0, y: 14 } },
      count: { size: 28, color: '#FBFBFB', spacing: 2, position: { x: 0, y: -16 } }
    }
  },
  right: {
    size: {
      width: 680,
      height: 0 // free
    }
  }
}