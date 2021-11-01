<template>
  <swiper :slidesPerView="1.2"
          :spaceBetween="15"
          :breakpoints="breakpoints"
          class="mySwiper">
    <swiper-slide v-for="shop in shops"
                  :key="shop.shop.title">
      <BaseCardNews />
    </swiper-slide>
  </swiper>
</template>

<script>
import BaseCardNews from '@/components/front/BaseCardNews.vue';

export default {
  components: {
    BaseCardNews,
  },
  data() {
    return {
      breakpoints: {
        768: {
          slidesPerView: 2.5,
          spaceBetween: 20,
        },
        992: {
          slidesPerView: 3.5,
        },
      },
    };
  },
};
</script>
