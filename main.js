import router from './router'
import Vue from 'vue'
import App from './App.vue'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import store from './store'
Vue.use(mavonEditor)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router: router,
  store,
}).$mount('#app')
