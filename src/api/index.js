/* 
所有的接口请求函数都写在这里

*/
import Axios from '@/utils/request'
import mockAxios from '@/utils/mockRequest'

//请求三级分类的列表数据    getBaseCategoryList
export const reqCategoryList = () => {
  return Axios({
    url: '/product/getBaseCategoryList',
    methods: 'get'
  })
}

// reqCategoryList()

//请求banner数据  大轮播图
export const reqBannerList = () => {
  return mockAxios({
    url: '/banner',
    method: 'get'
  })
}

//请求floor数据 楼层    
export const reqFloorList = () => {
  return mockAxios({
    url: '/floor',
    method: 'get'
  })
}

//请求search 搜索页面数据， 请求体参数   post

export const reqGoodsListInfo = (searchParams) => {
  return Axios({
      url: '/list',
      method: 'post',
      data: searchParams
   })
}

//测试，  一开始传一个空对象， 不能不传
// reqGoodsListInfo({})


///api/item/{ skuId }
//请求商品详情
export const reqGoodsDetailInfo = (skuId) => {
  return Axios({
    url: `/item/${skuId}`,
    method: 'get'
  })
}

// 添加购物车  请求的函数
// /api/cart/addToCart/{ skuId }/{ skuNum }

export const reqAddOrUpdateShopCart = (skuId, skuNum) => {
  return Axios({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: 'post'
  })
}

//请求购物车列表  /api/cart/cartList  get
export const reqCartListInfo = () => {
  return Axios({
    url: '/cart/cartList',
    method: 'get'
  })
 }

// reqCartListInfo()

//切换商品选中状态 单个
// /api/cart/checkCart/{skuID}/{isChecked}    get
export const reqCheckOneCart = (skuId, isChecked) => {
  return Axios({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: 'get'
  })
}

//选中多个，改变多个状态	post  /api/cart/batchCheckCart/{isChecked}
// skuIdList 数组 代表修改的商品id列表 请求体参数
// isChecked 要修改的状态 1 代表选中 0 代表未选中
export const reqCheckAllCart = (isChecked, skuIdList) => {
  return Axios({
    url: `/cart/batchCheckCart/${isChecked}`,
    method: 'post',
    data: skuIdList
  })
}

// /api/cart/deleteCart/{skuId}  删除单个 delete
export const reqDeleteCart = (skuId) => {
  return Axios({
    url: `/cart/deleteCart/${skuId} `,
    method: 'DELETE',
  })
}

// 删除多个 DELETE / api / cart / batchDeleteCart   请求体参数skuIdList

export const reqDeleteAllCart = (skuIdList) => {
  return Axios({
    url: `/cart/batchDeleteCart`,
    method: 'DELETE',
    data: skuIdList
  })
}