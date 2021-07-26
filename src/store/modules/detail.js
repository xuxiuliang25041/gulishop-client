
import { reqGoodsDetailInfo } from "@/api"
const state = {
  detailInfo: []
}

const mutations = {
  SECEIVE_GETGOODSDETAILINFO(state, detailInfo) {
    state.detailInfo = detailInfo
  }
}

const actions = {
  async getGoodsDetailInfo({ commit }, skuId) {
    const result = await reqGoodsDetailInfo(skuId)
    if (result.code === 200) {
      commit('SECEIVE_GETGOODSDETAILINFO', result.data)
    }
  }
}

const getters = {
  // 简化数据操作
  categoryView(state) {
    return state.detailInfo.categoryView || {}
  },

  skuInfo(state) {
    return state.detailInfo.skuInfo || {}
  },

  spuSaleAttrList(state) {
    return state.detailInfo.spuSaleAttrList || []
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
}