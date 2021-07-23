import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import TypeNav from '@/conponents/TypeNav'
import store from '@/store'
import '@/mock/mockServer'
import 'swiper/css/swiper.min.css'
import MySwiper from '@/conponents/MySwiper'

// import "@/api"
//测试接口请求函数
// import {reqCategoryList} from '@/api'
// reqCategoryList()

//TypeNav 被多个组件使用, 如果在每一个要用的里面注册使用,冗余
//全局注册
Vue.component('TypeNav', TypeNav)
Vue.component('MySwiper', MySwiper)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router, //挂载在vue原型上， 这样所有的组件都可以通过$router获取路由器对象， $route获取当前路由信息的对象
  store,  //   
}).$mount('#app')
