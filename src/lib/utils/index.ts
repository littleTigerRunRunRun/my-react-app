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

