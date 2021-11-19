import axios from 'axios';

export default {
  namespaced: true,
  state: {
    article: {},
    articles: [],
  },
  actions: {
    getArticle({ commit, dispatch }, { id }) {
      commit('CHANGE_LOADING', true, { root: true });
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/article/${id}`;
      axios.get(api)
        .then((res) => {
          if (res.data.success) {
            commit('SET_ARTICLE', res.data);
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
    getArticles({ commit, dispatch }, page = 1) {
      commit('CHANGE_LOADING', true, { root: true });
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/articles?page=${page}`;
      axios.get(api)
        .then((res) => {
          if (res.data.success) {
            commit('SET_ARTICLES', res.data);
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
    SET_ARTICLE(state, payload) {
      state.article = payload.article;
    },
    SET_ARTICLES(state, payload) {
      state.articles = payload.articles;
    },
  },
};
