import Vue from 'nativescript-vue'
import Vuex from 'vuex/dist/vuex.min.js'
Vue.use(Vuex)

/**
 * -----------------------------------------------------------------------------------------------------------
 * Loading vuex modules
 * -----------------------------------------------------------------------------------------------------------
 */
import account from 'components/account/store/index.js'
/**
 * -----------------------------------------------------------------------------------------------------------
 * Vuex base configurations
 * -----------------------------------------------------------------------------------------------------------
 */
const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  strict: false,
  state: {

  },
  actions: {

  },
  mutations: {

  },
  getters: {

  },
  modules: {
    account
  },
  strict: debug
})

Vue.prototype.$store = store

export default store
