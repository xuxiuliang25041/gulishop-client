<template>
  <div class="spec-preview">
    <img :src="defaultImg.imgUrl" />
    <div class="event" @mousemove="move"></div>
    <div class="big">
      <img :src="defaultImg.imgUrl" ref="bigImg"/>
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
  export default {
    name: "Zoom",

    props:['imageList'],

    data(){
      return {
        defaultIndex: 0
      }
    },

    //接收事件， 改变index下标
    mounted(){
      this.$bus.$on('changeDefaultIndex', (index) => this.defaultIndex = index)
    },

    methods:{
      //要蒙版跟着鼠标动，。 要获取蒙版位置，  等于  鼠标位置  - 遮罩自身的一半
      move(event){
        //获取鼠标位置  offsetX
        let moveX = event.offsetX
        let moveY = event.offsetY
        //获取遮罩
        let mask = this.$refs.mask
        let bigImg = this.$refs.bigImg

        //遮罩的位置  
        let maskX = moveX - mask.offsetWidth / 2
        let maskY = moveY - mask.offsetHeight / 2

        //判断边界
        if(maskX < 0){
          maskX = 0
        }else if(maskX > mask.offsetWidth){
          maskX = mask.offsetWidth
        }

        if(maskY < 0){
          maskY = 0
        }else if(maskY > mask.offsetHeight){
          maskY = mask.offsetHeight
        }

        //移动 修改样式   ，每次改变鼠标位置都会触发 ，修改， 做到移动
        mask.style.left = maskX + 'px'
        mask.style.top = maskY + 'px'

        //遮罩移动， 大图相反的方向移动2倍
        bigImg.style.left = -2 * maskX + 'px'
        bigImg.style.top = -2* maskY + 'px'
      }
    },


  // 计算当前图片
  computed:{
    defaultImg(){
      return this.imageList[this.defaultIndex] || []
    }
  },
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>