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
    },
    innerLineAttr: {
      fill: 'none',
      stroke: '#fff',
      strokeWidth: 2,
      strokeLinecap: 'round'
    },
    outerLineAttr: {
      fill: 'none',
      stroke: 'rgba(255, 255, 255, 0.2)',
      strokeWidth: 8,
      strokeLinecap: 'round'
    },
    linePoint: {
      normalAttr: {
        r: 3.5, // (outerLineAttr.strokeWidth - 1) * 0.5
        fill: '#000000',
        stroke: 'rgba(255, 255, 255, 0.5',
        strokeWidth: 0.5,
      },
      danger: {
        r: 12
      }
    }
  },
  center: {
    size: {
      width: 540,
      height: 540
    },
    position: {
      x: -77,
      y: 0
    },
    alertsPosition: 540 * -0.5 + 110 * 0.5, // 540 = CC.size.width 110 = CC.alerts.width
    incidentsPosition: 540 * 0.5 - 110 * 0.5,
    label: {
      x: 0,
      y: -22,
      fill: '#fff',
      fontWeight: 'bold',
      fontFamily: '苹方-简 中粗体',
      fontSize: 36,
      letterSpacing: 4,
      dominantBaseline: 'middle',
      textAnchor: 'middle'
    },
    count: {
      x: 0,
      y: 22,
      fill: '#929293',
      fontFamily: '苹方-简 中粗体',
      fontSize: 22,
      letterSpacing: 1,
      dominantBaseline: 'middle',
      textAnchor: 'middle'
    }
  },
  right: {
    size: {
      width: 554,
      height: 0 // free
    }
  }
}