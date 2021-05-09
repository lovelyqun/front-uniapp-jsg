<template>
  <view class="jk-share-type">
    <div class="title flex-center-center">
      {{title}}
    </div>
    <div class="flex-row-sa share-body">
      <view v-for="(item,index) in shareList" :key="item.value" @click="shareClick(item.value)"
        class="relative flex-col-center flex-align-center" style="flex:1">
        <img class="icon-share-type" :src="item.icon" alt="">
        <view class="share-text">{{item.text}}</view>
        <jk-btn-transparent v-if="item.value===1" :openType="'share'"></jk-btn-transparent>
      </view>

    </div>

  </view>
</template>

<script>
import config from '@/config'
export default {
  components: {},

  props: {
    type: {
      type: Number,
      default: 1
    },
    title: {
      type: String,
      default: '分享'
    },
    showLink: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      shareList: [
        { icon: `${config.imgSrc}icon-share-default.png`, text: '微信好友', value: 1 },
        { icon: `${config.imgSrc}icon-friend-group.png`, text: '朋友圈', value: 4 },
        { icon: `${config.imgSrc}icon-share-link.png`, text: '生成分享链接', value: 2 },
        { icon: `${config.imgSrc}icon-share-post.png`, text: '生成分享海报', value: 3 }
      ]
    }
  },
  watch: {},
  methods: {
    shareClick(value) {
      this.$emit('close')
      if (value === 1) return

      this.$emit('shareClick', value)
    }
  },
  mounted() {
    if (!this.showLink) {
      this.shareList = [
        { icon: `${config.imgSrc}icon-share-default.png`, text: '微信好友', value: 1 },
        { icon: `${config.imgSrc}icon-share-post.png`, text: '生成分享海报', value: 3 }
      ]
    }
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
.jk-share-type {
  height: 450rpx;
  padding: 32rpx;
  background: #ffffff;
  border-radius: 16px 16px 0px 0px;

  .title {
    font-size: 36rpx;
    font-weight: bold;
    color: #111111;
    line-height: 50rpx;
  }
  .btn-cancel {
    font-size: 28rpx;
    color: #999999;
    line-height: 40rpx;
  }
  .icon-share-type {
    width: 88rpx;
    height: 88rpx;
  }
  .share-body {
    margin-top: 80rpx;
  }
  .share-text {
    margin-top: 19rpx;
    font-size: 24rpx;
    color: #666666;
    line-height: 33rpx;
  }
}
</style>
