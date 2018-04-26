import Vue from 'nativescript-vue';
import router from './router';
import store from './store';
import './styles.scss';
import globalMixin from './mixins/index'

Vue.prototype.$eventBus = new Vue()
Vue.mixin(globalMixin)
// Uncommment the following to see NativeScript-Vue output logs
Vue.config.silent = true;

new Vue({
  router,
  store
}).$start();
