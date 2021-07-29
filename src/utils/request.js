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
  timeout : 20000
})

//请求拦截器
servise.interceptors.request.use(
  (config) => {
  //config 相当于报文， 拦截后可以修改
    NProgress.start();
    // 从user里面获取唯一标识 属性，  获取到了， 就给请求头里面设置
    let userTempId = store.state.user.userTempId
    if (userTempId) {
      config.headers.userTempId = userTempId
    }

    //吧token挂载在请求头上   token 就是我们的正式标识
    config.headers.token = store.state.user.token

  return config;
  //最后要返回
})

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