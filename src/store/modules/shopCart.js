import {reqAddOrUpdateCartInfo} from '@/api'


const state = {}

const mutations = {}

const actions = {
  async addOrShopCart({ commit }, {skuId, skuNum}) {
    const result = await reqAddOrUpdateCartInfo(skuId, skuNum)

    if (result.code === 200) {
      //不需要返回什么参数  告知我成功了就行
      return 'ok'
    } else {
      return Promise.reject(new Error('error:   '))
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