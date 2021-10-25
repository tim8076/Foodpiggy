import axios from 'axios';

export default {
  namespaced: true,
  state: {
    allProducts: [],
    categoryImages: [
      {
        type: '台式料理',
        filename: 'taiwanese',
      },
      {
        type: '日式料理',
        filename: 'japan',
      },
      {
        type: '甜點-下午茶',
        filename: 'dessert',
      },
    ],
  },
  getters: {
    // 篩選出店家列表
    shopList(state) {
      const shoplist = state.allProducts.map((product) => (
        {
          shop: product.shop,
          category: product.category,
          subCategory: product.subCategory,
          isNew: product.is_new,
          is_superior: product.is_superior,
        }
      ));
      const shops = [];
      shoplist.forEach((item) => {
        let hasShop = false;
        shops.forEach((shop) => {
          if (shop.shop.title === item.shop.title) hasShop = true;
        });
        if (!hasShop) shops.push(item);
      });
      return shops;
    },
    // 篩選出美食類別列表
    foodCategory(state, getters) {
      const categorys = getters.shopList.map((shop) => shop.category);
      return categorys.filter((category, index, ary) => ary.indexOf(category) === index);
    },
    // 篩選出12間 4顆星以上的餐廳
    hotShops(state, getters) {
      const hotShops = [];
      getters.shopList.forEach((shop) => {
        if (hotShops.length < 12 && shop.shop.star > 3) hotShops.push(shop);
      });
      return hotShops;
    },
    // 篩選出12間 新餐廳
    newShops(state, getters) {
      const newShops = [];
      getters.shopList.forEach((shop) => {
        if (newShops.length < 12 && shop.isNew) newShops.push(shop);
      });
      return newShops;
    },
  },
  actions: {
    getAllProducts({ dispatch, commit }) {
      commit('CHANGE_LOADING', true, { root: true });
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`;
      axios.get(api)
        .then((res) => {
          if (res.data.success) {
            commit('SET_ALL_PRODUCTS', res.data.products);
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
    SET_ALL_PRODUCTS(state, payload) {
      state.allProducts = payload;
    },
  },
};
