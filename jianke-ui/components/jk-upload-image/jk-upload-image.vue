<template>
  <view class="upload-image-view flex-row">
    <!-- 单图 -->
    <view v-if="imageType == 'single'">
      <!-- 有图 -->
      <view v-if="imageUrl" class="upload-image">
        <image class="content" :src="imageUrl" @click="showPopup" />
        <image v-if="!noDelete" class="delete-icon" :src="deleteImageIcon" @click="deleteImage" />
      </view>
      <!-- 无图 -->
      <image v-else class="content" :src="addImageIcon" @click="addImage" />

    </view>

    <!-- 多图 -->
    <template v-if="imageType == 'more'">
      <view v-for="(item,index) in imageUrlArry" :key="index"
        :style="{'margin-right':'54rpx','margin-bottom':'21rpx','margin-top':(index!=0&&index/3>=1?'21rpx':'0rpx')}">
        <!-- 有图 -->
        <view class="upload-image">
          <image class="content" :src="item" @click="showPopup(index)" />
          <image v-if="!noDelete" class="delete-icon" :src="deleteImageIcon" @click="deleteImageArry(index)" />
        </view>
      </view>
      <template v-if="!noAdd">
        <image v-if="imageUrlArry.length<9&&imageUrlArry.length>=3" class="content" :src="addImageIcon" @click="addImageArry"
          :style="{'margin-bottom':'21rpx','margin-top':'21rpx','margin-right':'54rpx'}" />
        <image v-else-if="imageUrlArry.length<3" class="content" :src="addImageIcon" @click="addImageArry"
          :style="{'margin-bottom':'21rpx','margin-top':'0','margin-right':'54rpx'}" />
      </template>

    </template>
  </view>
</template>

<script>
import addImageIcon from '@s/img/add-image-icon.png'
import deleteImageIcon from '@s/img/delete-image-icon.png'
import perviewLeftIcon from '@s/img/perview-left-icon.png'
import perviewRightIcon from '@s/img/perview-right-icon.png'
import config from '@/config'
import { upLoadImage } from '@co/util.js'
export default {
  name: 'uploadImage',
  components: {},
  props: {
    imageUrl: {
      //  单张模式下的图片链接
      type: String,
      default: ''
    },
    currentIndex: {
      //  当前选择的图片
      type: Number,
      default: 0
    },
    imageUrlArryInit: {
      //  多图模式下的图片数组
      type: String,
      default: ''
    },
    imageType: {
      //  显示图片数量   more 多张   single 单张
      type: String,
      default: 'single'
    },
    noDelete: {
      // 不要删除
      type: Boolean,
      default: false
    },
    noAdd: {
      // 不要添加按钮
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      addImageIcon: addImageIcon,
      deleteImageIcon: deleteImageIcon,
      perviewLeftIcon: perviewLeftIcon,
      perviewRightIcon: perviewRightIcon,
      showPopupFlag: false,
      previewIndex: 0,
      imageUrlArry: []
    }
  },
  watch: {
    currentIndex(value) {
      this.previewIndex = value
    },
    imageUrlArryInit(value) {
      this.imageUrlArry = value.length <= 0 ? [] : value.split(',')
    }
  },
  methods: {
    // 删除图片
    deleteImage() {
      // 给个延迟，让iitem的ndex先改写，再去改写这个item，否则会改到第一条数据去，因为index还没变
      setTimeout(() => {
        this.$emit('editImage', '')
      }, 200)
    },
    // 添加图片
    addImage() {
      upLoadImage(['album', 'camera']).then(res => {
        this.$emit('editImage', res)
      })
    },
    // 删除图片组中的某一图片
    deleteImageArry(index) {
      let array = this.imageUrlArry
      array.splice(index, 1)
      // 给个延迟，让item的index先改写，再去改写这个item，否则会改到第一条数据去，因为index还没变
      setTimeout(() => {
        this.$emit('editImage', array.join(','))
      }, 200)
    },
    // 向图片组内添加图片
    addImageArry() {
      upLoadImage(['album', 'camera']).then(res => {
        let array = this.imageUrlArry
        array.push(res)
        this.$emit('editImage', array.join(','))
      })
    },
    // 预览图片
    showPopup(index) {
      if (!this.imageUrl) {
        uni.previewImage({
          urls: this.imageUrlArry,
          current: this.imageUrlArry[index]
        })
      } else {
        uni.previewImage({
          urls: [this.imageUrl],
          current: this.imageUrl
        })
      }
    }
  },
  mounted() {
    this.imageUrlArry = this.imageUrlArryInit <= 0 ? [] : this.imageUrlArryInit.split(',')
  }
}
</script>
<style lang="scss">
@import '@s/styles/index.scss';

.upload-image-view {
  width: 100%;
  .upload-image {
    position: relative;
    display: block;
    z-index: 10;

    .delete-icon {
      position: absolute;
      top: -21rpx;
      right: -24rpx;
      width: 40rpx;
      height: 40rpx;
    }
  }

  .content {
    display: block;
    width: 126rpx;
    height: 126rpx;
    border-radius: 8rpx;
  }

  .popup-mask {
    position: fixed;
    display: flex;
    top: 0;
    right: 0;
    background: #000000;
    width: 100%;
    height: 100%;
    z-index: 1000;
  }

  .popup-swiper {
    margin: auto;
    width: 100%;
    height: 100%;
  }

  .popup-button-left,
  .popup-button-right {
    position: fixed;
    width: 88rpx;
    height: 88rpx;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.78);
    display: flex;
    align-items: center;
    justify-content: center;

    image {
      width: 48rpx;
      height: 48rpx;
    }
  }
}
</style>
