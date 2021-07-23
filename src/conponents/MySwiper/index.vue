<template>
                  <!--banner轮播-->
                    <div class="swiper-container" :ref="refName" >
                        <div class="swiper-wrapper">
                            <div class="swiper-slide"
                             v-for="(banner) in bannerList"
                              :key="banner.id"
                              :banner="banner"
                              >
                                <img :src="banner.imgUrl" />
                            </div>
                            
                        </div>
                        <!-- 如果需要分页器 -->
                        <div class="swiper-pagination"></div>

                        <!-- 如果需要导航按钮 -->
                        <div class="swiper-button-prev"></div>
                        <div class="swiper-button-next"></div>
                    </div>
</template>

<script>
import Swiper from 'swiper'
export default {
  name: 'MySwiper',

  props:['bannerList', 'refName'],

  watch:{
      bannerList:{
        immediate: true,
          handler(){
              //watch会执行2次， 最开始加载时会执行一次获取设置了空的数组， 然后才是请求到的数据
              //所以要使用 Vue.$nextTick 或者 vm.$nextTick  执行一次之后。在下次执行之后调用 第一个参数回调函数
              this.$nextTick(() => {
                  new Swiper (this.$refs[this.refName], {
                    // direction: 'vertical', // 垂直切换选项 默认横向
                    // loop: true, // 循环模式选项
                    
                    // 如果需要分页器
                    pagination: {
                    el: '.swiper-pagination',
                    },
                    
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

<style lang='less' scoped>

</style>
