

import Vue from 'vue'
import VueRouter from 'vue-router'
<<<<<<< HEAD
import routes from '@/router/routes'
import store from '@/store'
=======
import routes from './routes'
>>>>>>> 8ab7c3510385ca309a68e465696f0e022220180d
//声明
Vue.use(VueRouter)

//编程式路由多次点击报错   声明式路由跳转内部已经处理了
//解决办法: 1  降低版本 3.1.0之前  因为这个开始引入了promise的语法
  //2. 每一个编程式跳转时指定一个catch回调处理错误

//  3. 修改vue原型上的 push和replace方法
//保存一下原来的push
const originPush = VueRouter.prototype.push
//吧原来的push修改成另一个方法    本质上还是用的它原来的push方法
VueRouter.prototype.push = function (location, resolved, rejected) {
  //判断传没传参数
  if (resolved === undefined && rejected === undefined) {
    //改变他的this指向还是到vue
    return originPush.call(this, location).catch(() => { })
  } else {
    //有参数直接原路返回
    return originPush.call(this, location, resolved, rejected)
  }
}

const originReplace = VueRouter.prototype.replace
//吧原来的replace修改成另一个方法    本质上还是用的它原来的push方法
VueRouter.prototype.replace = function (location, resolved, rejected) {
  //判断传没传参数
  if (resolved === undefined && rejected === undefined) {
    //改变他的this指向还是到vue
    return originReplace.call(this, location).catch(() => {})
  } else {
    //有参数直接原路返回
    return originReplace.call(this, location, resolved, rejected)
  }
}

const router = new VueRouter({
  //mode: 'history'
  routes,
  scrollBehavior(to, from, savedPosition) {
    return {
      x: 0,
      y: 0
    }
  }
})

// 全局前置路由守卫   token校验 根据token获取用户信息， 权限控制
//路由守卫  就是当你跳转的时候，这个守卫可以去拦住， 然后判断是否有条件可以跳转过去
router.beforeEach(async(to, from, next) => {
  /* 
    to 代表目的地 的路由对象
    from 代表起始位置的路由对象
    next  代表的是一个函数，  控制是放行还是处理
    next() 不传参就是无条件放行
    next(false)  传false代表不放行， 原地待命
    next('/')  如果传递的是一个路径或者路由对象， 就是跳转到指定位置
  */
  //token 校验的逻辑      
  //一会用户的信息是要在这进行发请求获取的  api 和store

<<<<<<< HEAD
  //获取一下token  和 userInfo 用户信息 
  let token = store.state.user.token
  let userInfo = store.state.user.userInfo
  // 路由跳转时， 先判断有没有token
  if (token) {
    //如果有token 判断是不是重复点的登录
    if (to.path === '/login') {
      //重复点就让他回首页
      next('/')
    } else {
      //点的是别的  代表去的不是登录页  判断有没有name 用户名， 就是用户信息  
      if (userInfo.name) {
        //如果有  直接放行  有条件可以跳转撒
        next()
      } else {
        //如果没有 需要根据token 重新获取用户信息
        try {
          await store.dispatch('getUserInfo')
          next()
        } catch (error) {
          // 代表获取用户信息失败， 一概归为token过期
          //就让它回到 登录页重新登录
          //获取用户信息失败就清空token
          store.dispatch('removeToken')
          next('/login')
        }
      }

    }
  } else {
    //如果没有token   先放行，  因为用户还是要可以浏览商品 或者添加购物车的，  后面写了支付在做限制
    next()
  }
  
=======


//向外暴露一个对象
export default new VueRouter({
  routes,
  // 点击跳转默认坐标回调左上角（类似）  就是页面要始终回到最上面
  scrollBehavior(to, from, savedPosition) {
    return {
      x: 0,
      y: 0
    }
  }
>>>>>>> 8ab7c3510385ca309a68e465696f0e022220180d
})

//向外暴露一个对象
export default router