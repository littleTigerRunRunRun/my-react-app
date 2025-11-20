/**
 * 将数字转换为K、M、B单位并保持4位有效数字
 * @param {number} num - 需要格式化的数字
 * @returns {string} 格式化后的字符串
 */
/**
 * 将数字格式化为最多4位整数部分加K/M/B单位
 * @param {number} num - 要格式化的数字
 * @returns {string} 格式化后的字符串
 */
export function limit4(num: number) {
  if (typeof num !== "number" || isNaN(num)) {
    return "0";
  }

  if (num < 10000) return `${num}`;
  else if (num < 10000000) return `${Math.round(num / 1000)}K`;
  else if (num < 10000000000) return `${Math.round(num / 1000000)}M`;
  else return `${Math.round(num / 1000000000)}B`;
}

export function formatNumberTo4SignificantDigits(
  num: number,
  units: Array<{ threshold: number; unit: string }> = [
    { threshold: 1e9, unit: "B" },
    { threshold: 1e6, unit: "M" },
    { threshold: 1e3, unit: "K" },
  ]
) {
  if (typeof num !== "number" || isNaN(num)) {
    return "无效输入";
  }

  const isNegative = num < 0;
  let absoluteValue = Math.abs(num);

  // 处理0
  if (absoluteValue === 0) return "0";

  // 处理极小的数字
  if (absoluteValue < 0.0001) {
    return absoluteValue.toExponential(3);
  }

  // const units = [
  //   { threshold: 1e9, unit: 'B' },  // 十亿
  //   { threshold: 1e6, unit: 'M' },   // 百万
  //   { threshold: 1e3, unit: 'K' }    // 千
  // ];

  // 查找合适的单位
  for (const unitInfo of units) {
    if (absoluteValue >= unitInfo.threshold) {
      const dividedValue = absoluteValue / unitInfo.threshold;
      return formatSignificantDigits(dividedValue, unitInfo.unit, isNegative);
    }
  }

  // 小于1000的数字
  return formatSignificantDigits(absoluteValue, "", isNegative);
}

/**
 * 将数字格式化为4位有效数字
 */
function formatSignificantDigits(
  value: number,
  unit: string,
  isNegative: boolean
) {
  const sign = isNegative ? "-" : "";

  // 计算有效数字
  if (value === 0) return "0";

  // 使用toPrecision方法获取4位有效数字
  let formatted = value.toPrecision(4);

  // 移除末尾多余的0和小数点
  formatted = formatted.replace(/\.?0+$/, "");

  // 检查是否需要科学计数法
  if (formatted.includes("e")) {
    return sign + formatted + unit;
  }

  // 移除可能出现的多余小数点
  if (formatted.endsWith(".")) {
    formatted = formatted.slice(0, -1);
  }

  return sign + formatted + unit;
}

// 将数字转成千分格式
export function formatNumberWithCommas(num: number) {
  if (isNaN(num)) return "Invalid Number";

  // 处理字符串类型的数字输入
  const str = String(num);

  // 分割整数和小数部分
  const parts = str.split(".");
  let integerPart = parts[0];
  const decimalPart = parts.length > 1 ? `.${parts[1]}` : "";

  // 添加千分符
  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return integerPart + decimalPart;
}

// 生成一个贝塞尔曲线
export function getBezier(props: {
  start: { x: number; y: number };
  end: { x: number; y: number };
  extendS?: number;
  extendE?: number;
  bezier: [number, number, number, number];
}) {
  const extendS = props.extendS || 0;
  const extendE = props.extendE || 0;

  let path = "";
  // 起始点
  path += `M${props.start.x},${props.start.y}`;
  // 存在横向起始扩展
  if (props.extendS) {
    path += ` L${props.start.x + props.extendS},${props.start.y}`;
  }
  // 贝塞尔曲线本体，终点取决于
  path += `
    C${props.start.x + extendS + props.bezier[0]},${
    props.start.y + props.bezier[1]
  }
      ${props.end.x - extendE - props.bezier[2]},${
    props.end.y - props.bezier[3]
  }
      ${props.end.x - extendE},${props.end.y}
  `;
  // 存在横向结束扩展
  // 结束点被包含在贝塞尔曲线的终点上
  if (extendE) {
    path += ` L${props.end.x},${props.end.y}`;
  }

  return path;
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
  start: { x: number; y: number };
  end: { x: number; y: number };
  extendS?: number;
  extendE?: number;
  bezier: [number, number, number, number];
  thickness: number;
}) {
  const extendS = props.extendS || 0;
  const extendE = props.extendE || 0;
  const ht = props.thickness * 0.5;

  let path = "";
  // 起始点
  path += `M${props.start.x},${props.start.y - ht}`;
  // 存在横向起始扩展
  if (props.extendS) {
    path += ` L${props.start.x + props.extendS},${props.start.y - ht}`;
  }
  // 贝塞尔曲线本体，终点取决于
  path += `
    C${props.start.x + extendS + props.bezier[0]},${
    props.start.y + props.bezier[1] - ht
  }
      ${props.end.x - extendE - props.bezier[2]},${
    props.end.y - props.bezier[3] - ht
  }
      ${props.end.x - extendE},${props.end.y - ht}
  `;
  // 存在横向结束扩展
  // 结束点被包含在贝塞尔曲线的终点上
  if (extendE) {
    path += ` L${props.end.x},${props.end.y - ht}`;
    path += ` L${props.end.x},${props.end.y + ht}`;
  }
  path += `L${props.end.x - extendE},${props.end.y + ht}`;
  path += `
    C${props.end.x - extendE - props.bezier[2]},${
    props.end.y - props.bezier[3] + ht
  } 
      ${props.start.x + extendS + props.bezier[0]},${
    props.start.y + props.bezier[1] + ht
  } 
      ${props.start.x + extendS},${props.start.y + ht}
  `;

  if (props.extendS) {
    path += ` L${props.start.x},${props.start.y + ht} `;
  }

  path += "Z";

  console.log(path);

  return path;
}

export function textLengthLimit(
  text: string,
  fontSize: number,
  length: number,
  start = 1
) {
  const totalLength = getTextWidth(text, "PingFang SC, Nunito", fontSize);
  if (totalLength <= length) return text;

  let sliceLength = start;
  let textLength = getTextWidth(
    text.slice(0, sliceLength),
    "PingFang SC, Nunito",
    fontSize
  );
  while (textLength < length) {
    sliceLength++;
    textLength = getTextWidth(
      text.slice(0, sliceLength),
      "PingFang SC, Nunito",
      fontSize
    );
  }
  sliceLength--;
  return text.slice(0, sliceLength) + "...";
}

/**
 * 根据字体和字号计算字符串的显示长度
 * @param {string} text - 要测量的字符串
 * @param {string} fontFamily - 字体族，如 'Arial, sans-serif'
 * @param {number} fontSize - 字号，单位为像素(px)
 * @param {string} [fontWeight='normal'] - 字体粗细，如 'bold'、'normal'
 * @param {string} [fontStyle='normal'] - 字体样式，如 'italic'、'normal'
 * @returns {number} 字符串的显示宽度，单位为像素(px)
 */
function calculateTextWidth(
  text: string,
  fontFamily: string,
  fontSize: number,
  fontWeight = "normal",
  fontStyle = "normal"
) {
  // 参数验证
  if (typeof text !== "string" || !text) {
    return 0;
  }

  if (typeof fontSize !== "number" || fontSize <= 0) {
    throw new Error("字号必须为正数");
  }

  if (typeof fontFamily !== "string" || !fontFamily) {
    throw new Error("字体族不能为空");
  }

  // 创建隐藏的canvas元素用于测量
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d") as CanvasRenderingContext2D;

  // 构建字体样式字符串
  const fontString = `${fontStyle} ${fontWeight} ${fontSize}px ${fontFamily}`;

  // 设置canvas上下文字体
  context.font = fontString;

  // 测量文本宽度并返回
  return context.measureText(text).width;
}

/**
 * 简化版本 - 只使用字体和字号
 * @param {string} text - 要测量的字符串
 * @param {string} fontFamily - 字体族
 * @param {number} fontSize - 字号
 * @returns {number} 字符串宽度(px)
 */
export function getTextWidth(
  text: string,
  fontFamily: string,
  fontSize: number
) {
  return calculateTextWidth(text, fontFamily, fontSize);
}

/**
 * 增强版本 - 支持更多字体属性
 * @param {string} text - 要测量的字符串
 * @param {Object} fontOptions - 字体选项对象
 * @param {string} fontOptions.family - 字体族
 * @param {number} fontOptions.size - 字号
 * @param {string} [fontOptions.weight='normal'] - 字体粗细
 * @param {string} [fontOptions.style='normal'] - 字体样式
 * @param {string} [fontOptions.variant='normal'] - 字体变体
 * @param {string} [fontOptions.stretch='normal'] - 字体拉伸
 * @returns {number} 字符串宽度(px)
 */
// function measureTextWithOptions(text, fontOptions) {
//     const {
//         family,
//         size,
//         weight = 'normal',
//         style = 'normal',
//         variant = 'normal',
//         stretch = 'normal'
//     } = fontOptions;

//     return calculateTextWidth(text, family, size, weight, style);
// }

export function getGreeting() {
  const currentHour = new Date().getHours();

  if (currentHour >= 5 && currentHour < 12) {
    return "Good Morning";
  } else if (currentHour >= 12 && currentHour < 18) {
    return "Good Afternoon";
  } else if (currentHour >= 18 && currentHour < 22) {
    return "Good Evening";
  } else {
    return "Good Night";
  }
}
