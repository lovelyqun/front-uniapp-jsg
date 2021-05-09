<script>
import { mapMutations } from 'vuex'
import { weChatLoginApi, getAccountInfoApi } from '@/api/index'

export default {
  onLaunch: function (option) {
    this.updateVersion()
    this.getSystemInfo()
    // this.getParams(option)
    this.wxLogin()
  },
  onPageNotFound(res) {
    this.$toast({
      title: '页面不存在,将返回首页',
      icon: 'none',
      duration: 2000,
      success: () => {
        this.$router.push({ path: '/pages/index/index' })
      }
    })
  },
  onShow: function () {},
  onHide: function () {},
  methods: {
    ...mapMutations(['login', 'loginOut', 'setSessionKeyToken', 'setUserInfo', 'systemInfo']),
    // 检查版本更新
    updateVersion() {
      const updateManager = wx.getUpdateManager()
      // 请求完新版本信息的回调
      updateManager.onCheckForUpdate(function (res) {
        console.log('hasUpdate=', res.hasUpdate)
      })
      // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
      updateManager.onUpdateReady(function () {
        wx.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否重启应用？',
          success(res) {
            if (res.confirm) {
              updateManager.applyUpdate()
            }
          }
        })
      })
      // 新版本下载失败
      updateManager.onUpdateFailed(function () {
        console.log('新版本下载失败')
      })
    },
    // 获取系统信息
    getSystemInfo() {
      uni.getSystemInfo({
        success: res => {
          this.$store.commit('setSystemInfo', res)
        }
      })
    },
    // 获取参数
    getParams(option) {
      let channelId = ''
      channelId = option.query['td_channelId'] || option.query['td_channelid']
    },

    // 登录
    wxLogin() {
      uni.login({
        provider: 'weixin',
        success: loginRes => {
          let params = {
            code: loginRes.code
          }
          weChatLoginApi(params).then(res => {
            if (res.data.isLogin === 1) {
              this.login()
              uni.setStorageSync('token', res.data.accessToken)
              getAccountInfoApi().then(res => {
                this.setUserInfo(res.data)
              })
            } else {
              this.loginOut
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* #ifndef APP-PLUS-NVUE */
@import './common/uni.css';
@import 'uview-ui/index.scss';
@import '@s/styles/index.scss';
/* #endif*/
</style>
