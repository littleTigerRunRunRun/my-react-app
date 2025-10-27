const fontFamilySetting = 'PingFang SC, Nunito'

export default {
  global: {
    size: {
      width: 1548, // 410 + 688 + 450, 480 = leftWidth 560 = centerWidth 680 = rightWidth
      height: 480, // 只有center有高度
      hp: 50, // 水平方向padding
      vp: 80, // 竖直方向padding
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
    },
    anime: {
      duration: '0.3s',
      delay: '0s'
    }
  },
  // left内容是又对齐的
  left: {
    width: 410, // = iconMaxWidth + paddingIN + nameMaxWidth + paddingNL + lineWidth
    iconStartPosition: 0, // = 0
    nameStartPosition: 72, // = iconMaxWidth + paddingIN
    lineStartPosition: 200, // = iconMaxWidth + paddingIN + nameMaxWidth + paddingNL
    iconMaxWidth: 60,
    nameMaxWidth: 106,
    lineWidth: 210,
    // paddingIN: 12,
    // paddingNL: 22,
    height: 52,
    lineEndHeight: 16,
    iconMaxHeight: 28,
    nameHeight: 24,
    // 会直接赋予name这个text标签的属性
    nameAttr: {
      fontFamily: fontFamilySetting,
      fontSize: 16,
      fill: 'rgba(255, 255, 255, 0.85)',
      dominantBaseline: 'middle',
      textAnchor: 'start'
    },
    innerLineAttr: {
      fill: 'none',
      stroke: 'rgba(255, 255, 255, 0.1)',
      strokeWidth: 2,
      strokeLinecap: 'round'
    },
    flowLineAttr: {
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
    },
    anime: {
      itemsBegin: (i:number) => 0.1 * i + 0.5,
      itemsOpacityDuration: '0.4s',
      itemsMoveDuration: '0.2s',
      lineBegin: (i:number) => 0.1 * i + 0.8,
      lineStartDuration: '0.5s'
    }
  },
  center: {
    size: {
      width: 688, // 540 + 74 * 2
      height: 540
    },
    position: {
      x: 0,
      y: 0
    },
    alertsPosition: 35 + 50,
    incidentsPosition: 688 - 85,
    label: {
      x: 0,
      y: -18,
      fill: '#fff',
      fontWeight: 'bold',
      fontFamily: fontFamilySetting,
      fontSize: 36,
      letterSpacing: 4,
      dominantBaseline: 'middle',
      textAnchor: 'middle'
    },
    count: {
      x: 0,
      y: 26,
      fill: '#ABABAC',
      fontFamily: fontFamilySetting,
      fontSize: 22,
      letterSpacing: 0,
      dominantBaseline: 'middle',
      textAnchor: 'middle'
    },
    anime: {
      duration: '0.5s',
      delay: '1.2s',
      videoPlayDelay: 1800
    }
  },
  // left left comp覆盖配置
  leftLeft: {
    width: 670, // = iconMaxWidth + paddingIN + nameMaxWidth + paddingNT + trafficMaxWidth + paddingTL + lineWidth
    iconStartPosition: 0, // = 0
    nameStartPosition: 72, // = iconMaxWidth + paddingIN
    trafficStartPosition: 221, // = iconMaxWidth + paddingIN + nameMaxWidth + paddingNT
    lineStartPosition: 370, // = width - lineWidth
    iconMaxWidth: 60,
    nameMaxWidth: 127,
    trafficMaxWidth: 127,
    lineWidth: 300,
    // paddingIN: 12,
    // paddingNT: 22,
    // paddingTL: 22
    height: 52,
    lineEndHeight: 16,
    iconMaxHeight: 28,
    nameHeight: 24,
  },
  right: {
    size: {
      width: 450,
      height: 0 // free
    },
    position: {
      x: -48,
      y: 0
    },
    label: {
      x: 0,
      y: -16,
      fill: '#fff',
      fontWeight: 'bold',
      fontFamily: fontFamilySetting,
      fontSize: 32,
      letterSpacing: 4,
      dominantBaseline: 'middle',
      textAnchor: 'middle'
    },
    count: {
      x: 0,
      y: 16,
      fill: '#ABABAC',
      fontFamily: fontFamilySetting,
      fontSize: 20,
      letterSpacing: 1,
      dominantBaseline: 'middle',
      textAnchor: 'middle'
    },
    icon: {
      r: 28
    },
    automatedPosition: {
      text: { x: 169, y: -248 },
      icon: { x: 169, y: -176 }
    },
    resolvedIncidentsPosition: {
      text: { x: 362, y: -248 },
      icon: { x: 362, y: -176 }
    },
    manualPosition: {
      text: { x: 169, y: 250 },
      icon: { x: 169, y: 172 }
    },
    openIncidentsPosition: {
      text: { x: 362, y: 250 },
      icon: { x: 362, y: 172 }
    },
    anime: {
      // lineBegin1: '1.6s',
      // lineBegin2: '2.2s',
      // nodeBegin1: '2.1s',
      // nodeBegin2: '2.7s',
      lineBegin1: '2.6s',
      lineBegin2: '3.2s',
      nodeBegin1: '3.1s',
      nodeBegin2: '3.7s',
      nodeDuration: '0.3s'
    }
  },
  leftRight: {
    size: {
      width: 650,
      height: 454 // 中间放射线圆的直径
    },
    innerRadius: 90,
    mediumRadius: 140,
    outerStartRadius: 154,
    outerEndRadius: 227,
    keywordRadius: 40,
    textAttr: {
      percentNumber: {
        x: -10,
        y: -32,
        fill: '#fff',
        fontSize: 36,
        fontFamily: fontFamilySetting,
        dominantBaseline: 'middle',
        textAnchor: 'middle'
      },
      percent: {
        x: 24,
        y: -26,
        fill: '#fff',
        fontSize: 16,
        fontFamily: fontFamilySetting,
        dominantBaseline: 'middle',
        textAnchor: 'middle'
      },
      name: {
        x: 0,
        y: 12,
        fill: '#ABABAC',
        fontSize: 20,
        fontFamily: fontFamilySetting,
        dominantBaseline: 'middle',
        textAnchor: 'middle'
      },
      num: {
        x: 0,
        y: 44,
        fill: '#fff',
        fontSize: 14,
        fontFamily: fontFamilySetting,
        dominantBaseline: 'middle',
        textAnchor: 'middle'
      },
      keywordOneLine: {
        fill: '#ABABAC',
        fontSize: 20,
        fontFamily: fontFamilySetting,
        dominantBaseline: 'middle',
        textAnchor: 'middle'
      },
      keywordTwoLine: {
        y: -18,
        fill: '#ABABAC',
        fontSize: 12,
        fontFamily: fontFamilySetting,
        dominantBaseline: 'middle',
        textAnchor: 'middle'
      },
      ktlOne: {
      },
      ktlTwo: {
        x: 0,
        dy: 18
      }
    }
  },
  component: {
    node: {
      r: 28,
      radiusRate: 0.15, // 越大圆角越大
      radiusR: 0.2,
      fill: '#000',
      iconSize: 32
    },
    glowBezier: {
      anime: {
        createDuration: '0.6s',
        flowDuration: '3s'
      }
    }
  }
}
