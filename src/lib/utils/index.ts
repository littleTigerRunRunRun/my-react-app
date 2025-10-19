// 将数字转成千分格式
export function formatNumberWithCommas(num:number) {
  if (isNaN(num)) return 'Invalid Number';
  
  // 处理字符串类型的数字输入
  const str = String(num);
  
  // 分割整数和小数部分
  const parts = str.split('.');
  let integerPart = parts[0];
  const decimalPart = parts.length > 1 ? `.${parts[1]}` : '';
  
  // 添加千分符
  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
  return integerPart + decimalPart;
}

// 生成一个贝塞尔曲线
export function getBezier(props: {
  start: { x: number, y: number },
  end: { x: number, y: number },
  extendS?: number,
  extendE?: number,
  bezier: [number, number, number, number],
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

// M0,-4
// C20,-4
//   173,-4
//   193,-4
// L193,4
// C173,4 
//   20,4 
//   0,-4
// Z

// 生成一个贝塞尔曲线
export function getFillBezier(props: {
  start: { x: number, y: number },
  end: { x: number, y: number },
  extendS?: number,
  extendE?: number,
  bezier: [number, number, number, number],
  thickness: number
}) {
  const extendS = props.extendS || 0
  const extendE = props.extendE || 0
  const ht = props.thickness * 0.5

  let path = ''
  // 起始点
  path += `M${props.start.x},${props.start.y - ht}`
  // 存在横向起始扩展
  if (props.extendS) {
    path += ` L${props.start.x + props.extendS},${props.start.y - ht}`
  }
  // 贝塞尔曲线本体，终点取决于
  path += `
    C${props.start.x + extendS + props.bezier[0]},${props.start.y + props.bezier[1] - ht}
      ${props.end.x - extendE - props.bezier[2]},${props.end.y - props.bezier[3] - ht}
      ${props.end.x - extendE},${props.end.y - ht}
  `
  // 存在横向结束扩展
  // 结束点被包含在贝塞尔曲线的终点上
  if (extendE) {
    path += ` L${props.end.x},${props.end.y - ht}`
    path += ` L${props.end.x},${props.end.y + ht}`
  }
  path += `L${props.end.x - extendE},${props.end.y + ht}`
  path += `
    C${props.end.x - extendE - props.bezier[2]},${props.end.y - props.bezier[3] + ht} 
      ${props.start.x + extendS + props.bezier[0]},${props.start.y + props.bezier[1] + ht} 
      ${props.start.x + extendS},${props.start.y + ht}
  `

  if (props.extendS) {
    path += ` L${props.start.x},${props.start.y + ht} `
  }

  path += 'Z'

  console.log(path)

  return path
}