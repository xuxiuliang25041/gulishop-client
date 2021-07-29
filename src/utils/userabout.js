// 首先引入一下插件 uuid 
import { v4 as uuidv4 } from 'uuid';

// 向外暴露一个函数 在state里面调用这这个函数就能直接获取到uuid码作为临时标识
export function getUserTempId() {
  //生成临时用户标识的，  两个特点， 唯一性， 和 不会轻易被改变
  // 首先判断localStorage里面有没有用户的身份标识，那个是正式标识，，如果有直接返回 
  // 没有就创建
  //获取一下
  let userTempId = localStorage.getItem('userTempId_key')
  if (!userTempId) {
    //没找到就创建
    userTempId = uuidv4()
    //添加到localStorage里面
    localStorage.setItem('userTempId_key', userTempId)
  }

  //找到的就直接返回 不用创建临时标识
  return userTempId
}

