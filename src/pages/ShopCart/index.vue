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
<<<<<<< HEAD
      <!--   遍历的是外层的  如果有购物券之类的  -->
      <div class="cart-body"  v-for="(cart, index) in shopCartList" :key="index">
        <ul class="cart-list" v-for="(cartInfo) in cart.cartInfoList" :key="cartInfo.skuId">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list"
                 :checked="cartInfo.isChecked"
                  @click="updateOneIsCheck(cartInfo)"
=======
      <div class="cart-body" v-for="(cart, index) in shopCartList" :key="index">
        <ul class="cart-list" v-for="(cartInfo) in cart.cartInfoList" :key="cartInfo.skuId">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list"
             :checked="cartInfo.isChecked"
             @click="changeOneCheck(cartInfo)"
>>>>>>> 8ab7c3510385ca309a68e465696f0e022220180d
             >
          </li>
          <li class="cart-list-con2">
            <img :src="cartInfo.imgUrl">
            <div class="item-msg">{{cartInfo.skuName}}</div>
          </li>
<<<<<<< HEAD
          <!-- <li class="cart-list-con3">
            <div class="item-txt">语音升级款</div>
          </li> -->
          <li class="cart-list-con4">
            <span class="price">{{cartInfo.skuPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins"
               @click="changeNum(-1, cartInfo)
             ">-</a>
             <!-- 要的是差值，  $event 是事件 的回调函数的默认参数，  就是事件对象，  用户输入的最终值减去原本有的值 就是差值 -->
            <input autocomplete="off" type="text" :value="cartInfo.skuNum" minnum="1" class="itxt"
              @change="changeNum($event.target.value*1 -cartInfo.skuNum, cartInfo)"
            >
            <a href="javascript:void(0)" class="plus" 
              @click="changeNum(1, cartInfo)"
            >+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{cartInfo.skuNum * cartInfo.skuPrice}}</span>
          </li>
          <li class="cart-list-con7">
            <a href="javascript:;" class="sindelet" @click="deleteOneCart(cartInfo)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>

        
=======
          
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

>>>>>>> 8ab7c3510385ca309a68e465696f0e022220180d
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
<<<<<<< HEAD
        <input class="chooseAll" type="checkbox" v-model="isCheckAll" >
=======
        <input class="chooseAll" type="checkbox" v-model="checkAll">
>>>>>>> 8ab7c3510385ca309a68e465696f0e022220180d
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
<<<<<<< HEAD
      this.getShopCartList()
    },

    methods:{
      getShopCartList(){
        this.$store.dispatch("getShopCartList")
      },

      //修改购物车商品数量      差值  修改的是数据库  后台的数据 然后重新请求
     async changeNum(disNum, cartInfo){
          // 如果差值(用户输入的值)加上原来的值小于1 证明有问题， 得修正， 
          if(disNum + cartInfo.skuNum < 1){
            disNum = 1 - cartInfo.skyNum
          }

          // 如果正常  dispatch 获取数据， 
          try {
            // 发送请求
            await this.$store.dispatch('addOrUpdateShopCart', {skuId: cartInfo.skuId, skuNum: disNum})
            alert(' 商品数量这边显示添加成功l')
            // 重新发请求拿数据
            this.getShopCartList()
          } catch (error) {
            alert('商品添加失败')
          }
      },

      //修改单个状态  
     async updateOneIsCheck(cartInfo){
        
        try {
            await this.$store.dispatch('updateOneIsCheck',{
            skuId: cartInfo.skuId,
            isChecked: cartInfo.isChecked ? 0 : 1
          })  
          alert('点击修改选中成功')
          // 发送请求完后， 更新页面数据
          this.getShopCartList()
        } catch (error) {
          alert('点击修改选中失败')
        }
        
      },

      // 删除单个 
     async deleteOneCart(cartInfo){
        //动态的数据， 吧id传过去就直接删除， 然后重新请求
       try {
         await this.$store.dispatch('deleteOneCart', cartInfo.skuId)
            alert('删除单个成功')
            this.getShopCartList()
       } catch (error) {
        alert('删除单个失败')
       }
      },

      //删除全部选中的
     async deleteAllCart(){
      // 先给默认一个空数组 
        let skuIdList = []
        
        this.shopCartList.forEach((item) => {
          item.cartInfoList.forEach((item1) => {
            if(item1.isChecked){
              skuIdList.push(item1.skuId)
            }
          })
        });
=======
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
>>>>>>> 8ab7c3510385ca309a68e465696f0e022220180d

          try {
            await this.$store.dispatch('deleteAllCart', skuIdList)
            alert('删除全部成功')
<<<<<<< HEAD
            this.getShopCartList()
          } catch (error) {
            alert('删除全部的失败')
=======
            this.getCartListInfo()
          } catch (error) {
            alert('删除全部失败')
>>>>>>> 8ab7c3510385ca309a68e465696f0e022220180d
          }
      }

    },

    computed:{
<<<<<<< HEAD
      ...mapState({
        shopCartList: state => state.shopcart.shopCartList 
      }),

      //计算商品总数
      checkedNum(){
          //reduce  累加    需要的是内层 数组的数据 来计算
          //内层统计完每一个对象 返回给外面的对象  外层就先当做遍历

        //最后这个函数是要返回这个遍历之后需要的数据的
         return this.shopCartList.reduce((pre, item) => {
            
            //外层数组遍历一个 把这个内层数据的已选择的都加起来，然后返回
           pre += item.cartInfoList.reduce((pre1, item1) => {
              //判断是已选择的 累加
              if(item1.isChecked){
                pre1 += item1.skuNum
              }
              // 然后将结果返回
              return pre1
            },0)
              return pre
          },0)
      },

      //计算已经选择的商品总价  isChecked为true的
      allMoney(){
        //遍历累加  reduce
        return this.shopCartList.reduce((pre, item) => {
           pre += item.cartInfoList.reduce((pre1, item1) => {
              if(item1.isChecked){
                pre1 += item1.skuNum * item1.cartPrice
              }
              return pre1
            },0)
            return pre
        },0)
      },

       // 获取 全选框的动态
      isCheckAll:{
          //v-model  可以配合get set 使用，   isChecked 是click 事件
          get(){
            //如何判断我是否全部选中了。  every方法， 判断是否全部选中
            
             //  这才是内层   every 返回布尔值, 全部是true才返回true ，
           return ( this.shopCartList.every((item) =>
                      item.cartInfoList.every((item1) =>  item1.isChecked )
                      ) && this.shopCartList.length > 0 )
                      
          },
          // 修改多个状态 set 里面  一开始监视了全选框
        async set(val){
            //获取输入的状态 是 哪个  val 就是点击时候的状态  isChecked只能是数字， 所以得把它转成1 或者0
            let isChecked = val ? 1 : 0
            //给它默认为数组  
            // let skuIdList = [];

          let skuIdList =  this.shopCartList.reduce((pre, item) => {
            
            //吧内层数组里面遍历的数据...展开推到外面的数组
             pre.push(...item.cartInfoList.reduce((pre1, item1) => {
                if(item1.isChecked !== isChecked){
                  pre1.push(item1.skuId)
                }
                return pre1
              },[])) 
              return pre
            },[])

            // this.shopCartList.forEach((item) => {
            //     item.cartInfoList.forEach((item1) => {
            //       if(item1.isChecked !== isChecked){
            //         skuIdList.push(item1.skuId)
            //       }
            //     });
            // });

            try {
              await this.$store.dispatch('updateAllIsCheck', { isChecked, skuIdList})
              alert('购物车全部状态修改成功')
              this.getShopCartList()
            } catch (error) {
              alert('购物车全部状态修改失败')
            }

          }
      } 
=======
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
>>>>>>> 8ab7c3510385ca309a68e465696f0e022220180d

     

    },

<<<<<<< HEAD

=======
>>>>>>> 8ab7c3510385ca309a68e465696f0e022220180d
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

<<<<<<< HEAD
         /*  .cart-list-con3 {
            width: 20.8333%;

            .item-txt {
              text-align: center;
            }
          } */
=======
         
>>>>>>> 8ab7c3510385ca309a68e465696f0e022220180d

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