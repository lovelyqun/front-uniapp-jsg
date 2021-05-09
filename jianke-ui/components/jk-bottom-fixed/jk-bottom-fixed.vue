<template>
  <div class="jk-bottom-fixed">
    <slot name="button"></slot>
    <div v-if="isAllWindows" class="full-screen-div" :style="{'height':safeBottom+'px'}"></div>
  </div>
</template>

<script>
import config from '@/config'
import { mapState, mapMutations } from 'vuex'
export default {
  components: {},
  props: {
    type: {
      type: Number,
      default: 1
    }
  },
  watch: {},
  computed: {
    ...mapState(['isAllWindows', 'safeBottom'])
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
.jk-bottom-fixed {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 750rpx;
  .full-screen-div {
    width: 750rpx;
    height: 68rpx;
    background-color: #fff;
  }
}
</style>
