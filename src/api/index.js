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