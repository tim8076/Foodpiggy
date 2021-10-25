<template>
  <swiper :slidesPerView="2.8"
          :spaceBetween="15"
          :breakpoints="breakpoints"
          class="mySwiper">
    <swiper-slide v-for="category in categoryItems"
                  :key="category">
      <BaseCardCategory :type="category"/>
    </swiper-slide>
  </swiper>
</template>

<script>
import { mapState } from 'vuex';
import BaseCardCategory from '@/components/front/BaseCardCategory.vue';

export default {
  components: {
    BaseCardCategory,
  },
  props: {
    categories: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    ...mapState('frontProducts', [
      'categoryImages',
    ]),
    categoryItems() {
      return this.categoryImages.filter((item) => {
        let match;
        this.categories.forEach((type) => {
          if (type === item.type) match = true;
        });
        return match;
      });
    },
  },
  data() {
    return {
      breakpoints: {
        768: {
          slidesPerView: 4.5,
        },
        992: {
          slidesPerView: 6.5,
        },
      },
    };
  },
};
</script>
