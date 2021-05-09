import Vue from 'vue'
import App from './App'
import store from './store'
import config from './config'
import router from './router/index'
import uView from "uview-ui";
Vue.use(uView);
import {
  toast,
  openUrl
} from '@/common/util.js'

// #ifndef H5
Vue.prototype.$router = router
// #endif
Vue.prototype.NODE_ENV = config.nodeEnv
Vue.prototype.baseUrl = config.baseUrl
Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$toast = toast
Vue.prototype.$openUrl = openUrl

import * as filters from '@/filters/index'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
App.mpType = 'app'
const app = new Vue({
  store,
  ...App
})
app.$mount()