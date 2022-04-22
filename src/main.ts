import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';

// eslint-disable-next-line import/order,import/no-unresolved
import {
  BootstrapVue, BootstrapVueIcons, IconsPlugin, BIcon,
} from 'bootstrap-vue';

// eslint-disable-next-line import/no-extraneous-dependencies
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.component('b-icon', BIcon);
Vue.use(IconsPlugin);
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
