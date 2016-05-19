//list.js
import Vue from 'vue'
import App from '../../components/product/list.vue';//页面模版
import VueResource from 'vue-resource';//http请求


Vue.config.debug = true

new Vue({
  el: 'body',
  components: { App,VueResource },
  http: {
      root: '/root',
      headers: {
        Authorization: 'Basic YXBpOnBhc3N3b3Jk'
      }
    }
})
