// 将数字转成千分格式
export function formatNumber(num:number, precision = 2) {
  const units = ['', 'K', 'M', 'B', 'T'];
  const threshold = 1000;
  
  if (Math.abs(num) < threshold) {
    return num.toString();
  }

  const exp = Math.floor(Math.log10(Math.abs(num)) / 3);
  const value = num / Math.pow(threshold, exp);
  
  // 处理精度为0时去掉小数点
  const formattedValue = precision === 0 
    ? Math.round(value)
    : value.toFixed(precision);
  
  return formattedValue + units[exp];
}

// 生成一个贝塞尔曲线
export function getBezier(props: {
  start: { x: number, y: number },
  end: { x: number, y: number },
  extendS?: number,
  extendE?: number,
  bezier: [number, number, number, number]
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
    path += ` L${props.end.x},${props.end.y}`
  }

  return path
}