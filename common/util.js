import config from "@/config";
let upImageUrl = config.baseUrl + config.upImageUrl
/**
 *简化提示框
 */
export const toast = (title, duration = 3000, mask = false, icon = 'none') => {
  //统一提示方便全局修改
  if (Boolean(title) === false) {
    return;
  }
  uni.showToast({
    title: title,
    duration: duration,
    mask: mask,
    icon: icon
  });
}

/**
 *打开外链 适配H5
 */
export const openUrl = (url) => {
  // #ifdef H5
  window.location.href = url
  // #endif
  // #ifndef H5
  router.push({
    path: '/pages/webView/webView',
    query: {
      url: url
    }
  })
  // #endif
}
/**
 * 获取当前页面url上的参数
 * @param {string} name 参数名
 * @author Lq
 */
export const getQueryString = function (name) {
  var reg = new RegExp("(/?|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg); //search,查询？后面的参数，并匹配正则
  var r2 = window.location.hash.substr(1).match(reg); //search,查询？后面的参数，并匹配正则
  if (r != null) return decodeURIComponent(r[2]);
  if (r2 != null) return decodeURIComponent(r2[2]);
  return null;
}

/**
 * 判断H5所在的运行环境
 * @author Lq
 */
export const isEquipment = function () {
  let UA = navigator.userAgent,
    isAndroid = /android|adr|linux/gi.test(UA),
    isIOS = /iphone|ipod|ipad/gi.test(UA) && !isAndroid,
    isWeixin = /MicroMessenger/gi.test(UA),
    isJkAPP = /JianKe JianZhi/i.test(UA) || /JianKe ZhaoPin/i.test(UA),
    isYPAPP = /JianKe YouPin/i.test(UA),
    isZBAPP = /JianKe ZhongBao/i.test(UA),
    isXSJAPP = /JianKe/i.test(UA),
    isQQ = /QQ/gi.test(UA),
    isMobile = isAndroid || isIOS,
    isMiniprogram = window.__wxjs_environment === 'miniprogram'

  return {
    isAndroid: isAndroid,
    isIOS: isIOS,
    isWeixin: isWeixin,
    isQQ: isQQ,
    isPC: !isMobile,
    isJkAPP: isJkAPP,
    isYPAPP: isYPAPP,
    isZBAPP: isZBAPP,
    isXSJAPP: isXSJAPP,
    isMobile: isMobile,
    isMiniprogram: isMiniprogram
  }
}

/**
 * 时间戳转标准时间
 * @param {date} time 需要转换的时间
 * @param {string} cFormat 需要转换的格式
 * @author Lq
 * 默认 yyyy-mm-dd hh:mm:ss
 */
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

/**
 * 利用iframe下载文件
 * @param {string}url  下载地址
 * @author Lq
 */
export function iframeDown(url) {
  const iframe = document.createElement('iframe')
  iframe.style.display = 'none'
  iframe.src = url
  iframe.onload = function () {
    document.body.removeChild(iframe)
  }
  document.body.appendChild(iframe)
}

/**
 * 替换对象KEY
 * @param {object} Obj 替换对象
 * @param {string} ObjKey 替换的键值对
 * @author Lq
 */
export function replaceKey(Obj, ObjKey) {
  for (let key in ObjKey) {
    Obj[key] = Obj[ObjKey[key]]
    delete Obj[ObjKey[key]]
  }
}

/**
 * 替换对象KEY(下划线转驼峰)
 * @param {object} Obj 替换对象
 * @param {string} type:toLine则转下划线,否则转驼峰
 * @author Lq
 */
export function changeKey(Obj, type) {
  for (let key in Obj) {
    let newKey
    if (type === 'toLine') {
      newKey = toLine(key)
    } else {
      newKey = toHump(key)
    }

    Obj[newKey] = Obj[key]
    delete Obj[key]
  }
  return Obj

  // 下划线转换驼峰
  function toHump(name) {
    return name.replace(/\_(\w)/g, function (all, letter) {
      return letter.toUpperCase();
    });
  }

  // 驼峰转换下划线
  function toLine(name) {
    return name.replace(/([A-Z])/g, "_$1").toLowerCase();
  }

}

/**
 * 获取删除url上的参数
 * @param {string} url 地址
 * @param {string} name  需要删除的参数名
 * @author Lq
 */
export function urlDelParam(url, name) {
  let urlArr = decodeURIComponent(url).split('?');
  if (urlArr.length > 1 && urlArr[1].indexOf(name) > -1) {
    let query = urlArr[1];
    let arr = query.split("&");
    let urlte = urlArr[0] + '?'
    let paramStr = ''
    for (let i = 0; i < arr.length; i++) {
      let key = arr[i].split("=")[0]
      let value = arr[i].split("=")[1];
      if (key !== name) {
        paramStr = i === 0 ? paramStr : paramStr + '&'
        paramStr = paramStr + key + '=' + value
      }
    }
    return urlte + paramStr;
  } else {
    return url;
  }
}

/**
 * 将参数拼接到路径上
 * @param {string} url 需要添加的链接
 * @param {obj} values 需要添加的参数其中key为参数名,value为参数值
 * @author Lq
 */
export function putParameterToUrl(url, values) {
  let params = "";
  for (let v in values) {
    if (v !== undefined) {
      params = v + '=' + values[v];
    }
  }
  if (url.indexOf('?') === -1) {
    params = '?' + params;
  } else if (url.indexOf('&') === -1) {
    params = '&' + params;
  }
  return url + params;
}

/**
 * copy str To Clipboard
 * @param {string} str
 * @author Lq
 */
export function copyToClipboardH5(text) {
  const el = document.createElement('textarea')
  el.value = text
  el.setAttribute('readonly', '')
  el.style.position = 'absolute'
  el.style.left = '-9999px'
  document.body.appendChild(el)
  let selected = document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false
  el.focus()
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
  return new Promise((resolve, reject) => {
    if (selected) {
      document.getSelection().removeAllRanges()
      document.getSelection().addRange(selected)
      resolve()
    } else {
      console.error('拷贝失败')
      reject()
    }
  })
}

/**
 * copy str To Clipboard
 * @param {string} str
 * @author Lq
 */
export function copyToClipboard(text) {

  return new Promise((resolve, reject) => {
    uni.setClipboardData({
      data: text,
      success: function () {

        resolve()
      }
    })
  })
}

/**
 * 分转换成元
 * @param {number} value
 * @param {number} type 0:四舍五入 1: 向下取整  2:向上取整
 * @author Lq
 */
export function fenToYuan(value, type = 0) {
  if (value == 0) return 0
  if (!value) return ''
  if (type === 1) {
    value = Math.floor(value * 100) / 100
  } else if (type === 2) {
    value = Math.ceil(value * 100) / 100
  }
  value = (value / 100).toFixed(2)
  return value
}

/**
 * 深拷贝对象
 * @param {Object} source
 * @author Lq
 */
export function deepClone(source) {
  return _deepClone(source)

  function _deepClone(source) {
    let target;
    if (typeof source === 'object') {
      target = Array.isArray(source) ? [] : {}
      for (let key in source) {
        if (source.hasOwnProperty(key)) {
          if (typeof source[key] !== 'object' || source[key] == null) {
            target[key] = source[key]
          } else {
            target[key] = _deepClone(source[key])
          }
        }
      }
    } else {
      target = source
    }
    return target
  }
}

/**
 * 上传图片
 * @param {function} callback
 * @param {Array<String>} type album 从相册选图，camera 使用相机，默认二者都有
 * @author Yjy
 */
export function upLoadImage(type) {
  let BASEURL = config.baseUrl
  let token = uni.getStorageSync('token')
  const url = '/mapi/file/upload'
  return new Promise((resolve, reject) => {
    {
      uni.chooseImage({
        count: 1, //选择的图片数量
        sourceType: type,
        success: (res) => {
          console.log(res, 'choose')
          uni.showLoading({
            title: '正在加载中....',
            mask: true,
          })
          const tempFilePaths = res.tempFilePaths
          uni.uploadFile({
            url: BASEURL + url + '?accessToken=' + token,
            filePath: tempFilePaths[0],
            name: 'uploadFile',
            formData: {},
            success: (res) => { //请求成功回调 这里收到的是服务端下发 的数据
              var data = res.data
              if (typeof data == 'string') {
                data = JSON.parse(data)
              }
              uni.hideLoading();
              resolve(data.data.fileUrl)
            }
          })

        }
      })
    }
  })

}

/**
 * 上传文件
 * @param {function} callback
 * @author Yjy
 */
export function upFile(callback) {
  let BASEURL = config.baseUrl
  let token = uni.getStorageSync('token')
  uni.chooseMessageFile({
    count: 1, //文件
    type: 'file',
    success: (res) => {
      const tempFilePaths = res.tempFiles
      if (tempFilePaths[0].size > 1024 * 1024 * 50) {
        uni.showToast({
          title: '请选择小于50M的文件',
          icon: 'none'
        }, 2000)
        return
      }
      uni.showLoading({
        title: '正在加载中....',
        mask: true,
      })
      uni.uploadFile({
        url: BASEURL + '/mapi/file/upload?accessToken=' + token,
        filePath: tempFilePaths[0].path,
        name: 'uploadFile',
        formData: {},
        success: (res) => { //请求成功回调 这里收到的是服务端下发 的数据
          var data = res.data
          if (typeof data == 'string') {
            data = JSON.parse(data)
          }
          uni.hideLoading();
          // 获取图片url
          console.log(data.data.fileUrl)
          let arryType = tempFilePaths[0].name.split('.')
          callback({
            fileUrl: data.data.fileUrl,
            type: arryType[arryType.length - 1]
          })
        }
      })

    }
  })
}

/**
 * 从字符串中提取地址
 * @param {String} strUrl
 * @author Lq
 */
export function getURLFromStr(strUrl) {
  let url = ''
  // var srcMatch = strUrl.match("(https|http)?://(([0-9]{1,3}\.){3}[0-9]{1,3}|([0-9a-z_!~*'()-]+\.)*([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\.[a-z]{2,6})(:[0-9]{1,4})?((/[0-9a-zA-Z_!~*().;?:@&=+$,%#-]*)+)?");
  let reg = /(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g
  var srcMatch = strUrl.match(reg);
  if (srcMatch == null) {
    url = '';
  } else {
    url = srcMatch[0];
  }
  return url
}

// base64转Blob对象
export const base64ToUrl = (b64Data, contentType, sliceSize) => {
  contentType = contentType || "";
  sliceSize = sliceSize || 512;

  var byteCharacters = atob(b64Data);
  var byteArrays = [];

  for (
    var offset = 0; offset < byteCharacters.length; offset += sliceSize
  ) {
    var slice = byteCharacters.slice(offset, offset + sliceSize);

    var byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    var byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  var blob = new Blob(byteArrays, {
    type: contentType
  });
  return blob;
}

// 比较对象某个属性值进行排序
export const compareSort = (property) => {
  return function (obj1, obj2) {
    var value1 = obj1[property];
    var value2 = obj2[property];
    return value1 - value2;
  }
}

// 生成随机数
export const genID = (length) => {
  return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36)
}

// 判断null
export const isNull = (exp) => {
  if (!exp && typeof (exp) != 'undefined' && exp != 0) {
    return true
  } else {
    return false
  }
}

// 判断NaN
export const isNaN = (value) => {
  return value !== value
}
/**
 * 判断数据类型
 * @param {String} type ;String Number Boolean Null Object Array Function
 * @author Lq
 */
export function isType(type) {
  return function (obj) {
    return Object.prototype.toString.call(obj) === '[object ' + type + ']';
  }
}