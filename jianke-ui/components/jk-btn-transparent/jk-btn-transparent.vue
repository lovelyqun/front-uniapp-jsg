<template>
  <view v-if="(!hasLogin && openType==='getPhoneNumber') || openType!=='getPhoneNumber' " class="jk-btn-transparent-box">
    <button class="jk-btn-transparent" v-if="!hasLogin && openType==='getPhoneNumber'" open-type="getPhoneNumber"
            @getphonenumber="isExpired">
    </button>
    <button class="jk-btn-transparent"  v-else-if="openType==='getUserInfo'" open-type="getUserInfo"
            @getuserinfo="getUserInfo">
    </button>
    <button class="jk-btn-transparent"  v-else-if="openType==='contact'" open-type="contact">
    </button>
    <button class="jk-btn-transparent"  v-else-if="openType==='share'" open-type="share">
    </button>
  </view>




</template>

<script>
import {getAccountInfoApi, weChatPhoneBindApi, weChatLoginApi} from '@/api/index'
import {mapState, mapMutations} from 'vuex'

const EXPRETIME = 5 * 60 * 1000
export default {
  name: "",
  props: {
    openType: {type: String, default: 'getPhoneNumber'}
  },
  data() {
    return {}
  },
  watch: {},
  created() {

  },
  mounted() {

  },
  computed: {
    ...mapState(['hasLogin', 'openid', 'expireTime', 'userInfo', 'systemInfo', 'sessionKeyToken', 'provider'])
  },
  methods: {
    ...mapMutations(['login', 'setUserInfo']),
    // 获取用户用户信息
    getUserInfo(e){
      if(e.detail.rawData){
        this.$emit('successCallBack',e.detail)
      }else {
        uni.showToast({
          title: '授权失败,请重新授权',
          icon: 'none'
        })
      }
    },
    // 判断code时候过期
    isExpired(e) {
      if (new Date().getTime() - this.expireTime > EXPRETIME || !this.openid) { // 重新获取code
        this.$store.dispatch('getUserOpenId').then(res => {
              this.getPhoneNumber(e)
            }
        )
      } else {
        this.getPhoneNumber(e)
      }
    },
    // 获取电话号码
    getPhoneNumber(e) {
      if (e.detail.encryptedData) {
        let iv = e.detail.iv
        let code = {
          code: this.openid,
        }
        weChatLoginApi(code).then(res => {
          if (res.data.isLogin === 1) { // 曾经登录过
            this.loginSuccess(res.data.accessToken)
          } else { // 新用户登录
            let param = {
              sessionKeyToken: res.data.sessionKeyToken,
              encryptedData: e.detail.encryptedData,
              iv: iv,
            }
            weChatPhoneBindApi(param).then(res2 => {
              if (res2.data.isLogin === 1) {
                this.loginSuccess(res2.data.accessToken)
              } else {
                uni.showToast({
                  title: '绑定失败,请重试',
                  icon: 'none'
                })

              }
            })
          }


        })
        /*     if (this.sessionKeyToken) {
          uni.checkSession({
            success: (checkRes) => {
              console.log(checkRes)

              if (checkRes.errMsg === "checkSession:ok") {
                param = {
                  sessionKeyToken: this.sessionKeyToken,
                  encryptedData: e.detail.encryptedData,
                  iv: iv,
                }
                weChatPhoneBindApi(param).then(res => {
                  if (res.data.isLogin === 1) {
                    this.login()
                    this.$localStorage.setItem('token', res.data.accessToken)
                    getAccountInfoApi().then(res => {
                      this.setUserInfo(res.data)
                    })
                    this.$emit('closeLoginPopup')
                  } else {

                  }
                })
              } else {
                uni.login({
                  provider: this.provider,
                  success: (loginRes) => {
                    let code = {
                      code: loginRes.code,
                    }
                    weChatLoginApi(code).then(res => {
                      param = {
                        sessionKeyToken: res.data.sessionKeyToken,
                        encryptedData: e.detail.encryptedData,
                        iv: iv,
                      }
                      weChatPhoneBindApi(param).then(res => {
                        if (res.data.isLogin === 1) {
                          this.login()
                          this.$localStorage.setItem('token', res.data.accessToken)
                          getAccountInfoApi().then(res => {
                            this.setUserInfo(res.data)
                          })
                          this.$emit('closeLoginPopup')
                        } else {

                        }
                      })
                    })
                  }
                });
              }
            },
            fail: (err) => {
              console.log(err)
            }
          })
        } else {
          uni.login({
            provider: this.provider,
            success: (loginRes) => {
              let code = {
                code: loginRes.code,
              }
              weChatLoginApi(code).then(res => {
                param = {
                  sessionKeyToken: res.data.sessionKeyToken,
                  encryptedData: e.detail.encryptedData,
                  iv: iv,
                }
                weChatPhoneBindApi(param).then(res => {
                  if (res.data.isLogin === 1) {
                    this.login()
                    this.$localStorage.setItem('token', res.data.accessToken)
                    getAccountInfoApi().then(res => {
                      this.setUserInfo(res.data)
                    })
                    this.$emit('closeLoginPopup')
                  } else {

                  }
                })
              })
            }
          })
        }*/
      } else {
        uni.showToast({
          title: '授权失败,请重新授权',
          icon: 'none'
        })
      }

    },
    // 登录成功回调
    loginSuccess(accessToken) {
      this.login()
      uni.setStorageSync('token', accessToken);
      getAccountInfoApi().then(res => {
        this.setUserInfo(res.data)
      })
      this.$emit('successCallBack')
    }


  },
}
</script>

<style lang="scss" scoped>
@import "@s/styles/variables.scss";
.jk-btn-transparent-box {
  position: absolute;
  height: 100%;
  width: 100%;
  opacity: 0;
  top: 0;
  left: 0;
}
.jk-btn-transparent {
  height: 100%;
  width: 100%;
  opacity: 0;
}

</style>
