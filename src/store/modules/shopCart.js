
import {
  reqAddOrUpdateShopCart,
  reqCartListInfo,
  reqCheckOneCart,
  reqCheckAllCart,
  reqDeleteCart,
  reqDeleteAllCart,
} from "@/api"
const state = {
  shopCartList: []
}

const mutations = {
  SECEIVE_SHOPCARTLIST(state, shopCartList) {
    state.shopCartList = shopCartList
  }
}

// async函数称作异步函数，这个函数里面一般都是异步操作
// async函数的返回值不看return，返回的一定是promise
// 返回的promise是成功还是失败要看return
// return的结果决定这个返回的promise的结果
// 1、非promise数据
// return返回的数据是非promise，那么async函数返回的promise对象一定是成功的
// 成功的结果就是return的结果
// return 返回的数据是非promise,但是在中间抛出异常，那么async函数返回的promise对象是失败的
// 失败的原因是抛出的错误原因
// 2、promise数据
// return 返回的数据是promise, 那么async函数返回的promise要看return的promise成功和失败
// 如果return的promise是成功的，那么async函数返回的promise也是成功的，成功的结果就是return后面promise成功的结果
// 如果return的promise是失败的，那么asyncc函数返回的promise也是失败的，失败的原因就是return后面promise失败的原因

// 添加到购物车
const actions = {
  async getAddOrUpdateShopCart({
    commit
  }, {
    skuId,
    skuNum
    }) {
    const result = await reqAddOrUpdateShopCart(skuId, skuNum);
    if (result.code === 200) {
      //不需要返回什么东西， 所以通知 ， 我成功了
      return 'ok'
    } else {
      return Promise.reject(new Error('error '))
    }
  },

  //请求购物车列表数据
  async getCartListInfo({ commit }) {
    const result = await reqCartListInfo()
    if (result.code === 200) {
      commit('SECEIVE_SHOPCARTLIST', result.data)
    }
  },

  //点击单个 改变状态
  async changeOneCheck({ commit }, {skuId,isChecked}) {
    const result = await reqCheckOneCart(skuId, isChecked)
    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('err:'))
    }
  },
  
  //点击改变多个状态
  async changeAllCart({ commit }, { isChecked, skuIdList }) {
    const result = await reqCheckAllCart(isChecked, skuIdList)
    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('err: '))
    }
  },

  //删除单个
  async deleteOneCart({ commit }, skuId) {
    const result = await reqDeleteCart(skuId)
    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('err:::'))
    }
  },

  //删除多个
  async deleteAllCart({ commit },skuIdList) {
    const result = await reqDeleteAllCart(skuIdList)
    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('error: '))
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