
import { getUserTempId } from "@/utils/userabout"
//把获取到的用户临时标识先在vuex state当中存储一份
//getUserTempId()这个函数是专门用来生成用户的临时标识的
const state = {
  userTempId: getUserTempId()
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