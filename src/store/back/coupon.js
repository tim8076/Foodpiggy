import axios from 'axios';

export default {
  namespaced: true,
  state: {
    coupons: [],
    pagination: {},
  },
  actions: {
    getCoupons({ commit, dispatch }, page = 1) {
      commit('CHANGE_LOADING', true, { root: true });
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupons?page=${page}`;
      axios.get(api)
        .then((res) => {
          if (res.data.success) {
            commit('SET_COUPONS', res.data.coupons);
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
    updateCoupon({ commit, dispatch }, { coupon, isNew }) {
      commit('CHANGE_LOADING', true, { root: true });
      let api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon`;
      let httpMethod = 'post';
      if (!isNew) {
        api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${coupon.id}`;
        httpMethod = 'put';
      }
      axios[httpMethod](api, {
        data: coupon,
      })
        .then((res) => {
          if (res.data.success) {
            dispatch('callSwal', { msg: res.data.message }, { root: true });
            dispatch('getCoupons');
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
    deleteCoupon({ commit, dispatch }, { id }) {
      commit('CHANGE_LOADING', true, { root: true });
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${id}`;
      axios.delete(api)
        .then((res) => {
          if (res.data.success) {
            dispatch('callSwal', { msg: res.data.message }, { root: true });
            dispatch('getCoupons');
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
    SET_COUPONS(state, payload) {
      state.coupons = payload;
    },
    SET_PAGINATION(state, payload) {
      state.pagination = payload;
    },
  },
};
