import { createStore } from 'vuex';

// 前台模組
import frontProducts from './front/products';
import frontCart from './front/cart';
import localStorage from './front/localStorage';
// 後台模組
import adminProductlists from './back/products';

export default createStore({
  state: {
    isLoading: false,
    swal: {
      active: false,
      message: '',
      icon: 'success',
    },
    swalConfirm: {
      active: false,
      message: '',
    },
  },
  actions: {
    callSwal({ commit }, { msg, icon }) {
      commit('SET_SWAL_MESSAGE', msg);
      commit('SET_SWAL_ICON', icon);
      commit('SET_SWAL_ACTIVE', true);
    },
    callSwalConfrim({ commit }, { msg }) {
      commit('SET_SWAL_CONFIRM_MESSAGE', msg);
      commit('SET_SWAL_CONFIRM_ACTIVE', true);
    },
  },
  mutations: {
    CHANGE_LOADING(state, payload) {
      state.isLoading = payload;
    },
    SET_SWAL_ACTIVE(state, payload) {
      state.swal.active = payload;
    },
    SET_SWAL_MESSAGE(state, payload) {
      state.swal.message = payload;
    },
    SET_SWAL_ICON(state, payload) {
      state.swal.icon = payload;
    },
    SET_SWAL_CONFIRM_ACTIVE(state, payload) {
      state.swalConfirm.active = payload;
    },
    SET_SWAL_CONFIRM_MESSAGE(state, payload) {
      state.swalConfirm.message = payload;
    },
  },
  modules: {
    frontProducts,
    frontCart,
    localStorage,
    adminProductlists,
  },
});
