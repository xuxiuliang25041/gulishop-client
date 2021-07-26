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

// 请求购物车 的函数
// /api/cart/addToCart/{ skuId }/{ skuNum }

export const reqAddOrUpdateShopCart = (skuId, skuNum) => {
  return Axios({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: 'post'
  })
}
