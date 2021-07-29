
import {getUserTempId} from '@/utils/userabout'
import {reqUserCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogOut} from '@/api'
//把获取到的用户临时标识先在vuex state当中存储一份
//getUserTempId()这个函数是专门用来生成用户的临时标识的
const state = {
  //值作为一个函数调用
  userTempId: getUserTempId(),
  code: '',
  //登录成功会返回一个token 模拟 这是正常情况
  // token: '',
  //自动登录 token 就要去localStorage里面获取
  token: localStorage.getItem('token_key'),
  //用户信息
  userInfo: {}
}

const mutations = {
  RECEIVE_USERCODE(state, code) {
    state.code  = code
  },
  RECEIVE_USERTOKEN(state, token) {
    state.token = token
  },

  RECEIVE_USERINFO(state, userInfo) {
    state.userInfo = userInfo
  },
// 清除token
  RECEIVE_TOKEN(state) {
    state.token = ''
  },
//localStorage里面的userInfo清空
  RECEIVE_INFO(state) {
    state.userInfo = {}
  }
}

const actions = {
  //获取验证码
  async userCode({ commit }, phone) {
    const result = await reqUserCode(phone)
    if (result.code === 200) {
      commit('RECEIVE_USERCODE', result.data)
      //在对返回的是成功或者失败有后续操作的时候，return
      return result.data
    } else {
      return Promise.reject(new Error('err:--'))
    }
  },

  //注册用户  用户需要拿到一个token
  async userRegister({ commit },  userInfo ) {
    const result = await reqUserRegister(userInfo)
    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('err-->'))
    }
  },

  //登录  一般只是返回一个token  使用
  async userLogin({ commit }, userInfo) {
    const result = await reqUserLogin(userInfo)
    if (result.code === 200) {
      commit('RECEIVE_USERTOKEN', result.data.token)
      //吧token设置到localStorage
      localStorage.setItem('token_key', result.data.token)
      return 'ok'
    } else {
      return Promise.reject(new Error('err-->'))
    }
  },
  
  //获取用户信息， 根据token
  async getUserInfo({ commit }) {
    const result = await reqUserInfo()
    if (result.code === 200) {
      commit('RECEIVE_USERINFO', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('err-->'))
    }
  },

  //清除token
  async removeToken({ commit }) {
    localStorage.removeItem('token_key')
    commit('RECEIVE_TOKEN')
  },

  //退出登录
  async logOut({ commit , dispatch}) {
    const result = await reqLogOut()
    if (result.code === 200) {
      //退出登录要清空token，localStorage 里面的都要清  userInfo也要清
      // 可以在一个actions里面dispatch另外一个actions
      commit('RECEIVE_INFO')
      dispatch('removeToken')
      return 'ok'
    } else {
      return  Promise.reject(new Error('err--> '))
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