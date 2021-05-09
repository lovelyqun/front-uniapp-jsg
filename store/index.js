import Vue from 'vue'
import Vuex from 'vuex'
import config from "@/config";
import card from './modules/card'
import announce from './modules/announce'

import {
  getAccountInfoApi,
  getGlobalInfoApi,
} from '@/api/index'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    provider: 'weixin',
    hasLogin: false,
    code: null,
    systemInfo: {},
    userInfo: {},
    globalData: {},
    navigateTitle: '',
    routerQuery: {},
    sessionKeyToken: '',
    safeBottom: 0
  },
  mutations: {
    login(state, provider) {
      state.hasLogin = true;
      state.provider = provider;
      state.videoTime = 0;
    },
    logout(state) {
      state.hasLogin = false
      state.userInfo = {}
      uni.removeStorageSync('token')
      state.code = null
      state.sessionKeyToken = ''
    },
    setCode(state, code) {
      state.code = code
    },
    setSystemInfo(state, value) {
      state.systemInfo = value
      let navBarHeight = value.platform == 'ios' ? 44 : 48;
      state.safeBottom = state.systemInfo.safeArea.bottom - state.systemInfo.safeArea.height - 20
      state.systemInfo.navBarHeight = (navBarHeight + (state.systemInfo.statusBarHeight || 40)) + 'px'

    },
    setUserInfo(state, value) {
      state.userInfo = value
    },
    setChanelCode(state, value) {
      state.chanelCode = value
    },
    setNavigateTitle(state, value) {
      state.navigateTitle = value
      uni.setNavigationBarTitle({
        title: value
      });
    },
    setGlobalData(state, value) {
      state.globalData = value
    },
  },
  getters: {

  },
  actions: {
    // 获取code
    getUserCode: async function ({
      commit,
      state
    }) {
      return await new Promise((resolve, reject) => {
        uni.login({
          provider: state.provider,
          success: (loginRes) => {
            commit('setCode', loginRes.code)
            resolve(loginRes.code)
          },
          fail: (err) => {
            console.log('uni.login 接口调用失败，将无法正常使用开放接口等服务', err)
            reject(err)
          }
        })
      })
    },
    // 获取用户信息
    getUserInfo: async function ({
      commit,
      state
    }) {
      return await new Promise((resolve, reject) => {
        getAccountInfoApi().then(res => {
          let data = res.data
          data.hasRedBook = false
          data.hasTikTok = false
          if (Array.isArray(data.cardList)) {
            data.cardList.forEach(item => {
              if (item.cardType === 1) {
                data.hasRedBook = true
              }
              if (item.cardType === 2) {
                data.hasTikTok = true
              }

            });
          }
          commit('setUserInfo', data)
          resolve(data)
        })

      })
    },
    //  获取全局数据
    getGlobalInfo: async function ({
      commit,
      state
    }) {
      return await new Promise((resolve, reject) => {
        getGlobalInfoApi({
          city_id: state.currentCity.id
        }).then(res => {
          commit('setGlobalData', res.data.content)
          resolve(res.data.content)
        })
      })
    },

  },
  modules: {
    announce,
    card
  },
})

export default store