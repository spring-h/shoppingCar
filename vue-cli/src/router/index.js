/*
 * @author: Spring
 * @create: 2021-05-31 14:44 PM
 * @license: MIT
 * @lastAuthor: Spring
 * @lastEditTime: 2021-05-31 18:24 PM
 * @desc:
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import Commodity from '../views/Commodity.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'commodity',
    component: Commodity,
  },
  {
    path: '/car',
    name: 'car',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Car.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
