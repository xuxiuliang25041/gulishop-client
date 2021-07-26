

import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from '@/router/routes' 
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





//向外暴露一个对象
export default new VueRouter({
  //mode: 'history'
  routes,
  scrollBehavior(to, from, savedPosition) {
    return {
      x: 0,
      y: 0
    }
  }
})
