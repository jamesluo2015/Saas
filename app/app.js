import Vue from 'vue'
import App from './app.vue';
import VueResource from 'vue-resource';
// //http
// Vue.use(VueResource);
// Vue.http.options.root = '/root';
// Vue.http.headers.common['Authorization'] = 'Basic YXBpOnBhc3N3b3Jk';
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


