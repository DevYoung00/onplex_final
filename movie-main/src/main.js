import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import store from './store';
import router from './router';
import vuetify from './plugins/vuetify';
import axios from 'axios';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import VueCookies from 'vue-cookies';
import vueMoment from 'vue-moment';

Vue.use(BootstrapVue);
Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.use(VueCookies);

// Vue.use(xhr)

new Vue({
  store,
  router,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
Vue.use(vueMoment);

export const eventBus = new Vue({
  methods: {
    numSelect(value) {
      this.$emit('numSelect', value);
    },
  },
});
