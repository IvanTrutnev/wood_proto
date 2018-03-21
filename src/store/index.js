import Vue from 'vue'
import Vuex from 'vuex'
import menu from './modules/menu'
import orders from './modules/orders'
import { state } from './state'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'
import plugins from './plugins'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  plugins,
	modules: {
		menu,
		orders
	},
	strict: process.env.NODE_ENV !== 'production'
});

export const renderFunctions = {
  formatNumber: (value, accuracy) => {
    if(typeof value === 'number') {
      let maximumAccuracy = accuracy || 3;
      return value.toLocaleString('ru-RU',{ maximumFractionDigits: maximumAccuracy });
    }
  }
};
