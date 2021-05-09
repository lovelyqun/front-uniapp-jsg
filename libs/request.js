import store from '@/store'
import config from '@/config'
import {
  isNull,
  isNaN
} from "../common/util";

let BASEURL = config.baseUrl

const request = (config) => {
  config.params = {}
  config.params.data = config.data
  for (let key in config.data) {
    if (isNull(config.data[key]) || isNaN(config.data[key])) {
      console.error('参数格式错误', key)
      delete config.data[key]
    }
  }
  config.params.accessToken = uni.getStorageSync('token') ? uni.getStorageSync('token') : "string"
  config.params.system = store.state.systemInfo.system || 'string'
  config.params.model = store.state.systemInfo.model || 'string'
  return new Promise((resolve, reject) => {
    if (config.showLoading) {
      uni.showLoading({
        title: '加载中..',
        mask: true
      });
    }

    let sendRequest = uni.request({
      url: BASEURL + config.url,
      method: config.method,
      timeout: config.timeout,
      data: config.params,
      withCredentials: true,
      header: {
        'content-type': config.header ? config.header : 'application/json;charset=UTF-8',
      },
      success: (res) => {
        if (res.data.rspCode === 0) {
          resolve(res.data)
        } else if (res.data.rspCode === 1011) {
          store.commit('logout')
          console.log('登录过期')
        } else {
          setTimeout(() => {
            uni.showToast({
              title: res.data.rspMsg,
              duration: 3000,
              icon: 'none'
            }, 500);
          })

          reject(res.data)
        }
      },
      fail: (err) => {
        reject(err)
      },
      complete: () => {
        if (config.showLoading) {
          uni.hideLoading()
        }


      }
    })
  })
}
module.exports = {
  request: request,
}