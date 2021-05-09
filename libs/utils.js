import config from "@/config";

//  根据广告类型去不同页面
export function adClick(data, that) {
  const WEBVIEW_PATH = '/pages/web-view/web-view'
  let type = data.adType
  let content = data.adContend
  if (type === 1) {
    that.$router.push({
      path: WEBVIEW_PATH,
      query: {
        url: content
      }
    })
  } else if (type === 2) {
    wx.previewImage({
      current: content, // 当前显示图片的http链接
      urls: [content] // 需要预览的图片http链接列表
    })
  } else if (type === 3) {
    content = JSON.parse(content)
    that.groupImg = content.qrUrl
    that.$refs.group.open()

  }


}

// 获取订阅信息
export function subscribeMessage(tmplIds = config.tmplIds) {
  return new Promise((resolve, reject) => {
    wx.requestSubscribeMessage({
      tmplIds: tmplIds,
      success(res) {
        resolve(res)
      },
      faile(err) {
        resolve(res)
        this.$toast(err)
      },
      complete() {
        resolve()
      },
    })
  })

}