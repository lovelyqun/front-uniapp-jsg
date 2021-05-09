<template>
  <div class="list-loading flex-center-center" :style="{'height':height+'rpx'}">
    <img class="list-loading-img" :src="loadingImg">
    <div class="list-loading-text">{{loadingText}}</div>
  </div>
</template>

<script>
import config from "@/config";
export default {
  components: {},
  props:{
    loadingImg: {
      type: String,
      default: `${config.imgSrc}loading-img.png`
    },
    loadingText: {
      type: String,
      default: '加载中...'
    },
    height: {
      type: Number,
      default: 80
    }
  },
  watch: {},
  methods: {
  },
  onLoad(options){
    this.options = options
  },
  onReady(){},
  onShow() {
  },
  onHide() {
  },
  onUnload() {
  },
  onReachBottom() {
  },
  onPullDownRefresh() {
  },
  onShareAppMessage(){}
}
</script>

<style lang="scss">
@import "@s/styles/variables.scss";
.list-loading {
  .list-loading-img {
    width: 36rpx;
    height: 36rpx;

  }
  .list-loading-text {
    margin-left: 8rpx;
    font-size: 24rpx;
    color: #7A7A7A;
    line-height: 36rpx;
  }
}

</style>
