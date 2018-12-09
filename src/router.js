import Vue from 'vue';
import Router from 'vue-router';
import goods from '@/goods/goods';
import seller from '@/seller/seller';
import ratings from '@/ratings/ratings';
Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    { path: '/',redirect:'/goods',   component: goods },
    { path: '/goods', component: goods },
    { path: '/seller', component: seller  },
    { path: '/ratings', component: ratings },
  ]
})
