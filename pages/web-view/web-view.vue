<template>
  <web-view :src="url" v-if ="isLoad"/>
</template>

<script>
import {putParameterToUrl, urlDelParam} from '@co/util.js'

export default {
  components: {},
  mixins: [],
  data() {
    return {
      url: '',
      isLoad: false,
      option: null,
    }
  },

  onLoad: function (option) {
    this.setUrlData(option)
  },
  onShow() {
  },

  methods: {
    setUrlData(option) {
      this.option = option
      this.url = option.url
      this.type = option.type
      this.adName = option.adName
      if (option.title) {
        wx.setNavigationBarTitle({
          title: option.title
        });
      }
      let url = decodeURIComponent(option.url)
      if (url.indexOf('?') > -1 && url.split('?')) {
        const urlPar = url.split('?')[1]
        // 遍历参数取title
        const titlePar = urlPar.split('&')
        titlePar.forEach(e => {
          if (e.split('=')[0] === 'title') {
            this.shareTitleHere = e.split('=')[1]
          }
        })
      }
      if (option.route) {
        let route = option.route
        url = decodeURIComponent(option.url) + '#/' + route
      }
      if (option.param) {
        let param = decodeURIComponent(option.param)
        if (option.param.indexOf(',')) {
          param = param.replace(/,/g, '&')
        }
        url = url + '?' + param
      }
      this.setUrl(url)
    },
    // 设置url内容
    setUrl(url) {
      uni.getStorage({
        key: 'token',
        success: (res) => {
          url = urlDelParam(url, 'app_user_token')
          url = putParameterToUrl(url, {app_user_token:wx.getStorageSync('userToken')})
        },
        complete: () => {
          this.url = url
          this.isLoad = true
        }
      })
    }

  },
  onPullDownRefresh: function () {
  },
  onShareAppMessage() {

  },
}
</script>

<style>

</style>
