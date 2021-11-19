import axios from 'axios';

export default {
  namespaced: true,
  state: {
    orders: [],
    pagination: {},
  },
  actions: {
    getOrders({ dispatch, commit }, page = 1) {
      commit('CHANGE_LOADING', true, { root: true });
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/orders?page=${page}`;
      axios.get(api)
        .then((res) => {
          if (res.data.success) {
            commit('SET_ORDERS', res.data.orders);
            commit('SET_PAGINATION', res.data.pagination);
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
    updateOrder({ dispatch, commit }, payload) {
      commit('CHANGE_LOADING', true, { root: true });
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${payload.id}`;
      axios.put(api, { data: payload })
        .then((res) => {
          if (res.data.success) {
            dispatch('callSwal', { msg: res.data.message }, { root: true });
            dispatch('getOrders');
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
    deleteOrder({ dispatch, commit }, { id }) {
      commit('CHANGE_LOADING', true, { root: true });
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${id}`;
      axios.delete(api)
        .then((res) => {
          if (res.data.success) {
            dispatch('callSwal', { msg: res.data.message }, { root: true });
            dispatch('getOrders');
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
    deleteAllOrders({ dispatch, commit }) {
      commit('CHANGE_LOADING', true, { root: true });
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/orders/all`;
      axios.delete(api)
        .then((res) => {
          if (res.data.success) {
            dispatch('callSwal', { msg: res.data.message }, { root: true });
            dispatch('getOrders');
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
    SET_ORDERS(state, payload) {
      state.orders = [...payload];
    },
    SET_PAGINATION(state, payload) {
      state.pagination = { ...payload };
    },
  },
};
