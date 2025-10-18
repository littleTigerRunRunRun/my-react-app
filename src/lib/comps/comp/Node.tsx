import DC from '../../defaultConfig'
const CN = DC.component.node

const sin60 = 0.866025
const getNodePath = (r:number) => {
  const xr = r * sin60
  const rate = CN.radiusRate // radius rate
  const rr = r * CN.radiusR // radius r
  const points = [
    { x: xr * (rate - 1), y: r * 0.5 * (-1 - rate), even: false },
    { x: xr * -rate, y: r * 0.5 * (rate - 2), even: true },
    { x: xr * rate, y: r * 0.5 * (rate - 2), even: false },
    { x: xr * (1 - rate), y: r * 0.5 * (-1 - rate), even: true },
    { x: xr, y: r * 0.5 * (rate - 1), even: false },
    { x: xr, y: r * 0.5 * (1 - rate), even: true },
    { x: xr * (1 - rate), y: r * 0.5 * (1 + rate), even: false },
    { x: xr * rate, y: r * 0.5 * (2 - rate), even: true },
    { x: xr * -rate, y: r * 0.5 * (2 - rate), even: false },
    { x: xr * (rate - 1), y: r * 0.5 * (1 + rate), even: true },
    { x: -xr, y: r * 0.5 * (1 - rate), even: false },
    { x: -xr, y: r * 0.5 * (rate - 1), even: true },
    { x: xr * (rate - 1), y: r * 0.5 * (-1 - rate), even: false },

    // { x: xr * rate, y: r * 0.5 * (1 - rate), even: false },
    // { x: xr * (1 - rate), y: r * 0.5 * rate, even: true },
    // { x: xr * (1 + rate), y: r * 0.5 * rate, even: false },
    // { x: xr * (2 - rate), y: r * 0.5 * (1 - rate), even: true },
    // { x: xr * 2, y: r * 0.5 * (1 + rate), even: false },
    // { x: xr * 2, y: r * 0.5 * (3 - rate), even: true },
    // { x: xr * (2 - rate), y: r * 0.5 * (3 + rate), even: false },
    // { x: xr * (1 + rate), y: r * 0.5 * (4 - rate), even: true },
    // { x: xr * (1 - rate), y: r * 0.5 * (4 - rate), even: false },
    // { x: xr * rate, y: r * 0.5 * (3 + rate), even: true },
    // { x: 0, y: r * 0.5 * (3 - rate), even: false },
    // { x: 0, y: r * 0.5 * (1 + rate), even: true },
    // { x: xr * rate, y: r * 0.5 * (1 - rate), even: false }
  ]
  let path = ''
  points.forEach((point, index) => {
    if (!point.even) {
      if (index === 0) path += 'M'
      else path += `A${rr},${rr} 0 0 1 `
    } else path += 'L'

    path += `${point.x},${point.y} `
  })
  path += `Z`
  return path
}

const styles = {
  blue: {
    borderLG: 'svg_pt_comp_node_lg_1',
    bg: '#008FFF',
    glow: 'drop-shadow(0px 0px 10px #008FFF)'
  },
  cyan: {
    borderLG: 'svg_pt_comp_node_lg_2',
    bg: '#00DEFE',
    glow: 'drop-shadow(0px 0px 10px #00DEFE)'
  }
}

// 从一个起点到一个终点连一根线
function Node(props: {
  keyword: string,
  style: 'blue' | 'cyan',
  icon: string,
  x: number,
  y: number
}) {
  const innerPath = getNodePath(CN.r)
  const outerPath = getNodePath(CN.r + 2)
  const style = styles[props.style]
  const more = 2
  
  // filter="url(#basicGlow)"
  return <g
    className="comp-interact-node"
    transform={`translate(${props.x}, ${props.y})`}
    filter={style.glow}
  >
    <defs>
      <mask id={`svg_pt_mask_node_${props.keyword}`}>
        <path
          className="outer-path"
          d={`${outerPath}`}
          fill="#fff"
        />
      </mask>
    </defs>
    {/* mask={`url(#svg_pt_mask_node_${props.keyword})`} */}
    <g className="node-border" mask={`url(#svg_pt_mask_node_${props.keyword})`}>
      <rect
        x={-CN.r - more}
        y={-CN.r - more}
        width={CN.r + more}
        height={CN.r * 2 + more * 2}
        fill={`url(#${style.borderLG})`}
      />
      <rect
        x={-1}
        y={-CN.r - more}
        width={CN.r + more + 1}
        height={CN.r * 2 + more * 2}
        fill={style.bg}
      />
    </g>
    <path
      className="inner-path"
      d={`${innerPath}`}
      fill={CN.fill}
    />
    <image
      href={props.icon}
      x={CN.iconSize * -0.5}
      y={CN.iconSize * -0.5}
      width={CN.iconSize}
      height={CN.iconSize}
    />
    {/* <rect width="10" height="10" x="-5" y="-5" fill="#fff" /> */}
  </g>
}

export default Node