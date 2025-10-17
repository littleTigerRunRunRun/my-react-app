import DC from '../../defaultConfig'
const CN = DC.component.node

// 从一个起点到一个终点连一根线
function Node(props: {
  icon: string,
  x: number,
  y: number
}) {
  const r = CN.r
  const sin60 = 0.866025
  const xr = r * sin60
  const rate = CN.radiusRate // radius rate
  const rr = r * CN.radiusR // radius r
  const points = [
    { x: xr * rate, y: r * 0.5 * (1 - rate), even: false },
    { x: xr * (1 - rate), y: r * 0.5 * rate, even: true },
    { x: xr * (1 + rate), y: r * 0.5 * rate, even: false },
    { x: xr * (2 - rate), y: r * 0.5 * (1 - rate), even: true },
    { x: xr * 2, y: r * 0.5 * (1 + rate), even: false },
    { x: xr * 2, y: r * 0.5 * (3 - rate), even: true },
    { x: xr * (2 - rate), y: r * 0.5 * (3 + rate), even: false },
    { x: xr * (1 + rate), y: r * 0.5 * (4 - rate), even: true },
    { x: xr * (1 - rate), y: r * 0.5 * (4 - rate), even: false },
    { x: xr * rate, y: r * 0.5 * (3 + rate), even: true },
    { x: 0, y: r * 0.5 * (3 - rate), even: false },
    { x: 0, y: r * 0.5 * (1 + rate), even: true },
    { x: xr * rate, y: r * 0.5 * (1 - rate), even: false }
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

  return <g
    className="interact-node"
    transform={`translate(${props.x - r * sin60}, ${props.y - r})`}
  >
    <path
      d={`${path}`}
      fill={CN.fill}
      filter="url(#basicGlow)"
    />
    <image
      href={props.icon}
      x={r *sin60 - CN.iconSize * 0.5}
      y={r - CN.iconSize * 0.5}
      width={CN.iconSize}
      height={CN.iconSize}
    />
  </g>
}

export default Node