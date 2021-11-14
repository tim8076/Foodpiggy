import axios from 'axios';

export default {
  namespaced: true,
  state: {
    order: {},
  },
  actions: {
    sendOrder({ commit }, payload) {
      commit('CHANGE_LOADING', true, { root: true });
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order`;
      return axios.post(api, {
        data: payload,
      });
    },
    getOrder({ commit, dispatch }, { id }) {
      commit('CHANGE_LOADING', true, { root: true });
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order/${id}`;
      axios.get(api)
        .then((res) => {
          if (res.data.success) {
            commit('SET_ORDER', res.data.order);
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
    chcekoutOrder({ commit, dispatch }, { id }) {
      commit('CHANGE_LOADING', true, { root: true });
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/pay/${id}`;
      axios.post(api)
        .then((res) => {
          if (res.data.success) {
            dispatch('callSwal', { msg: res.data.message }, { root: true });
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
    SET_ORDER(state, payload) {
      state.order = payload;
    },
  },
};
