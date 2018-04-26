import Vue from 'nativescript-vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter)

import Home from 'components/Home'
import Login from 'components/account/Login'

const router = new VueRouter({
  pageRouting: true,
  routes: [
    {
      path: '/home',
      component: Home,
      name: 'home',
      meta: {
        title: 'Home'
      }
    },
    {
      path: '/login',
      component: Login,
      name: 'login',
      meta: {
        title: 'login'
      }
    },
    {path: '*', redirect: '/home'}
  ],
});

router.replace('/home');

module.exports = router;
