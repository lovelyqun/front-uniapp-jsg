function getPath(path, params) {
  if (params && !(params instanceof Object)) {
    console.error('参数必须为对象')
    return
  }
  if (!path) {
    console.error('地址不能为空')
    return
  }
  for (let key in params) {
    if (path.indexOf('?') === -1) {
      path = path + '?' + key + '=' + params[key]
    } else {
      path = path + '&' + key + '=' + params[key]
    }

  }
  return path

}

const TABBAR = ['/pages/index/index', '/pages/mine/mine']
const router = {
  push: (params, animationType = 'pop-out', animationDuration = '200') => {
    let path = getPath(params.path, params.query || params.params)
    let isTabbar = false
    TABBAR.forEach(item => {
      if (item === params.path) {
        isTabbar = true
        return
      }
    })
    if (isTabbar) {
      new Promise((resolve, reject) => {
        uni.switchTab({
          url: path,
          success: function (res) {
            resolve(res)
          },
          fail: function (err) {
            console.error(err)
            reject(err)
          }
        })
      })
    } else {
      new Promise((resolve, reject) => {
        uni.navigateTo({
          url: path,
          animationType: animationType,
          animationDuration: animationDuration,
          success: function (res) {
            resolve(res)
          },
          fail: function (err) {
            console.error(err)
            reject(err)
          }
        })
      })
    }


  },
  go: (delta = 1, animationType = 'pop-out', animationDuration = '200') => {
    uni.navigateBack({
      delta: delta,
      animationType: animationType,
      animationDuration: animationDuration
    });
  },
  replace: (params) => {
    let path = getPath(params.path, params.query || params.params)
    uni.redirectTo({
      url: path,
      success: function (res) {

      },
      fail: function (err) {
        console.error(err)
      }
    });
  }
}
export default router