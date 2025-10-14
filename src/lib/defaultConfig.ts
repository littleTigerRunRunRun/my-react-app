export default {
  global: {
    size: {
      width: 400 + 540 + 554, // 480 = leftWidth 560 = centerWidth 680 = rightWidth
      height: 480, // 只有center有高度
      hp: 120, // 水平方向padding
      vp: 100, // 竖直方向padding
    },
    color: {
      safe: '#01FEF7',
      low: '#0F8CF0',
      middle: '#EB9600',
      high: '#CD3737',
      critical: '#8A0207'
    },
    comp: {
      LabelCount: {
        label: { size: 14, color: '#848484', spacing: 2, position: { x: 0, y: 14 }, nextLine: 20 },
        count: { size: 28, color: '#FBFBFB', spacing: 2, position: { x: 0, y: -16 } }
      }
    }
  },
  // left内容是又对齐的
  left: {
    width: 400, // = iconMaxWidth + paddingIN + nameMaxWidth + paddingNL + lineWidth
    iconStartPosition: 0, // = 0
    nameStartPosition: 72, // = iconMaxWidth + paddingIN
    lineStartPosition: 200, // = iconMaxWidth + paddingIN + nameMaxWidth + paddingNL
    iconMaxWidth: 60,
    nameMaxWidth: 106,
    lineWidth: 200,
    // paddingIN: 12,
    // paddingNL: 22,
    height: 52,
    lineEndHeight: 16,
    iconMaxHeight: 28,
    nameHeight: 24,
    // 会直接赋予name这个text标签的属性
    nameAttr: {
      fontFamily: 'PingFang',
      fontSize: 16,
      fill: 'rgba(255, 255, 255, 0.85)',
      dominantBaseline: 'middle',
      textAnchor: 'start'
    }
  },
  center: {
    size: {
      width: 540,
      height: 480
    },
    position: {
      x: -77,
      y: 0
    },
    bgFenceCircle: {
      r: 240,
      width: 40,
      thickness: 1,
      num: 150,
      opacity: {
        safe: 0.25,
        low: 0.3,
        middle: 0.25,
        high: 0.35,
        critical: 0.4
      }
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
      { r: 78, size: 2.8, num: 24 },
      { r: 59, size: 2.4, num: 23 },
      { r: 40, size: 1.6, num: 23 },
      { r: 30, size: 1.5, num: 19 },
      { r: 19, size: 1.4, num: 11 }
    ],
    column: {
      leftPosition: { x: -240, y: 0 },
      rightPosition: { x: 240, y: 0 }
    }
  },
  right: {
    size: {
      width: 554,
      height: 0 // free
    }
  }
}