
// 保存到vuex的state里面 好调用 

import { getTempid } from "@/utils/userabout"
//值是一个函数
const state = {
  userTempId: getTempid()
}

const mutations = {}

const actions = {}

const getters = {}

export default {
  state,
  mutations,
  actions,
  getters,
}