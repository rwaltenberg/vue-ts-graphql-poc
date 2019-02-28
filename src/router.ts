import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // {
    //   path: '/about',
    //   name: 'about',
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    // },
    {
      path: '/:id?',
      name: 'entries',
      component: Home,
    },
    {
      path: '*',
      redirect: { name: 'entries' },
    },
  ],
});
