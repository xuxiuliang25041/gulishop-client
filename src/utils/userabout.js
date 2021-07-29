
<<<<<<< HEAD
//获取 uuid 码
import {
  v4 as uuidv4
} from 'uuid';

//暴露一个函数， 在user子模块stroe里面state设置  先存储一份， 方便调用
export function getUserTempId(){
  /* 
    生成临时用户标识
    1.唯一    2 一个用户的唯一标识不会轻易改变
    首先判断用户的locastorage 有没有这个标识，。 有就直接用， 没有就 创建一个新的，添加到locaStorage
  */
  // 先判断localStorage里面有没有  没有就创建 
  let userTempId = localStorage.getItem('userTempId_key')
  if (!userTempId) {
    //没有就创建
    userTempId = uuidv4()
    //添加
    localStorage.setItem('userTempId_key', userTempId)
  }

  //有 直接用
  return userTempId
  
}
=======
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
>>>>>>> 8ab7c3510385ca309a68e465696f0e022220180d
