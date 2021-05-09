// 万转换
export const isWang = function (num) {
/*  if (!num) return 0
  if (num > 10000 && num <= 1000000) {
    return (num / 10000).toFixed(1) + 'W'
  } else if (num >= 1000000) {
    return '100W+'
  }else {
    return num
  }*/
  if(!num) return 0
  var param = {};
  var k = 10000,
      sizes = ['', 'w', '亿', '万亿'],
      i;
  if(num < k){
    param.value =num
    param.unit=''
  }else{
    i = Math.floor(Math.log(num) / Math.log(k));

    if(num%10000 === 0){
      param.value = ((num / Math.pow(k, i))).toFixed(0);
    }else {
      param.value = ((parseInt(num / 1000))/10).toFixed(1);
    }
    param.unit = sizes[i];
  }
  return param.value+param.unit

}

// 时间戳转标准时间
export const parseTime = function (time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}
