<template>
  <swiper :slidesPerView="1.2"
          :spaceBetween="15"
          :breakpoints="breakpoints"
          class="mySwiper">
    <swiper-slide v-for="shop in shops"
                  :key="shop.shop.title">
      <BaseCardShop :shop="shop"
                    @addFavorite="addToFavorite"
                    @removeFavorite="removeFavorite"/>
    </swiper-slide>
  </swiper>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
import BaseCardShop from '@/components/front/BaseCardShop.vue';

export default {
  components: {
    BaseCardShop,
  },
  props: {
    shops: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      breakpoints: {
        768: {
          slidesPerView: 2.5,
          spaceBetween: 20,
        },
        992: {
          slidesPerView: 4,
          spaceBetween: 20,
          slidesPerColumn: 3,
          slidesPerColumnFill: 'row',
        },
      },
    };
  },
  methods: {
    ...mapActions('localStorage', [
      'getFavoriteProducts',
    ]),
    ...mapMutations('localStorage', [
      'ADD_Favorite_Products',
      'REMOVE_Favorite_Products',
    ]),
    addToFavorite(title) {
      this.ADD_Favorite_Products({ title });
    },
    removeFavorite(title) {
      this.REMOVE_Favorite_Products({ title });
    },
  },
  created() {
    this.getFavoriteProducts();
  },
};
</script>
