
import {
  reqAddOrUpdateCartInfo,
  reqShopCartList,
  reqAddOrUpdateShopCart,
  reqUpdateOneIsCheck,
  reqUpDateAllIsCheck,
  reqDeleteOne,
  reqDeleteAllCart,
} from '@/api'


const state = {
  shopCartList: []
}

const mutations = {
  SECEIVE_SHOPCARTINFO(state, shopCartList) {
    state.shopCartList = shopCartList
  }
}

const actions = {
  async addOrShopCart({ commit }, {skuId, skuNum}) {
    const result = await reqAddOrUpdateCartInfo(skuId, skuNum)

    if (result.code === 200) {
      //不需要返回什么参数  告知我成功了就行
      return 'ok'
    } else {
      return Promise.reject(new Error('error:   '))
    }
  },

  async getShopCartList({commit}) {
    const result = await reqShopCartList()
    if (result.code === 200) {
      commit('SECEIVE_SHOPCARTINFO', result.data)
    }
  },
  //修改购物车数量
  async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
    const result = await reqAddOrUpdateShopCart(skuId, skuNum)
    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('error'))
    }
  },

  //修改单个状态
  async updateOneIsCheck({ commit }, { skuId, isChecked }) {
    const result = await reqUpdateOneIsCheck(skuId, isChecked)
    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('error:  '))
    }
  },

  //修改多个状态
  async updateAllIsCheck({ commit }, { isChecked, skuIdList }) {
    const result = await reqUpDateAllIsCheck(isChecked, skuIdList)
    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('err:  '))
    }
  },

  //删除单个
  async deleteOneCart({ commit }, skuId) {
    const result = await reqDeleteOne(skuId)
    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('err::--'))
    }
  },

  //删除多个
  async deleteAllCart({ commit }, skuIdList) {
    const result = await reqDeleteAllCart(skuIdList)
    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('error:-->'))
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