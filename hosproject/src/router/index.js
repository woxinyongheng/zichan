import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Login from '@/components/login/login'
//zichan
import assetman from '@/router/assetman'
//xitong
import system from '@/router/system'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/login',
      name:'Login',
      component:Login
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    }
  ]
    .concat(assetman)
    .concat(system)
})
