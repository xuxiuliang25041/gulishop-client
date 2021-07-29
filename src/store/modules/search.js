
import { reqGoodsListInfo } from "@/api"

const state = {
  goodsListInfo: {}
}

const mutations = {
  RECEIVE_GOODSLISTINFO(state, goodsListInfo) {
    state.goodsListInfo = goodsListInfo
  }
}

const actions = {
  // 第一个参数一定要是context， 必须占位， 如果vue中有参数要传递过来，只能是一个，多个要合并成对象传递
  async getGoodsListInfo({ commit }, searchParams) {
    //vue传递过来的数据，用户
     const result = await reqGoodsListInfo(searchParams)
    if (result.code === 200) {
      commit('RECEIVE_GOODSLISTINFO', result.data)
    }
  }

}

const getters = {
  //简化数据操作。
  goodsList(state) {
    //一开始传一个空数组是为了防止返回一个undefined  
    return state.goodsListInfo.goodsList || []
  },
  attrsList(state) {
    return state.goodsListInfo.attrsList || []
  },
  trademarkList(state) {
    return state.goodsListInfo.trademarkList || []
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
}