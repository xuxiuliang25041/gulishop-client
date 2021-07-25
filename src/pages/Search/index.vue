<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 判断 参数内部是否存在categoryName / keyword 存在就显示  为true  -->
            <li class="with-x" v-if="searchParams.categoryName">{{searchParams.categoryName}}<i @click="removeCategoryName">×</i></li>
            <li class="with-x" v-if="searchParams.keyword">{{searchParams.keyword}}<i @click="removeKeyWord">×</i></li>

            <li class="with-x" v-if="searchParams.trademark">{{searchParams.trademark.split(':')[1]}}<i @click="removeTrademock">×</i></li>
            <li class="with-x" 
            v-for="(prop) in searchParams.props" :key="prop"
            >{{prop.split(":")[1]}}<i @click='removeProps'>×</i></li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector 
          @searchForTrademark="searchForTrademark"
          @searchForProps="searchForProps"
        />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{active : orderFlag === '1'}">
                  <a href="javascript:;" @click="changeOrder('1')">
                    综合 
                    <i 
                      class="iconfont"
                      v-if="orderFlag === '1'"
                      :class="{
                        iconup: orderType === 'asc',
                        icondown: orderType === 'desc'
                      }"
                    ></i>
                    </a>
                </li>
                
                <li :class="{active : orderFlag === '2'}">
                  <a href="javascript:;"  @click="changeOrder('2')">
                    价格
                    <i 
                      class="iconfont"
                       v-if="orderFlag === '2'"
                      :class="{
                        iconup: orderType === 'asc',
                        icondown: orderType === 'desc'
                      }"
                    ></i>
                    </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="(goods) in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <a href="item.html" target="_blank"><img :src="goods.defaultImg" /></a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{goods.price}}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" >{{goods.title}}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
              
            </ul>
          </div>
          <!-- 
            展示当前页码
            展示连续页数
            总条数
            总页数    总条数 / 每一页数量
           -->
          <Pagination
            :currentPageNo="searchParams.pageNo"
            :continueNo="5"
            :total="goodsListInfo.total"
            :pageSize="searchParams.pageSize"
            @changePageNo="getGoodsListInfo"
          ></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import search from '@/store/modules/search';
import { mapState, mapGetters } from 'vuex';
  import SearchSelector from './SearchSelector/SearchSelector'
  export default {
    name: 'Search',

    data(){
      return {
        /* 
          searchParams 是一个对象，里面包含所有的搜索条件，只是一上来的时候大部分搜索条件都是初始化为空的
          今后想要搜索什么，只需要对某个条件进行修改，然后发送请求就行
        */
      // 这个就是我们的初始化搜索参数
        searchParams:{
          category1Id: "",
          category2Id: "",
          category3Id: "",
          categoryName: "",
          keyword: "",
          props: [],
          trademark: "",
          /* 
            排序是根据order 的值来排的，  ：假设前面1是是代表综合排序， 2是价格排序
              desc 就是降序，  asc 是升序 
           */
          order: "1:desc",
          pageNo: 5,    //初始化当前页码
          pageSize: 2,  // 每一页放的数量
        }

      }
    },

    /* //在发送请求之前拿到用户传递的参数, (就是需要搜索的条件参数)
    beforeMount(){
      //拿到传递的参数，放到this.searchParams里面
      //不知道传了啥。盲解    点击三级分类定的是query参数
      let {category1Id, category2Id,category3Id,categoryName} = this.$route.query
      // 搜索框的是params参数
      let {keyword} = this.$route.params

      //...运算符， 相当于最简单的浅拷贝， 
      let searchParams = {
        //吧初始化的参数赋给这个对象， 
        ...this.searchParams,
        //传什么数据  相当于重新赋值
        category1Id,
        category2Id,
        category3Id,
        categoryName,
        keyword,
      }

      //1、 功能：把一个对象的可枚举属性放在一个数组里面
      //2、 参数：这个对象
      //3、 返回值：可枚举属性组成的数组
        //优化一下， 吧所有为空的属性删除
        Object.keys(searchParams).forEach( item => {
          //判断，是否为空
          //如果发的参数是一个undefined，那么这个参数是不会带过去的
          //如果请求里面传的是空串，那么要么删除要么改成undefined
          if(searchParams[item] === ''){
            delete searchParams[item]
          }
        })

      //吧这个对象赋值给data里面的数据
      this.searchParams = searchParams
    }, */


    /* mounted(){
      this.getGoodsListInfo();
    }, */

    methods:{
      //请求数据函数         给请求函数一个形参默认值，为1  每次发送请求的时候就会默认页码跳成1，如果点分页器就覆盖
      getGoodsListInfo(page = 1){
        //先传一个空对象。不知道有什么数据
        /* 
        我们一开始写的搜索参数是一个空的对象，这个空的对象是我们测试的 时候不知道传什么参数
        但是可以让我们先获取一批默认的测试数据展示页面
        这里写空的对象，跳转到search页面，搜索条件什么都没有就是没有按照任何条件搜索过
        */
        this.searchParams.pageNo = page

        this.$store.dispatch('getGoodsListInfo', this.searchParams)
        /* 
        用户从首页跳转到search页面默认就会按照三级分类名称和关键字进行搜索，这个请求其实就是要第一次搜索用的，那么要在它发送之前把用户传递的参数给获取到 
        */ 
      },
    
    //封装  获取用户 传递的参数， 就点击三级分类和搜索关键字  , 专门处理参数
    //在发送请求之前拿到用户传递的参数, (就是需要搜索的条件参数)
    handlerSearchParams(){
      //拿到传递的参数，放到this.searchParams里面
      //不知道传了啥。盲解    点击三级分类定的是query参数
      let {category1Id, category2Id,category3Id,categoryName} = this.$route.query
      // 搜索框的是params参数
      let {keyword} = this.$route.params

      //...运算符， 相当于最简单的浅拷贝， 
      let searchParams = {
        //吧初始化的参数赋给这个对象， 
        ...this.searchParams,
        //传什么数据  相当于重新赋值
        category1Id,
        category2Id,
        category3Id,
        categoryName,
        keyword,
      }

      //1、 功能：把一个对象的可枚举属性放在一个数组里面
      //2、 参数：这个对象
      //3、 返回值：可枚举属性组成的数组
        //优化一下， 吧所有为空的属性删除
        Object.keys(searchParams).forEach( item => {
          //判断，是否为空
          //如果发的参数是一个undefined，那么这个参数是不会带过去的
          //如果请求里面传的是空串，那么要么删除要么改成undefined
          if(searchParams[item] === ''){
            delete searchParams[item]
          }
        })

      //吧这个对象赋值给data里面的数据
      this.searchParams = searchParams
    },

    //点击删除（搜索条件）的三级分类名称
    removeCategoryName(){
      //要做到的： 吧三级分类名称删除， 然后重新请求
      this.searchParams.categoryName = undefined
      // this.getGoodsListInfo()  
      //这样删可以删 但是路径没有改变， 可以重新请求， 而且页面也没有改变

      //方法 路由跳转， push  replace router-link 都可以    //后面这是保存其他数据,只删当前
      //watch监视了route 路由， 所以路径发生改变就会更新数据
      this.$router.push({name: 'search', params: this.$route.params})

    },

    //点击删除关键字
    removeKeyWord(){
      this.searchParams.keyword =  undefined

      this.$router.push({name:'search', query: this.$route.query})

      //利用全局事件总线 通知header组件 搜索完后清除输入框
      /* 
        3步  安装， 就是把总线挂载在vue原型上， 因为vm原型指向的是vue的原型， 组件的原型的原型指向的是vue的原型
             找到要发送消息的组件， 找到$bus 调用emit 传递数据
             要干活的组件，。找到bus 调用$on  执行   
      */
      this.$bus.$emit('clearKeyWord')
    },

    // 根据品牌搜索
    searchForTrademark(tm){
      this.searchParams.trademark = `${tm.tmId}:${tm.tmName}`
      //重新请求
      this.getGoodsListInfo();
    },

    // 删除面包屑里的品牌  删除  然后重新搜索 
    removeTrademock(){
      this.searchParams.trademark = undefined
      //重新请求就行，品牌没有添加到路径, 所以不用考虑路径不更改的情况
      this.getGoodsListInfo()
    },

    //根据属性搜索 
    searchForProps(attr,attrValue){
      let prop  = `${attr.attrId}:${attrValue}:${attr.attrName}`

      // every
      // 功能：查看数组当中是不是每一个都符合需求
      // 参数：类似filter
      // 返回值：如果所有的都符合需求，返回true 由一个不符合就false
      // some
      // 功能：查看数组当中是不是有符合需求的
      // 参数：类似filter
      // 返回值：如果有一个符合，返回true 如果所有的都不符合需求，返回false

      //这里用some 判断是不是有相同的   跟prop比较 相同就是 true。
      let isRepeate = this.searchParams.props.some((item) => item === prop)
      if(isRepeate) return 
      //跳转到当前点击的
      this.searchParams.props.push(prop)
      //点击路由切换 需要重新请求数据
      this.getGoodsListInfo()
    },

    //根据属性删除
    removeProps(index){
      //这是数组， 通过下标删除
      this.searchParams.props.splice(index, 1)
      this.getGoodsListInfo()
    },

    // 给综合和价格排序
    changeOrder(orderFlag){
        //看点击的和当前所在的是不是相同。 是就切换类型（升序还是降序）  不是就切换到当前点击的标志
        // 获取旧的标志和类型
        let originFlag = this.searchParams.order.split(':')[0]
        let originType = this.searchParams.order.split(':')[1]
        //给它一个新的容器
        let newArr

        // 判断点击的是哪一个
        if(orderFlag === originFlag){
          //如果标志相同 ，。 切换类型
          newArr = `${orderFlag}:${originType === 'asc'? 'desc' : 'asc'}`
        }else{
          // 如果标志不同。 切换到当前标志, 类型给它个默认值
          newArr = `${orderFlag}:desc`
        }
        // 修改数据， 然后重新发送请求
        this.searchParams.order = newArr
        this.getGoodsListInfo()
    },

    //接收子组件传过来的点击信息 ，调用函数， 改变data中searchparams数据，然后重新发送请求
    // changePageNo(page){
    //   this.searchParams.pageNo = page
    //   this.getGoodsListInfo()
    // }


    },

    computed:{
      //父组件
      ...mapGetters(['goodsList']),
      ...mapState({
        goodsListInfo: state => state.search.goodsListInfo
      }),

       orderFlag(){
        return this.searchParams.order.split(':')[0] 
      },

      orderType(){
        return this.searchParams.order.split(':')[1]
      }
    },

    watch:{
      // 封装 监视点击调用   点击搜索关键字不会发生变化，  因为mounted 发送请求只会发送一次， 所以需要监视，， $route,当前路由的改变，发生改变就请求
      $route: {
        immediate: true,
        handler(){
          //点击三级分类和搜索关键字就调用和重新请求
          this.handlerSearchParams();
          this.getGoodsListInfo();
        }
      }
    },
    


    components: {
      SearchSelector
    }
  }
</script>

<style lang="less" scoped>
  .main {
    margin: 10px 0;

    .py-container {
      width: 1200px;
      margin: 0 auto;

      .bread {
        margin-bottom: 5px;
        overflow: hidden;

        .sui-breadcrumb {
          padding: 3px 15px;
          margin: 0;
          font-weight: 400;
          border-radius: 3px;
          float: left;

          li {
            display: inline-block;
            line-height: 18px;

            a {
              color: #666;
              text-decoration: none;

              &:hover {
                color: #4cb9fc;
              }
            }
          }
        }

        .sui-tag {
          margin-top: -5px;
          list-style: none;
          font-size: 0;
          line-height: 0;
          padding: 5px 0 0;
          margin-bottom: 18px;
          float: left;

          .with-x {
            font-size: 12px;
            margin: 0 5px 5px 0;
            display: inline-block;
            overflow: hidden;
            color: #000;
            background: #f7f7f7;
            padding: 0 7px;
            height: 20px;
            line-height: 20px;
            border: 1px solid #dedede;
            white-space: nowrap;
            transition: color 400ms;
            cursor: pointer;

            i {
              margin-left: 10px;
              cursor: pointer;
              font: 400 14px tahoma;
              display: inline-block;
              height: 100%;
              vertical-align: middle;
            }

            &:hover {
              color: #28a3ef;
            }
          }
        }
      }

      .details {
        margin-bottom: 5px;

        .sui-navbar {
          overflow: visible;
          margin-bottom: 0;

          .filter {
            min-height: 40px;
            padding-right: 20px;
            background: #fbfbfb;
            border: 1px solid #e2e2e2;
            padding-left: 0;
            border-radius: 0;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

            .sui-nav {
              position: relative;
              left: 0;
              display: block;
              float: left;
              margin: 0 10px 0 0;

              li {
                float: left;
                line-height: 18px;

                a {
                  display: block;
                  cursor: pointer;
                  padding: 11px 15px;
                  color: #777;
                  text-decoration: none;
                }

                &.active {
                  a {
                    background: #e1251b;
                    color: #fff;
                  }
                }
              }
            }
          }
        }

        .goods-list {
          margin: 20px 0;

          ul {
            display: flex;
            flex-wrap: wrap;

            li {
              height: 100%;
              width: 20%;
              margin-top: 10px;
              line-height: 28px;

              .list-wrap {
                .p-img {
                  padding-left: 15px;
                  width: 215px;
                  height: 255px;

                  a {
                    color: #666;

                    img {
                      max-width: 100%;
                      height: auto;
                      vertical-align: middle;
                    }
                  }
                }

                .price {
                  padding-left: 15px;
                  font-size: 18px;
                  color: #c81623;

                  strong {
                    font-weight: 700;

                    i {
                      margin-left: -5px;
                    }
                  }
                }

                .attr {
                  padding-left: 15px;
                  width: 85%;
                  overflow: hidden;
                  margin-bottom: 8px;
                  min-height: 38px;
                  cursor: pointer;
                  line-height: 1.8;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;

                  a {
                    color: #333;
                    text-decoration: none;
                  }
                }

                .commit {
                  padding-left: 15px;
                  height: 22px;
                  font-size: 13px;
                  color: #a7a7a7;

                  span {
                    font-weight: 700;
                    color: #646fb0;
                  }
                }

                .operate {
                  padding: 12px 15px;

                  .sui-btn {
                    display: inline-block;
                    padding: 2px 14px;
                    box-sizing: border-box;
                    margin-bottom: 0;
                    font-size: 12px;
                    line-height: 18px;
                    text-align: center;
                    vertical-align: middle;
                    cursor: pointer;
                    border-radius: 0;
                    background-color: transparent;
                    margin-right: 15px;
                  }

                  .btn-bordered {
                    min-width: 85px;
                    background-color: transparent;
                    border: 1px solid #8c8c8c;
                    color: #8c8c8c;

                    &:hover {
                      border: 1px solid #666;
                      color: #fff !important;
                      background-color: #666;
                      text-decoration: none;
                    }
                  }

                  .btn-danger {
                    border: 1px solid #e1251b;
                    color: #e1251b;

                    &:hover {
                      border: 1px solid #e1251b;
                      background-color: #e1251b;
                      color: white !important;
                      text-decoration: none;
                    }
                  }
                }
              }
            }
          }
        }

        .page {
          width: 733px;
          height: 66px;
          overflow: hidden;
          float: right;

          .sui-pagination {
            margin: 18px 0;

            ul {
              margin-left: 0;
              margin-bottom: 0;
              vertical-align: middle;
              width: 490px;
              float: left;

              li {
                line-height: 18px;
                display: inline-block;

                a {
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  border: 1px solid #e0e9ee;
                  margin-left: -1px;
                  font-size: 14px;
                  padding: 9px 18px;
                  color: #333;
                }

                &.active {
                  a {
                    background-color: #fff;
                    color: #e1251b;
                    border-color: #fff;
                    cursor: default;
                  }
                }

                &.prev {
                  a {
                    background-color: #fafafa;
                  }
                }

                &.disabled {
                  a {
                    color: #999;
                    cursor: default;
                  }
                }

                &.dotted {
                  span {
                    margin-left: -1px;
                    position: relative;
                    float: left;
                    line-height: 18px;
                    text-decoration: none;
                    background-color: #fff;
                    font-size: 14px;
                    border: 0;
                    padding: 9px 18px;
                    color: #333;
                  }
                }

                &.next {
                  a {
                    background-color: #fafafa;
                  }
                }
              }
            }

            div {
              color: #333;
              font-size: 14px;
              float: right;
              width: 241px;
            }
          }
        }
      }
    }
  }
</style>