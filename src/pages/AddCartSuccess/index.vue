<template>
  <div class="cart-complete-wrap">
    <div class="cart-complete">
      <h3><i class="sui-icon icon-pc-right"></i>商品已成功加入购物车！</h3>
      <div class="goods">
        <div class="left-good">
          <div class="left-pic">
            <img src="good.skuDefaultImg">
          </div>
          <div class="right-info">
            <p class="title">{{skuInfo.skuName}}</p>
            <p class="attr">颜色：WFZ5099IH/5L钛金釜内胆 数量：{{skuNum}}</p>
          </div>
        </div>
        <div class="right-gocart">
<<<<<<< HEAD
          <router-link :to="'/detail/' + skuInfo.id">查看商品详情</router-link>
=======
          <router-link  class="sui-btn btn-xlarge" :to="'/detail/' + skuInfo.id">查看商品详情</router-link>
>>>>>>> 8ab7c3510385ca309a68e465696f0e022220180d
          <!-- <a href="javascript:" class="sui-btn btn-xlarge">查看商品详情</a> -->
          <router-link to="/shopcart">去购物车结算 ></router-link>
          <!-- <a href="javascript:" >去购物车结算 > </a> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AddCartSuccess',
<<<<<<< HEAD

   data(){
     return {
       skuNum: '',
       skuInfo: ''  //商品详情， 从sessionStorage里面获取， 
     }
   }, 

    //简化代码，从路由跳转的时候携带的query参数，     商品详情数据 
    beforeMount(){
      this.skuNum = this.$route.query.skuNum
      this.skuInfo = JSON.parse(sessionStorage.getItem('shopcart_key'))
    },

   //从存储到sessionStorage里面的数据拿出来展示  可以在beforemount里面， mounted也可以
  

=======
    
    data(){
      return {
        skuNum: '',
        skuInfo: '',
      }
    },

    beforeMount(){
      //获取query携带的参数 商品数量
      this.skuNum = this.$route.query.skuNum
      //sessionStorage存储的商品详情数据
      this.skuInfo = JSON.parse(sessionStorage.getItem('skuInfo_key'))
    }
>>>>>>> 8ab7c3510385ca309a68e465696f0e022220180d
  }
</script>

<style lang="less" scoped>
  .cart-complete-wrap {
    background-color: #f4f4f4;

    .cart-complete {
      width: 1200px;
      margin: 0 auto;

      h3 {
        font-weight: 400;
        font-size: 16px;
        color: #6aaf04;
        padding-top: 15px;
        padding-bottom: 15px;
        margin: 0;

        .icon-pc-right {
          background-color: #fff;
          border: 2px solid #6aaf04;
          padding: 3px;
          margin-right: 8px;
          border-radius: 15px;
        }
      }

      .goods {
        overflow: hidden;
        padding: 10px 0;

        .left-good {
          float: left;

          .left-pic {
            border: 1px solid #dfdfdf;
            width: 60px;
            float: left;
            img {
              width: 60px;
              height: 60px;
            }
          }

          .right-info {
            color: #444;
            float: left;
            margin-left: 10px;

            .title {
              width: 100%;
              line-height: 28px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              font-size: 14px;
            }

            .attr {
              color: #aaa;
            }
          }
        }

        .right-gocart {
          float: right;

          a {
            padding: 7px 36px;
            font-size: 15px;
            line-height: 22px;
            color: #333;
            background-color: #eee;
            text-decoration: none;
            box-sizing: border-box;
            border: 1px solid #e1e1e1;
          }

          a:hover {
            background-color: #f7f7f7;
            border: 1px solid #eaeaea;
          }

          a:active {
            background-color: #e1e1e1;
            border: 1px solid #d5d5d5;
          }

          .btn-danger {
            background-color: #e1251b;
            color: #fff;
          }

          .btn-danger:hover {
            background-color: #e1251b;
          }
        }

      }
    }
  }
</style>