<template>
  <div class="page-favorites">
    <div class="jumbotron bg-cover
                d-flex justify-content-center align-items-center mb-12"
         :style="{ backgroundImage:
         `url(${require(`@/assets/images/index/categories/taiwanese/cover.jpg`)})` }">
      <h2 class="display-5 text-primary p-3 bg-secondary">您的收藏店家</h2>
    </div>
    <div class="container">
      <h2 class="mb-3 fw-normal">餐廳列表</h2>
      <div class="row">
          <div v-for="shop in favoriteShops"
              :key="shop"
              class="col-md-4 col-lg-3 mb-6">
            <BaseCardShop :shop="shop"
                          :isFavoritePage="true"
                          @addFavorite="addToFavorite"
                          @removeFavorite="removeFavorite"/>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import {
  mapState, mapGetters, mapActions, mapMutations,
} from 'vuex';
import BaseCardShop from '@/components/front/BaseCardShop.vue';

export default {
  components: {
    BaseCardShop,
  },
  computed: {
    ...mapState('localStorage', [
      'favoriteProducts',
    ]),
    ...mapGetters('frontProducts', [
      'shopList',
    ]),
    favoriteShops() {
      return this.shopList.filter((shop) => this.favoriteProducts.includes(shop.shop.title));
    },
  },
  methods: {
    ...mapActions('localStorage', [
      'getFavoriteProducts',
    ]),
    ...mapMutations('localStorage', [
      'ADD_Favorite_Products',
      'REMOVE_Favorite_Products',
    ]),
    ...mapActions('frontProducts', [
      'getAllProducts',
    ]),
    addToFavorite(title) {
      this.ADD_Favorite_Products({ title });
    },
    removeFavorite(title) {
      this.REMOVE_Favorite_Products({ title });
    },
  },
  created() {
    this.getAllProducts();
    this.getFavoriteProducts();
  },
};
</script>
