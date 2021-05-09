<template>
  <view class="jk-domain">
    <view class="jk-field-input" :style="{'margin-left':leftRightMargin +'rpx','margin-right':leftRightMargin +'rpx'}">
      <view class="jk-field-title">
        <span>*</span>{{title}}
      </view>
      <view class="jk-domain-view flex-row">
        <view v-for="(item,index) in domainArr" :key="item.value"
          :class="[checkDomain(item.value)?'jk-check-domain-item jk-domain-item':'jk-domain-item']"
          :style="{'margin-right':(index+1)%5===0?'0':'27rpx'}" @click="selectDomain(item.value)">
          {{item.label}}
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { fieldEnumApi } from '@/api/announce.js'
import config from '@/config'
export default {
  name: 'jkDomain',
  props: {
    type: {
      type: Number,
      default: 1
    },
    value: { type: [Number, String, Date, Array], default: '' }, // v-model 绑定的值
    title: {
      // 领域名
      type: String,
      default: '达人领域'
    },
    leftRightMargin: {
      // 左右的margin边距
      type: Number,
      default: 0
    },
    modify: {
      // 是否为修改通告
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      domainArr: [],
      domainIndex: []
    }
  },
  watch: {
    value(n) {
      this.domainIndex = n
    },
    // 监听 input 的value 改变的时候
    domainIndex(n) {
      // 把input的value传递到父组件上，实现双向绑定
      this.$emit('input', n)
    }
  },
  methods: {
    // 选择达人领域
    selectDomain(value) {
      let domainIndex = this.domainIndex
      let index = value
      // 显隐处理
      if (domainIndex.indexOf(index) === -1) {
        // 最多五个限制
        if (domainIndex.length >= 5) {
          uni.showToast({
            title: '最多选择五个',
            icon: 'none'
          })
          return
        }
        domainIndex.push(index)
      } else {
        // 最少1个限制
        if (domainIndex.length == 1) {
          uni.showToast({
            title: '最少选择一个',
            icon: 'none'
          })
          return
        }
        domainIndex.splice(domainIndex.indexOf(index), 1)
      }
      this.domainIndex = domainIndex
    },

    // 检验是否选中
    checkDomain(index) {
      return this.domainIndex.indexOf(index) != -1
    },
    // 获取领域信息
    getFieldEnum() {
      fieldEnumApi().then(res => {
        this.domainArr = res.data
        if (this.modify) {
          let arry = []
          this.domainIndex.forEach((item, index) => {
            this.domainArr.forEach((items, indexs) => {
              if (items.value == item.value || items.value == item) {
                arry.push(items.value)
              }
            })
          })
          this.domainIndex = arry
        }
      })
    }
  },
  mounted() {
    // 设置初始值
    this.domainIndex = this.value
    this.getFieldEnum()
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
.jk-domain {
  .jk-domain-item,
  .jk-check-domain-item {
    background: #f7f7f7;
    color: $tc3;
    padding: 12rpx 0;
    width: 116rpx;
    text-align: center;
    font-size: 24rpx;
    line-height: 24rpx;
    border-radius: 4rpx;
    margin-right: 27rpx;
    margin-bottom: 8rpx;
  }
  // .jk-domain-item:nth-child(5n) {
  //   margin-right: 0 !important;
  // }

  .jk-check-domain-item {
    background: $mc1 !important;
    color: #fff !important;
  }

  .jk-field-input,
  .jk-field-image {
    margin: 0 $fs2;
    padding: 30rpx 0 40rpx 0;

    .jk-field-title {
      line-height: 42rpx;
      margin-bottom: 20rpx;

      span {
        color: $mc3;
        font-size: $fs3;
      }
    }
  }
}
</style>
