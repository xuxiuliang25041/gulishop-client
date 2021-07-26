
import Login from '@/pages/Login'
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'

export default [{
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