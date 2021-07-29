/* 

对aioxs二次封装

*/

import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'

//不要修改原本的axios  创建axios的实例

const servise = axios.create({
  baseURL: '/api/',
  timeout: 20000
})

//请求拦截器
servise.interceptors.request.use(
  (config) => {
<<<<<<< HEAD
    //config 相当于报文， 拦截后可以修改
    NProgress.start();
    // 从user里面获取唯一标识 属性，  获取到了， 就给请求头里面设置
    let userTempId = store.state.user.userTempId
    if (userTempId) {
      config.headers.userTempId = userTempId
    }
    //请求的时候要携带 正式的标识,  不然跳转不了, 显示未登陆
    let token = store.state.user.token
    if (token) {
      config.headers.token = token
    }
    
    return config;
    //最后要返回
  })
=======
  //config 相当于报文， 拦截后可以修改
    NProgress.start();
    
    // 给每个请求的headers都添加上
    config.headers.userTempId = store.state.user.userTempId

  return config;
  //最后要返回
})
>>>>>>> 8ab7c3510385ca309a68e465696f0e022220180d

//
servise.interceptors.response.use(
  (response) => {
    NProgress.done();
    return response.data
  },
  //失败后的回调
  (error) => {
    NProgress.done();
    alert('axios请求失败' + error.message)
    //如果后面要继续处理， 就返回一个失败的promise传下去
    return Promise.reject(new Error('err;  ', error.message))
    //如果不需要 就返回 一个pending状态 的promise对象
    // return new Promise(() => { })

  }
)

export default servise