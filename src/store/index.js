
import Vue from 'vue'
import VueX from 'vuex'

//引入子模块
import home from './modules/home'
import user from './modules/user'
import search from './modules/search'
import detail from './modules/detail'
import shopcart from './modules/shopcart' 

Vue.use(VueX)

//五个核心模块  总store  现在是总的state  里面包含子模块对象 小的传给总的

const state = {}

const mutations = {}

const actions = {}

const getters = {}

export default new VueX.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
    home,
    user,
    search,
    detail,
    shopcart,
  }
})
