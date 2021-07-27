
import Login from '@/pages/Login'
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'

export default [
  {
    path: '/shopCart',
    component: ShopCart
  },
  
  {
    path: '/home',
    component: Home
  },
  {
    path: '/login',
    component: Login,
    meta: {
      isHidden: true
    }
  },

  {
    path: '/search/:keyword?',
    component: Search,
    name: 'search'
  },
  {
    path: '/register',
    component: Register,
    meta: {
      isHidden: true
    }
  },
  {
    // 点击你得让我知道你点的是哪一个，占位，id
    path: '/detail/:skuId',
    component: Detail
  },

  {
    path: '/addcartsuccess',
    component: AddCartSuccess
  },

  //重定向
  {
    path: '/',
    redirect: '/home'
  }
]