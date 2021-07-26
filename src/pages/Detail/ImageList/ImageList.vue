<template>
  <div class="swiper-container" ref="imgSwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(img,index) in imageList" :key="img.id">
        <img :src="img.imgUrl"
          :class="{active: defaultIndex === index}"
          @click="changeDefaultIndex(index)"
        >
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>

  import Swiper from 'swiper'
  export default {
    name: "ImageList",

    data(){
      return {
        defaultIndex: 0
      }
    },

    props:['imageList'],


    methods:{
      changeDefaultIndex(index){
        this.defaultIndex = index

        //全局事件总线  给 兄弟组件分发当前下标， 让大图跟着显示
        this.$bus.$emit('changeDefaultIndex', index)
      }
    },
    
    watch:{
      imageList:{
        immediate: true,
          handler(){
              //watch会执行2次， 最开始加载时会执行一次获取设置了空的数组， 然后才是请求到的数据
              //所以要使用 Vue.$nextTick 或者 vm.$nextTick  执行一次之后。在下次执行之后调用 第一个参数回调函数
              this.$nextTick(() => {
                  new Swiper (this.$refs.imgSwiper, {
                    // direction: 'vertical', // 垂直切换选项 默认横向
                    // loop: true, // 循环模式选项
                    
                    // // 如果需要分页器
                    // pagination: {
                    // el: '.swiper-pagination',
                    // },
                    slidesPerView:3,
                    slidesPerGroup: 3,
                    // 如果需要前进后退按钮
                    navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                    },
                    
                    // // 如果需要滚动条                
                    // scrollbar: {
                    // el: '.swiper-scrollbar',
                    // },
                })
              })
          }
      }
  }
   
  }
</script>

<style lang="less" scoped>
  .swiper-container {
    height: 56px;
    width: 412px;
    box-sizing: border-box;
    padding: 0 12px;

    .swiper-slide {
      width: 56px;
      height: 56px;

      img {
        width: 100%;
        height: 100%;
        border: 1px solid #ccc;
        padding: 2px;
        width: 50px;
        height: 50px;
        display: block;

        &.active {
          border: 2px solid #f60;
          padding: 1px;
        }

        &:hover {
          border: 2px solid #f60;
          padding: 1px;
        }
      }
    }

    .swiper-button-next {
      left: auto;
      right: 0;
    }

    .swiper-button-prev {
      left: 0;
      right: auto;
    }

    .swiper-button-next,
    .swiper-button-prev {
      box-sizing: border-box;
      width: 12px;
      height: 56px;
      background: rgb(235, 235, 235);
      border: 1px solid rgb(204, 204, 204);
      top: 0;
      margin-top: 0;
      &::after {
        font-size: 12px;
      }
    }
  }
</style>