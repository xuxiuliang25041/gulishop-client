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

//搜索search 数据 /list   post   请求体参数   用户传的参数
export const reqGoodsListInfo = (searchParams) => {
  return Axios({
    url: '/list',
    method: 'post',
    data: searchParams
  })
}
//如果要发送请求参数必须携带， 至少得是一个空的对象
// reqGoodsListInfo({})

// 请求商品详情页  /api/item/{ skuId }  get
export const reqGoodsDetailInfo = (skuId) => {
  return Axios({
    url: `/item/${skuId} `,
    method: 'get'
  })
}

//加入购物车的请求函数
// /api/cart/addToCart/{ skuId }/{ skuNum }  post
export const reqAddOrUpdateCartInfo = (skuId, skuNum) => {
  return Axios({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: 'post'
  })
}

  //购物车列表   /api/cart/cartList   get  无参数
export const reqShopCartList = () => {
  return Axios({
    url: '/cart/cartList ',
    method: 'get'
  })
}
// reqShopCartList()

// 添加购物车的请求  商品数量改动， 增加或者减少 /api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddOrUpdateShopCart = (skuId, skuNum) => {
  return Axios({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: 'post',

  })
}

//点击修改单个状态  /api/cart/checkCart/{skuId}/{isChecked}   get
export const reqUpdateOneIsCheck = (skuId, isChecked) => {
  return Axios({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: 'get'
  })
}

//  点击修改多个状态   post /api/cart/batchCheckCart/{isChecked}  skuIdList  数组  代表修改的商品id列表     请求体参数
export const reqUpDateAllIsCheck = (isChecked, skuIdList) => {
  return Axios({
    url: `/cart/batchCheckCart/${isChecked}`,
    method: 'post',
    data: skuIdList
  })
}

//点击删除单个的请求   /api/cart/deleteCart/{skuId}   delete
export const reqDeleteOne = (skuId) => {
  return Axios({
    url: `/cart/deleteCart/${skuId}`,
    method: 'delete',
  })   
}

// 删除全部选中的请求  o	DELETE /api/cart/batchDeleteCart   参数： skuIdList 数组 代表修改的商品id列表 请求体参数
export const reqDeleteAllCart = () => {
  return Axios({
    url: `/cart/batchDeleteCart`,
    method: 'detele',
    data: skuIdList
  })
}




