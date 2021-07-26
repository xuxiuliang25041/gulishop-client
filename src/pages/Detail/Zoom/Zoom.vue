<template>
  <div class="spec-preview">
    <img :src="defaultImg.imgUrl" />
    <div class="event" @mousemove="move"></div>
    <div class="big" >
      <img :src="defaultImg.imgUrl" ref="bigImg"/>
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
  export default {
    name: "Zoom",

    data(){
      return {
        defaultIndex:0
      }
    },

    props:['imageList'],

    mounted(){
      //接收事件，执行回调函数，把data的 改成点击的 index下标
      this.$bus.$on('changeDefaultIndex', (index) => {this.defaultIndex = index})
    },

    methods:{
      move(event){
        //第一步 ， 鼠标动遮罩动
        //  想要遮罩动， 得计算遮罩的位置  dengyu  鼠标的位置- 遮罩自身的一半
        //获取鼠标位置      每次进来都在重新获取鼠标的位置，计算遮罩的位置来做到移动效果
        let moveX = event.offsetX
        let moveY = event.offsetY
        // 获取蒙版
        let mask = this.$refs.mask
        let bigImg = this.$refs.bigImg

        //获取遮罩的位置
        let maskX = moveX - mask.offsetWidth / 2
        let maskY = moveY - mask.offsetHeight / 2

        //判断边界
        if(maskX < 0){
          maskX = 0
        }else if(maskX > mask.offsetWidth){
          maskX =  mask.offsetWidth
        }

        if(maskY < 0){
          maskY = 0
        }else if(maskY > mask.offsetHeight){
          maskY = mask.offsetHeight
        }

        //移动。
        mask.style.left =  maskX + 'px'
        mask.style.top =  maskY +'px'

        // 遮罩移动， 放大镜的图片向相反的方向移动2倍距离
        bigImg.style.left = -2 * maskX + 'px'
        bigImg.style.top = -2 * maskY + 'px'
      }
    },
    
    computed:{
      defaultImg(){
        return this.imageList[this.defaultIndex] || {}
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