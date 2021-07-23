
import { reqGoodsListInfo } from "@/api"

const state = {
  goodsListInfo: {}
}

const mutations = {
  SECEIVE_GETGOODSLISTINFO(state, goodsListInfo) {
    state.goodsListInfo = goodsListInfo
  }
}

const actions = {
  //第一个数据必须是context 非要写占位   第二个参数一个就写一个， 传递多个就传对象，必须封装在一个对象里面传递
  async getGoodsListInfo({ commit }, searchParams) {
    const result = await reqGoodsListInfo(searchParams)
    if (result.code === 200) {
      commit('SECEIVE_GETGOODSLISTINFO', result.data)
    }
  }
}

const getters = {
  //可以简化数据操作,计算数据
  attrsList(state) {
    return state.goodsListInfo.attrsList || []  //添加【】 是为了当没有数据的时候请求的不是undefined ，undefined 报错
  },
  goodsList(state) {
    return state.goodsListInfo.goodsList || [] //添加【】 是为了当没有数据的时候请求的不是undefined ，undefined 报错
  },
  trademarkList(state) {
    return state.goodsListInfo.trademarkList || [] //添加【】 是为了当没有数据的时候请求的不是undefined ，undefined 报错
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
}