import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import OrderList from './components/OrderList';
import InvoiceList from './components/InvoiceList';
import OrderProductList from './components/OrderProductList';
import LoginComponent from './components/LoginComponent';
import E404 from './components/E404';

import {store} from './store';

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginComponent,
  },
  {
  	path: '',
  	redirect: {name: 'orders'},
    beforeEnter: guardRoute
  },
  {
    name: 'orders',
		path: '/orders',
		component: OrderList,
    beforeEnter: guardRoute
	},
  {
    name: 'invoices',
		path: '/invoices',
		component: InvoiceList,
    beforeEnter: guardRoute
	},
  {
    name: 'orderProducts',
		path: '/orderProducts',
		component: OrderProductList,
    beforeEnter: guardRoute
	},
  {
		path: '*',
		component: E404
	}
];

function guardRoute (to, from, next) {
  // work-around to get to the Vuex store (as of Vue 2.0)
  const auth = router.app.$options.store.state.auth;

  if (!auth.isLoggedIn) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
}

export const router = new VueRouter({
	routes,
	mode: 'history'
});
