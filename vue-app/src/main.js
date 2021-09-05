import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import './axios.js'
import store from './store/store.js';

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
