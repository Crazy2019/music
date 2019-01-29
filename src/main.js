import Vue from 'vue'
import App from './App'
import router from './router'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import store from './vuex/store'
import axios from 'axios'
import './assets/css/style.css'
import VeeValidate, { Validator } from 'vee-validate'  /*, {Validator} */
import zh_CN from 'vee-validate/dist/locale/zh_CN'  // 引入中文
import 'babel-polyfill'
Validator.addLocale(zh_CN);




Vue.use(Mint)

Vue.use(VeeValidate,{locale: 'zh_CN'});

Vue.config.productionTip = false

Vue.prototype.$ajax = axios


new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
