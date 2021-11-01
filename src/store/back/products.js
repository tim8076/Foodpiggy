import axios from 'axios';

export default {
  namespaced: true,
  state: {
    allProducts: [],
    products: [],
    pagination: {},
  },
  getters: {
    getSearchProducts: (state) => (filter) => {
      const searchText = filter.toLowerCase();
      return state.allProducts.filter((product) => {
        const title = product.title.toLowerCase();
        const shopName = product.shop.title.toLowerCase();
        const category = product.category.toLowerCase();
        return title.match(searchText)
          || shopName.match(searchText)
          || category.match(searchText);
      });
    },
  },
  actions: {
    getAllProducts({ dispatch, commit }) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products/all`;
      axios.get(api)
        .then((res) => {
          if (res.data.success) {
            commit('SET_ALL_PRODUCTS', res);
          } else {
            dispatch('callSwal', { msg: res.data.message, icon: 'error' }, { root: true });
          }
        })
        .catch((err) => {
          dispatch('callSwal', { msg: err, icon: 'error' }, { root: true });
        });
    },
    getProducts({ dispatch, commit }, page = 1) {
      commit('CHANGE_LOADING', true, { root: true });
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`;
      axios.get(api)
        .then((res) => {
          commit('CHANGE_LOADING', false, { root: true });
          if (res.data.success) {
            commit('SET_PRODUCTS', res);
            commit('SET_PAGINATIONS', res);
          } else {
            dispatch('callSwal', { msg: res.data.message, icon: 'error' }, { root: true });
          }
        })
        .catch((err) => {
          dispatch('callSwal', { msg: err, icon: 'error' }, { root: true });
          commit('CHANGE_LOADING', false, { root: true });
        });
    },
    updateProduct({ dispatch, commit }, { tempProduct, isNew }) {
      commit('CHANGE_LOADING', true, { root: true });
      // 新增
      let api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product`;
      let httpMethod = 'post';
      // 修改
      if (!isNew) {
        api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${tempProduct.id}`;
        httpMethod = 'put';
      }
      axios[httpMethod](api, {
        data: tempProduct,
      })
        .then((res) => {
          commit('CHANGE_LOADING', false, { root: true });
          if (res.data.success) {
            dispatch('callSwal', { msg: res.data.message }, { root: true });
            dispatch('getProducts');
          } else {
            dispatch('callSwal', { msg: res.data.message, icon: 'error' }, { root: true });
          }
        })
        .catch((err) => {
          dispatch('callSwal', { msg: err, icon: 'error' }, { root: true });
          commit('CHANGE_LOADING', false, { root: true });
        });
    },
    deleteProduct({ dispatch, commit }, { id }) {
      commit('CHANGE_LOADING', true, { root: true });
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${id}`;
      axios.delete(api)
        .then((res) => {
          commit('CHANGE_LOADING', false, { root: true });
          if (res.data.success) {
            dispatch('callSwal', { msg: res.data.message }, { root: true });
            dispatch('getProducts');
          } else {
            dispatch('callSwal', { msg: res.data.message, icon: 'error' }, { root: true });
          }
        })
        .catch((err) => {
          dispatch('callSwal', { msg: err, icon: 'error' }, { root: true });
          commit('CHANGE_LOADING', false, { root: true });
        });
    },
  },
  mutations: {
    SET_PRODUCTS(state, payload) {
      state.products = payload.data.products;
    },
    SET_ALL_PRODUCTS(state, payload) {
      state.allProducts = Object.values(payload.data.products);
    },
    SET_PAGINATIONS(state, payload) {
      state.pagination = payload.data.pagination;
    },
  },
};
