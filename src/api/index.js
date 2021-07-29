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
<<<<<<< HEAD
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

//获取验证码 的请求 /api/user/passport/sendCode/{phone}  get
export const reqUserCode = (phone) => {
  return Axios({
    url: `/user/passport/sendCode/${phone}`,
    method: 'get'
  })
}


// 注册用户 请求 ，  /api/user/passport/register   post  phone/password/code 三个参数，请求体参数
//  传的是一个对象
export const reqUserRegister = (userInfo) => {
  return Axios({
    url: '/user/passport/register',
    method: 'post',
    data: userInfo
  })
}

// 登录的请求函数 /api/user/passport/login  post  请求体参数， phone password
export const reqUserLogin = (userInfo) => {
  return Axios({
    url: '/user/passport/login',
    method: 'post',
    data: userInfo
  })
}

// 根据token 获取用户信息
// /api/user/passport/auth/getUserInfo  get
export const reqUserToken = () => {
  return Axios({
    url: '/user/passport/auth/getUserInfo',
    method: 'get'
  })
}

// 退出登录  /api/user/passport/logout  get
export const reqLogOut = () => {
  return Axios({
  url: '/user/passport/logout',
  method: 'get'
  })
}

=======

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
>>>>>>> 8ab7c3510385ca309a68e465696f0e022220180d
