<template>
  <view class="page-index">
    <div class="top-bg">
      <img src="../../static/main/img/index-top-bg.png" alt="">
    </div>
    <div class="page-container">
      <div class="city-modal">
        <div class="city-name">宜黄县</div>
        <div class="flex-row-align-center">
          <div class="city-weather">多云</div>
          <div class="city-weather">25°C</div>
          <div class="city-weather air">优</div>
        </div>
      </div>
      <div class="banner-box">
        <u-swiper :list="bannerList" border-radius="16" height="267"></u-swiper>
      </div>
      <div class="common-service">
        <div class="flex-row-sb-center">
          <div class="title-1">公共服务</div>
          <div class="flex-row-align-center">
            <div class="text-link">如何快速获得反馈</div>
            <img class="icon-img" src="../../static/main/img/icon-mark-blue.png" alt="">
          </div>
        </div>
      </div>
      <div class="entry-box">
        <div class="entry-item">
          <img src="../../static/main/img/index-img-letter.png" alt="">
        </div>
        <div class="entry-item">
          <img src="../../static/main/img/index-img-dispute.png" alt="">
        </div>
        <div class="entry-item">
          <img src="../../static/main/img/index-img-community.png" alt="">
        </div>
      </div>
      <div class="sub-entry flex-row-align-center">
        <div class="sub-entry-item" @click="openWorkPopup">
          <img src="../../static/main/img/index-work.png" alt="">
        </div>
        <div class="sub-entry-item">
          <img src="../../static/main/img/index-grid.png" alt="">
        </div>
        <div class="sub-entry-item">
          <img src="../../static/main/img/index-12345.png" alt="">
        </div>
      </div>
      <div class="bottom-text" style="margin-top:74rpx">
        既时干市域社会治理公共服务平台
      </div>
      <div class="bottom-text">由
        <span class="c1">&nbsp;智治云&nbsp;</span>
        提供计算服务
      </div>
    </div>
    <u-popup v-model="showWork" mode="center" custom-style="maskStyle">
      <div class="popup-work">
        <div class="popup-title flex-row-align-center">
          坚定原则 甜嘴公心
        </div>
        <div class="popup-content flex-row-sb-center">
          <div class="work-item">
            <img src="../../static/main/img/popup-work-1.png" alt="">
          </div>
          <div class="work-item">
            <img src="../../static/main/img/popup-work-2.png" alt="">
          </div>
          <div class="work-item">
            <img src="../../static/main/img/popup-work-3.png" alt="">
          </div>
          <div class="work-item">
            <img src="../../static/main/img/popup-work-4.png" alt="">
          </div>
          <div class="work-item">
            <img src="../../static/main/img/popup-work-5.png" alt="">
          </div>
          <div class="work-item"></div>

        </div>
      </div>

    </u-popup>
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
      options: {},
      bannerList: [
        {
          image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
          title: '昨夜星辰昨夜风，画楼西畔桂堂东'
        },
        {
          image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
          title: '身无彩凤双飞翼，心有灵犀一点通'
        },
        {
          image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
          title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
        }
      ],
      showWork: false,
      maskStyle: {
        'border-radius': '16rpx'
      }
    }
  },
  watch: {},
  computed: {
    ...mapState(['hasLogin', 'userInfo', 'systemInfo'])
  },
  methods: {
    openWorkPopup() {
      this.showWork = true
    }
  },
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
  .top-bg {
    margin-bottom: -409rpx;
    img {
      width: 100%;
      height: 409rpx;
    }
  }
  .city-modal {
    .city-name {
      font-size: 48rpx;
      font-weight: bold;
      color: #ffffff;
    }
    .city-weather {
      margin-right: 18rpx;
      font-size: 26rpx;
      color: #ffffff;
      opacity: 0.8;
      text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3);
    }
    .air {
      font-size: 22rpx;
      color: #ffffff;
    }
  }
  .banner-box {
    margin-top: 105rpx;
  }
  .common-service {
    margin-top: 57rpx;
    .text-link {
      font-size: 28rpx;
      color: #44a8ff;
    }
    .icon-img {
      margin-left: 11rpx;
      width: 28rpx;
      height: 28rpx;
    }
  }
  .entry-box {
    margin-top: 33rpx;
    .entry-item {
      margin-bottom: 24rpx;
      border-radius: 12rpx;
      img {
        width: 100%;
        height: 268rpx;
      }
    }
  }
  .sub-entry {
    margin-top: 34rpx;
    .sub-entry-item {
      margin-right: 10rpx;
      img {
        width: 160rpx;
        height: 160rpx;
      }
    }
  }
  .bottom-text {
    margin-top: 11rpx;
    text-align: center;
    font-size: 24rpx;
    color: #aaaaaa;
  }
  .popup-work {
    width: 670rpx;
    height: 534rpx;
    background: #ffffff;
    border-radius: 16rpx;
    overflow: hidden;
    .popup-title {
      height: 120rpx;
      padding-left: 50rpx;
      background: #1fbdff;
      border-radius: 16rpx 16rpx 0px 0px;
      font-size: 36rpx;
      font-weight: bold;
      color: #ffffff;
    }
    .popup-content {
      padding: 4rpx 50rpx;
      .work-item {
        margin-bottom: 26rpx;
        width: 160rpx;
        height: 160rpx;
        img {
          width: 160rpx;
          height: 160rpx;
        }
      }
    }
  }
}
</style>
