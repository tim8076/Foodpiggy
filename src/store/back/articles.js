import axios from 'axios';

export default {
  namespaced: true,
  state: {
    articles: [],
    pagination: {},
  },
  getters: {

  },
  actions: {
    // 取得所有文章(有分頁)
    getArticles({ commit, dispatch }, page = 1) {
      commit('CHANGE_LOADING', true, { root: true });
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/articles?page=${page}`;
      axios.get(api)
        .then((res) => {
          if (res.data.success) {
            commit('SET_ARTICLES', res.data);
            commit('SET_PAGINATION', res.data);
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
    // 取得單一文章
    getArticle(context, { id }) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article/${id}`;
      return axios.get(api);
    },
    // 新增與編輯文章
    updateArticle({ commit, dispatch }, { tempArticle, isNew }) {
      commit('CHANGE_LOADING', true, { root: true });
      let api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article`;
      let httpMethod = 'post';
      if (!isNew) {
        api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article/${tempArticle.id}`;
        httpMethod = 'put';
      }
      axios[httpMethod](api, {
        data: tempArticle,
      })
        .then((res) => {
          if (res.data.success) {
            dispatch('callSwal', { msg: res.data.message }, { root: true });
            dispatch('getArticles');
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
    // 刪除單一文章
    deleteArticle({ commit, dispatch }, { id }) {
      commit('CHANGE_LOADING', true, { root: true });
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article/${id}`;
      axios.delete(api)
        .then((res) => {
          if (res.data.success) {
            dispatch('callSwal', { msg: res.data.message }, { root: true });
            dispatch('getArticles');
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
    // SET_ARTICLE(state, payload) {
    //   state.article = payload.article;
    // },
    SET_ARTICLES(state, payload) {
      state.articles = payload.articles;
    },
    SET_PAGINATION(state, payload) {
      state.pagination = payload.pagination;
    },
  },
};
