import axios from 'axios';

export default {
  namespaced: true,
  state: {
    cartList: [],
    total: 0,
    final_total: 0,
    closeModal: false,
  },
  actions: {
    getCartList({ commit, dispatch }) {
      commit('CHANGE_LOADING', true, { root: true });
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      axios.get(api)
        .then((res) => {
          if (res.data.success) {
            commit('SET_CARTLIST', res.data.data.carts);
            commit('SET_TOTAL', res.data.data.total);
            commit('SET_FINAL_TOTAL', res.data.data.final_total);
          } else {
            dispatch('callSwal', { msg: res.data.message, icon: 'error' }, { root: true });
          }
        })
        .catch((err) => {
          dispatch('callSwal', { msg: err, icon: 'error' }, { root: true });
        })
        .finally(() => {
          commit('CHANGE_LOADING', false, { root: true });
        });
    },
    addToCart({ commit, dispatch }, { productId, qty }) {
      commit('CHANGE_LOADING', true, { root: true });
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      axios.post(api, {
        data: { product_id: productId, qty },
      })
        .then((res) => {
          if (res.data.success) {
            dispatch('callSwal', { msg: res.data.message }, { root: true });
            dispatch('getCartList');
          } else {
            dispatch('callSwal', { msg: res.data.message, icon: 'error' }, { root: true });
          }
        })
        .catch((err) => {
          dispatch('callSwal', { msg: err, icon: 'error' }, { root: true });
        })
        .finally(() => {
          commit('CHANGE_LOADING', false, { root: true });
          commit('CLOSE_MODAL', false);
        });
    },
    updateCartNum({ commit, dispatch }, { id, qty }) {
      commit('CHANGE_LOADING', true, { root: true });
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${id}`;
      axios.put(api, {
        data: { product_id: id, qty },
      })
        .then((res) => {
          if (res.data.success) {
            dispatch('callSwal', { msg: res.data.message }, { root: true });
            dispatch('getCartList');
          } else {
            dispatch('callSwal', { msg: res.data.message, icon: 'error' }, { root: true });
          }
        })
        .catch((err) => {
          dispatch('callSwal', { msg: err, icon: 'error' }, { root: true });
        })
        .finally(() => {
          commit('CHANGE_LOADING', false, { root: true });
        });
    },
    deleteCartItem({ commit, dispatch }, { id }) {
      commit('CHANGE_LOADING', true, { root: true });
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${id}`;
      axios.delete(api)
        .then((res) => {
          if (res.data.success) {
            dispatch('callSwal', { msg: res.data.message }, { root: true });
            dispatch('getCartList');
          } else {
            dispatch('callSwal', { msg: res.data.message, icon: 'error' }, { root: true });
          }
        })
        .catch((err) => {
          dispatch('callSwal', { msg: err, icon: 'error' }, { root: true });
        })
        .finally(() => {
          commit('CHANGE_LOADING', false, { root: true });
        });
    },
    deleteAllCartItems({ commit, dispatch }) {
      commit('CHANGE_LOADING', true, { root: true });
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/carts`;
      axios.delete(api)
        .then((res) => {
          if (res.data.success) {
            dispatch('callSwal', { msg: res.data.message }, { root: true });
            dispatch('getCartList');
          } else {
            dispatch('callSwal', { msg: res.data.message, icon: 'error' }, { root: true });
          }
        })
        .catch((err) => {
          dispatch('callSwal', { msg: err, icon: 'error' }, { root: true });
        })
        .finally(() => {
          commit('CHANGE_LOADING', false, { root: true });
        });
    },
  },
  mutations: {
    SET_CARTLIST(state, payload) {
      state.cartList = payload;
    },
    SET_TOTAL(state, payload) {
      state.total = payload;
    },
    SET_FINAL_TOTAL(state, payload) {
      state.final_total = payload;
    },
    CLOSE_MODAL(state, payload) {
      state.closeModal = payload;
    },
  },
};
