import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue3-loading-overlay';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';
import 'bootstrap';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import swal from './components/swal.vue';
import commonMethods from './mixins/commonMethods';
import App from './App.vue';
import router from './router';
import store from './store';

const app = createApp(App);
// 載入全域 mixin
app.mixin({
  mixins: [swal, commonMethods],
});

app.use(store);
app.use(router);
app.use(VueSweetalert2);
app.use(VueAxios, axios);
app.component('Loading', Loading);
app.mount('#app');
