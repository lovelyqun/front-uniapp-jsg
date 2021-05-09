<template>
  <view class="page-container page-index">

  </view>
</template>

<script>
import config from '@/config'
import { mapState, mapMutations } from 'vuex'
export default {
  components: {},
  data() {
    return {
      demoImg: `${config.imgSrc}login-dialog-img.png`,
      options: {}
    }
  },
  watch: {},
  computed: {
    ...mapState(['hasLogin', 'userInfo', 'systemInfo'])
  },
  methods: {},
  onLoad(options) {
    this.options = options
  },
  onReady() {},
  onShow() {},
  onHide() {},
  onUnload() {},
  onReachBottom() {},
  onPullDownRefresh() {},
  onShareAppMessage() {}
}
</script>

<style lang="scss">
.page-index {
  background-color: $mc1;
}
</style>
