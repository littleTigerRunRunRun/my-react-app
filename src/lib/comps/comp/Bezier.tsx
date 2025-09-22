
// 从一个起点到一个终点连一根线
function Bezier(props: {
  start: { x: number, y: number },
  end: { x: number, y: number },
  extendS?: number,
  extendE?: number,
  bezier: [number, number, number, number],
  transform?: string,
  fill?: string,
  fillOpacity?: number,
  stroke?: string,
  strokeWidth?: number,
  strokeOpacity?: number
}) {
  const extendS = props.extendS || 0
  const extendE = props.extendE || 0

  let path = ''
  // 起始点
  path += `M${props.start.x},${props.start.y}`
  // 存在横向起始扩展
  if (props.extendS) {
    path += ` L${props.start.x + props.extendS},${props.start.y}`
  }
  // 贝塞尔曲线本体，终点取决于
  path += `
    C${props.start.x + extendS + props.bezier[0]},${props.start.y + props.bezier[1]}
      ${props.end.x - extendE - props.bezier[2]},${props.end.y - props.bezier[3]}
      ${props.end.x - extendE},${props.end.y}
  `
  // 存在横向结束扩展
  // 结束点被包含在贝塞尔曲线的终点上
  if (extendE) {
    path += ` Z${props.end.x},${props.end.y}`
  }

  return <path
    d={path}
    transform={props.transform}
    fill={props.fill}
    fillOpacity={props.fillOpacity}
    stroke={props.stroke}
    strokeWidth={props.strokeWidth}
    strokeOpacity={props.strokeOpacity}
  />
}

export default Bezier