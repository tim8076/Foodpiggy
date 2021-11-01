<template>
  <div class="page-home">
    <SwiperJumbotron class="mb-12 mb-md-20"/>
    <div class="container">
      <section>
        <SwiperNews />
      </section>
      <section class="mb-6 mb-lg-8">
        <h2 class="mb-3 fw-normal">超人氣餐廳</h2>
        <SwiperShops :shops="hotShops" />
      </section>
      <section class="mb-6 mb-lg-8">
        <h2 class="mb-3 fw-normal">新上市</h2>
        <SwiperShops :shops="newShops" />
      </section>
      <section class="mb-6 mb-lg-8">
        <h2 class="mb-3 fw-normal">在家吃遍全世界</h2>
        <SwiperCategory :categories="foodCategory" />
      </section>
      <section class="mb-6 mb-lg-8">
        <h2 class="mb-3 fw-normal">所有餐廳</h2>
        <div class="row">
          <div v-for="shop in shopList"
               :key="shop.shop.title"
               class="col-md-4 col-lg-3 mb-3">
            <BaseCardShop :shop="shop"
                          @addFavorite="addToFavorite"
                          @removeFavorite="removeFavorite"/>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import SwiperJumbotron from '@/components/front/SwiperJumbotron.vue';
import SwiperNews from '@/components/front/BaseCardNews.vue';
import SwiperShops from '@/components/front/SwiperShops.vue';
import SwiperCategory from '@/components/front/SwiperCategory.vue';
import BaseCardShop from '@/components/front/BaseCardShop.vue';

export default {
  components: {
    SwiperJumbotron,
    SwiperNews,
    SwiperShops,
    SwiperCategory,
    BaseCardShop,
  },
  computed: {
    ...mapGetters('frontProducts', [
      'shopList',
      'foodCategory',
      'hotShops',
      'newShops',
    ]),
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
