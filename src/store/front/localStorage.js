export default {
  namespaced: true,
  state: {
    favoriteProducts: [],
  },
  actions: {
    getFavoriteProducts({ commit }) {
      const products = JSON.parse(localStorage.getItem('piggyItems')) || [];
      commit('SET_Favorite_Products', products);
    },
  },
  mutations: {
    SET_Favorite_Products(state, payload) {
      state.favoriteProducts = payload;
    },
    ADD_Favorite_Products(state, { title }) {
      const hasRepeat = state.favoriteProducts.includes(title);
      if (hasRepeat) return;
      state.favoriteProducts.push(title);
      localStorage.setItem('piggyItems', JSON.stringify(state.favoriteProducts));
    },
    REMOVE_Favorite_Products(state, { title }) {
      let removeIndex;
      state.favoriteProducts.forEach((item, index) => {
        if (item === title) removeIndex = index;
      });
      state.favoriteProducts.splice(removeIndex, 1);
      localStorage.setItem('piggyItems', JSON.stringify(state.favoriteProducts));
    },
  },
};
