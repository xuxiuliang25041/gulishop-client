<<<<<<< HEAD
=======

// 保存到vuex的state里面 好调用 

import { getTempid } from "@/utils/userabout"
//值是一个函数
const state = {
  userTempId: getTempid()
}
>>>>>>> 8ab7c3510385ca309a68e465696f0e022220180d

import { getUserTempId } from "@/utils/userabout"
import {reqUserCode, reqUserRegister, reqUserLogin, reqUserToken, reqLogOut} from '@/api'
import store from ".."
//把获取到的用户临时标识先在vuex state当中存储一份
//getUserTempId()这个函数是专门用来生成用户的临时标识的
const state = {
  userTempId: getUserTempId(),
  code: '',
  //登录 用户登录就是要获取到token 这只针对登录
  // token: '',
  //自动登录  就要先从localStorage里面去获取token
  token: localStorage.getItem('token_key'),
  userInfo: {},
}

const mutations = {
  RECEIVE_USERCODE(state, code) {
    state.code = code
  },

  RECEIVE_USERTOKEN(state, token) {
    state.token = token
  },

  RECEIVE_USERINFO(state, userInfo) {
    state.userInfo = userInfo
  },

  //清空state里面的token
  RECEIVE_REMOVETOKEN(state) {
    state.token = ''
  },
  //退出登录要删除用户信息
  RECEIVE_LOGOUT(state) {
    state.userInfo = {}
  }
}

const actions = {
  //获取验证码
  async getUserCode({ commit }, phone) {
    const result = await reqUserCode(phone)
    if (result.code === 200) {
      commit('RECEIVE_USERCODE', result.data)
      //我需要这个验证码 所以返回这个验证码
      return result.data
    } else {
      return Promise.reject(new Error('error:-->'))
    }
  },

  //注册用户de 
  async userRegister({ commit }, userInfo) {
    const result = await reqUserRegister(userInfo)
    if (result.code === 200) {
      // 什么时候用return  当组件需要根据这次的成功或者失败进行后续操作的时候， 要用return
      return 'ok'
    } else {
      return Promise.reject(new Error('err:..>'))
    }
  },

  //登录
  async userLogin({ commit }, userInfo) {
    const result = await reqUserLogin(userInfo)
    if (result.code === 200) {
      //针对用户第一次登录
      commit('RECEIVE_USERTOKEN', result.data.token)
      //自动登录需要保存token到localStorage
      localStorage.setItem('token_key', result.data.token)
      return 'ok'
    } else {
      return Promise.reject(new Error('err:--->'))
    }
  },

  //根据token 去获取 用户信息
  async getUserInfo({ commit }) {
    const result = await reqUserToken()
    if (result.code === 200) {
      //result。data里面包含了用户信息  
      commit('RECEIVE_USERINFO', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('err'))
    }
  },

  //清空token信息
  async removeToken({ commit }) {
    // 清除localStorage里面的token
    localStorage.removeItem('token_key')
    //清除state里面的token
    commit('RECEIVE_REMOVETOKEN')
  },

  //退出登录
  async logOut({ commit, dispatch }) {
    const result = await reqLogOut()
    if (result.code === 200) {
      //清除用户信息
      commit('RECEIVE_LOGOUT')
      // 清除token   一个actions里面可以调用另一个actions
      dispatch('removeToken')
      return 'ok'
    } else {
      return Promise.reject(new Error('err'))
    }
  }
  
}

const getters = {}

export default {
  state,
  mutations,
  actions,
  getters,
}