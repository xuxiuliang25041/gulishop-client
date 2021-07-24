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
            <!-- 判断是否存在categoryName  为true显示 -->
            <li class="with-x" v-if="searchParams.categoryName">{{searchParams.categoryName}}<i @click="removeCategoryName">×</i></li>
            <li class="with-x" v-if="searchParams.keyword">{{searchParams.keyword}}<i @click="removeKeyWord">×</i></li>
            <li class="with-x" v-if="searchParams.trademark">{{searchParams.trademark.split(":")[1]}}<i @click="removeTrademark">×</i></li>

            <li class="with-x" v-for="(prop, index) in searchParams.props" :key="prop">
              {{ prop.split(":")[1]
              }}<i @click="removeProp(index)">×</i>
            </li>
          </ul>  
        </div>

        <!--selector-->
        <SearchSelector 
          @searchTrademark="searchTrademark"
          @searchProps="searchProps"
        />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li class="active">
                  <a href="#">综合</a>
                </li>
                <li>
                  <a href="#">销量</a>
                </li>
                <li>
                  <a href="#">新品</a>
                </li>
                <li>
                  <a href="#">评价</a>
                </li>
                <li>
                  <a href="#">价格⬆</a>
                </li>
                <li>
                  <a href="#">价格⬇</a>
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
          <div class="fr page">
            <div class="sui-pagination clearfix">
              <ul>
                <li class="prev disabled">
                  <a href="#">«上一页</a>
                </li>
                <li class="active">
                  <a href="#">1</a>
                </li>
                <li>
                  <a href="#">2</a>
                </li>
                <li>
                  <a href="#">3</a>
                </li>
                <li>
                  <a href="#">4</a>
                </li>
                <li>
                  <a href="#">5</a>
                </li>
                <li class="dotted"><span>...</span></li>
                <li class="next">
                  <a href="#">下一页»</a>
                </li>
              </ul>
              <div><span>共10页&nbsp;</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
  import SearchSelector from './SearchSelector/SearchSelector'
  export default {
    name: 'Search',

    data(){
      return {
        searchParams:{
          //设置初始化数据， searchParams是一个对象， 包含大部分搜索条件，默认初始化状态
          //如果需要按照那个条件搜索，就只用修改哪个条件的数据
          category1Id: "",
          category2Id: "",          
          category3Id: "",
          categoryName: "",
          keyword: "",
          props: [],
          trademark: "" ,     

          order: "1:desc",//初始化默认的排序规则
          pageNo: 1,
          pageSize: 10,
        }
      }
    },

    /* beforeMount(){
      //需要获取到用户输入的搜索条件放到this.searchParams里面
      // 盲解。，   query参数  和 params参数
      let {category1Id,category2Id,category3Id,categoryName} = this.$route.query
      let {keyword} = this.$route.params

      //...运算符， 展开操作，相当于最简单的浅拷贝
      let searchParams = {
        ...this.searchParams,
        //用户点击的搜索条件，有就更改
        category1Id,
        category2Id,
        category3Id,
        categoryName,
        keyword
      }
      // Object.keys()
      // //1、 功能：把一个对象的可枚举属性放在一个数组里面
  //   // //2、 参数：这个对象
  //   // //3、 返回值：可枚举属性组成的数组
    // 如果发送的数据是undefined 那么参数是不会带过去的
    // 但是“” 空串是会带过去的，。 会增加带宽。 浪费资源
    //
    Object.keys(searchParams).forEach((item) => {
      if(categoryName[item] === ''){
        delete categoryName[item]
      }
    })
      //把添加搜索条件后的数据赋给data中
      this.searchParams = searchParams
    }, */

    mounted(){
      // this.getGoodsListInfo()
      console.log(this.$route.query)
    },

    methods:{
      getGoodsListInfo(){
        //先传一个空对象， 获取默认给的数据测试  如果什么都不传就穿个空对象，相当于就是说没有按照给定的条件去搜索
        // this.$store.dispatch('getGoodsListInfo', {})
        //
        this.$store.dispatch('getGoodsListInfo', this.searchParams)
      },

      //获取搜索条件 ，更改数据 专门修改数据  
      handlerSearchParams(){
        //需要获取到用户输入的搜索条件放到this.searchParams里面
      // 盲解。，   query参数  和 params参数
      let { category1Id, category2Id, category3Id, categoryName } =
       this.$route.query;
      let {keyword} = this.$route.params

      //...运算符， 展开操作，相当于最简单的浅拷贝
        //用户点击的搜索条件，有就更改
      let searchParams = {
        ...this.searchParams,
        category1Id,
        category2Id,
        category3Id,
        categoryName,
        keyword
      };
      // Object.keys()
      // //1、 功能：把一个对象的可枚举属性放在一个数组里面
  //   // //2、 参数：这个对象
  //   // //3、 返回值：可枚举属性组成的数组
    // 如果发送的数据是undefined 那么参数是不会带过去的
    // 但是“” 空串是会带过去的，。 会增加带宽。 浪费资源
    //
    Object.keys(searchParams).forEach((item) => {
      if(categoryName[item] === ""){
        delete categoryName[item]
      }
    })
      //把添加搜索条件后的数据赋给data中
      this.searchParams = searchParams
      },

      // 点击面包屑  删除选中的三级分类名称，query参数的
      removeCategoryName(){
        this.searchParams.categoryName = undefined;
        // 直接改为undefined 路径不会发生变化， 得用路由 push replace router-link 等 
       
        this.$router.push({ name: "search", params: this.$route.params });
        // this.getGoodsListInfo()
        //监视$route 发生改变watch调用 ，这只是在修改路径， 
      },

      //删除关键字  ， params参数的
      removeKeyWord(){
        this.searchParams.keyword = undefined
        this.$router.push({name: 'search', query: this.$route.query})

        //全局事件总线  通知header 删除输入框内容  通知谁就emit 发送
        this.$bus.$emit('clearSearch')

      },

      //根据品牌搜索
      searchTrademark(tm){
        //根据后台的规定 获取指定形式的数据赋值给data中的trademark
        this.searchParams.trademark = `${tm.tmId}:${tm.tmName}`
        this.getGoodsListInfo()
      },

      //根据品牌删除
      removeTrademark(){
        this.searchParams.trademark = undefined
          this.getGoodsListInfo()
      },

      //根据属性搜索
      searchProps(attr,attrValue){
        //获取搜索条件， 然后重新请求
          this.searchParams.props = `${attr.attrId}:${attrValue}:${attr.attrName}`
          this.getGoodsListInfo()
      },

      //根据属性删除
      removeProps(index){
        this.searchParams.props.splice(index,1)
        this.getGoodsListInfo()
      }
      

    },

    computed:{
      ...mapGetters(['goodsList'])
    },
    
    // 因为mounted只会执行一次， 所以点了一次之后再点是不会发送请求了，所以变成 监视watch $route变化
    watch:{
      $route:{
        immediate: true,
        handler(){
          //数据变化就调用， 更改数据
          this.handlerSearchParams()
          //然后获取请求
          this.getGoodsListInfo()
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