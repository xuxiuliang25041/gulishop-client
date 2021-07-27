<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body" v-for="(cart, index) in shopCartList" :key="index">
        <ul class="cart-list" v-for="(cartInfo) in cart.cartInfoList" :key="cartInfo.skuId">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list"
             :checked="cartInfo.isChecked"
             @click="changeOneCheck(cartInfo)"
             >
          </li>
          <li class="cart-list-con2">
            <img :src="cartInfo.imgUrl">
            <div class="item-msg">{{cartInfo.skuName}}</div>
          </li>
          
          <li class="cart-list-con4">
            <span class="price">{{cartInfo.cartPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins"
                @click="changeNum(-1, cartInfo)"
            >-</a>
              <!--                        change事件  点击传参 当前输入的值减去原来的值 -->
            <input autocomplete="off" type="text" :value="cartInfo.skuNum" minnum="1" class="itxt" @change="changeNum($event.target.value*1 - cartInfo.skuNum, cartInfo)">
            <a href="javascript:void(0)" class="plus"
                 @click="changeNum(1, cartInfo)"
            >+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{cartInfo.skuNum * cartInfo.cartPrice}}</span>
          </li>
          <li class="cart-list-con7">
            <a href="javascript:;" class="sindelet" @click="deleteOne(cartInfo)">删除</a>
            <br>
            <a href="javascript:;">移到收藏</a>
          </li>
        </ul>

      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" v-model="checkAll">
        <span>全选</span>
      </div>
      <div class="option">
        <a href="javascript:;" @click="deleteAllCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>{{checkedNum}}</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{allMoney}}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="###" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
  export default {
    name: 'ShopCart',

    mounted(){
      this.getCartListInfo()
    },

    methods:{
      getCartListInfo(){
        this.$store.dispatch('getCartListInfo')
      },

      //修改购物车数量
      async changeNum(disNum, cartInfo){
          //disNum 差值， 可能会有问题， 当原来的值加上差值 就是最终显示的值， 当这个值小于一要修正
          if(cartInfo.skuNum + disNum < 1){
            disNum = 1 - cartInfo.skuNum
          }

          //然后dispatch   重新请求页面
          try {
            console.log(11111111) 
            await this.$store.dispatch('getAddOrUpdateShopCart', {skuId: cartInfo.skuId, skuNum: disNum})
             alert('修改购物车数量成功');
            this.getCartListInfo()
          } catch (error) {
            alert('修改数量失败')
          }
      },

    // 改变单个状态
     async changeOneCheck(cartInfo){
          try {
            //dispatch 跟vuex联系， 如果为true 改成0 
            await this.$store.dispatch('changeOneCheck', {skuId:cartInfo.skuId, isChecked:cartInfo.isChecked ? 0 : 1})
            alert('修改单个状态成功')
            this.getCartListInfo()
          } catch (error) {
            alert('单个状态失败')
          }
      },

       //删除单个
     async deleteOne(cartInfo){
        //skuId 是动态的， 点那个就是哪个
          try {
            await this.$store.dispatch('deleteOneCart', cartInfo.skuId)
            console.log(111111)
            alert('删除单个成功')
            this.getCartListInfo()
          } catch (error) {
            alert('删除单个但是失败了额 ');
          }
      },

      //删除多个
      async deleteAllCart(){
        //创建一个空数组 ，存放id
        let skuIdList = []
          //判断是否选中 遍历所有，  forEach 
          this.shopCartList.forEach((item) => {
            item.cartInfoList.forEach((item1) => {
              if( item1.isChecked){
                  skuIdList.push(item1.skuId)
              }
            })
          })

          try {
            await this.$store.dispatch('deleteAllCart', skuIdList)
            alert('删除全部成功')
            this.getCartListInfo()
          } catch (error) {
            alert('删除全部失败')
          }
      }

    },

    computed:{
      // 吧 shopCartList 简化出来一点
      ...mapState({
        shopCartList : state => state.shopcart.shopCartList
      }),

      //计算 一共商品数量
      checkedNum(){
        // 遍历累加 ，reduce   先就把外层当做遍历 ，， 内层处理
        //最后这个数组的遍历的值是要返回出去的
       return this.shopCartList.reduce((pre, item) => {
        pre  +=  item.cartInfoList.reduce((pre1, item1) => {
            if(item1.isChecked){
               pre1 += item1.skuNum
            }
            return pre1
          },0)
          //返回它  外层接收到
        return pre
        },0)
      },

      //计算总价
      allMoney(){
        //reduce
        return this.shopCartList.reduce((pre, item) =>{
             pre += item.cartInfoList.reduce((pre1,item1) => {
                if(item1.isChecked){
                  pre1 += item1.skuNum * item1.cartPrice
                }
                return pre1
              },0)
                return pre
        },0)
      },
      
      // 计算全选框， get set 方法 
      checkAll:{
        get(){
          //全选 就是判断有没有全部选中，isChecked  用every方法， 返回的是布尔值
          return this.shopCartList.every((item) => item.cartInfoList.every((item1) => item1.isChecked))

        },
       async set(value){
          //监视过全选， 修改多个状态 set
          //val 就是当前的值，点击的值
          //遍历 判断 isChecked 为flase 的 吧它的skuId 传到一个空数组 
          //因为数据里面isChecked是1 或者0   要转一下
          let isChecked = value? 1 : 0
          // let skuIdList = []  // 避免遍历是undefined 给个默认的值 空数组  forEach遍历的

        let skuIdList = this.shopCartList.reduce((pre, item) => {
                pre.push(...item.cartInfoList.reduce((pre1, item1) => {
                  if(item1.isChecked !== isChecked){
                    pre1.push(item1.skuId)
                  }
                  return pre1
                },[]))
                return pre
          },[]);
            
          try {
            await this.$store.dispatch('changeAllCart', {isChecked, skuIdList,})
            alert('修改多个成功')
            this.getCartListInfo()
          } catch (error) {
            alert('失败  修改多个有问题')
          }

        }
      },

     

    },

  }
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 15%;
          }

          .cart-list-con2 {
            width: 35%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }

         

          .cart-list-con4 {
            width: 10%;

          }

          .cart-list-con5 {
            width: 17%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 10%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 13%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>