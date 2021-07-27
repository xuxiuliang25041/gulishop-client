
//获取uuid码
import { v4 as uuidv4 } from 'uuid';


// 向外暴露 一个函数
export function getTempid() {
  //生成临时唯一标识 ，  先得判断他原来有没有， 没有才创建  有直接用
  //
  let userTempId = localStorage.getItem('userTempId_key')
  // 如果，没有， 创建
  if (!userTempId) {
    userTempId = uuidv4()

    //添加到localStorage
    localStorage.setItem('userTempId_key', userTempId)
  }

  //有 就返回
  return userTempId
}
