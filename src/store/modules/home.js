
import {
  reqCategoryList,
  reqBannerList,
  reqFloorList
} from "@/api"


const state = {
  categoryList: [],
  bannerList: [],
  floorList: []
}

const mutations = {
  SEVEICE_CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList
  },

  SEVEICE_BANNERLIST(state, bannerList) {
    state.bannerList = bannerList
  },

  SEVEICE_FLOORLIST(state, floorList) {
    state.floorList = floorList
  }
}

const actions = {
  async getCategoryList({ commit }) {
    const result = await reqCategoryList()

    if (result.code === 200) {
      commit('SEVEICE_CATEGORYLIST',  result.data)
    }
  },

  async getBannerList({ commit }) {
    const result = await reqBannerList()

    if (result.code === 200) {
      commit('SEVEICE_BANNERLIST',result.data)
    }
  },

  async getFloorList({ commit }) {
    const result = await reqFloorList()

    if (result.code === 200) {
      commit('SEVEICE_FLOORLIST',  result.data)
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