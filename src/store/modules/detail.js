<<<<<<< HEAD

import { reqGoodsDetailInfo } from "@/api"
const state = {
  detailInfo: []
}

const mutations = {
  SECEIVE_GETGOODSDETAILINFO(state, detailInfo) {
=======
import {
  reqGoodsDetailInfo
} from "@/api"

const state = {
  detailInfo: {}
}

const mutations = {
  RECEIVE_DETAILINFO(state, detailInfo) {
>>>>>>> 8ab7c3510385ca309a68e465696f0e022220180d
    state.detailInfo = detailInfo
  }
}

const actions = {
<<<<<<< HEAD
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
=======
  async getDetailInfo({
    commit
  }, skuId) {
    const result = await reqGoodsDetailInfo(skuId)
    if (result.code === 200) {
      commit('RECEIVE_DETAILINFO', result.data)
    }
  }
}
const getters = {
  categoryView(state) {
    return state.detailInfo.categoryView || {}
  },
  skuInfo(state) {
    return state.detailInfo.skuInfo || {}
  },
  spuSaleAttrList(state) {
    return state.detailInfo.spuSaleAttrList || []
  }

>>>>>>> 8ab7c3510385ca309a68e465696f0e022220180d
}

export default {
  state,
  mutations,
  actions,
  getters,
}