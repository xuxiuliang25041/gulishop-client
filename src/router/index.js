

import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from '@/router/routes' 
import store from '@/store'
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

router.beforeEach(async(to, from, next) => {
  // 一般用的都是全局前置导航守卫
  /* 
    to  代表的是目的地
    from  代表的是起始位置
    next   根据传的参数 代表是否放行和处理
    next() 无条件放行
    next(false) 不放行
    next('/')   填的路径或者路由， 指定跳转到哪
  */
  //先写请求用户信息的api  store   所有请求头都要携带 
  //获取token
  let userInfo = store.state.user.userInfo
  let token = store.state.user.token
  //首先判断有没有token
  if (token) {
    //如果有 判断是不是重复点的登录
    if (to.path === '/login') {
      //是的话， 就让它跳到首页
      next('/')
    } else {
      // 正经跳转 不是去的登录页 是其他页 判断你有没有用户信息
      if (userInfo.name) {
        //有放行
        next()
      } else {
        try {
          // 没有就根据token重新获取
          await store.dispatch('getUserInfo')
          //获取成功放行
          next()
        } catch (error) {
          //失败  一律归结为token过期
          //获取用户信息失败，清空token， localStorage也要清除
          store.dispatch('removeToken')
          next('/login')
        }
      }
    }
  } else {
    //暂时都放行 写支付的时候在添加限制
    next()
  }
})


//向外暴露一个对象
export default router
