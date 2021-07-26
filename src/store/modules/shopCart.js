
import { reqAddOrUpdateShopCart } from "@/api"
const state = {

}

const mutations = {

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
  }
}

const getters = {}

export default {
  state,
  mutations,
  actions,
  getters,
}