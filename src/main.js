import Vue from 'vue'

import router from './router'
import store from './store'
import App from './App.vue'

import 'common/scss/index.scss';
Vue.config.productionTip = false;


new Vue({
  el: "body",
  router,
  store,
  render: h => h(App)
}).$mount('#app')
