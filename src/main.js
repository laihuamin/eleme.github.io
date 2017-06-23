import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';
import goods from './components/goods/goods.vue';
import seller from './components/seller/seller.vue';
import ratings from './components/ratings/ratings.vue';

import 'common/stylus/index.styl';
// /* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   components: { App }
// });
Vue.use(VueRouter);
Vue.use(VueResource);
const routes = [
  {path: '/goods', component: goods},
  {path: '/seller', component: seller},
  {path: '/ratings', component: ratings}
];

// const routes = [
//   {path: '/', redirect: '/goods'},
//   {path: '/', redirect: '/seller'},
//   {path: '/', redirect: '/ratings'}
// ];
 const router = new VueRouter({
    routes,
   linkActiveClass: 'active'
 });
 const app = new Vue({
   router,
   components: {App}
 }).$mount('#app');
