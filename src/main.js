import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue3-loading-overlay';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';
import 'bootstrap';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import {
  Field, Form, ErrorMessage, defineRule, configure,
} from 'vee-validate';
import { required, email, min } from '@vee-validate/rules';
import { localize } from '@vee-validate/i18n';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';

// import Swiper core and required modules
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper';
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// swiper bundle styles
import 'swiper/swiper-bundle.min.css';
// modules styles
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';

import swal from './components/swal.vue';
import commonMethods from './mixins/commonMethods';
import App from './App.vue';
import router from './router';
import store from './store';

SwiperCore.use([Navigation, Pagination, Autoplay]);

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
app.component('Swiper', Swiper);
app.component('SwiperSlide', SwiperSlide);

// vee-validation
app.component('Form', Form);
app.component('Field', Field);
app.component('ErrorMessage', ErrorMessage);
defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
configure({
  generateMessage: localize('zh_TW', zhTW),
});

app.mount('#app');
