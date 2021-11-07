<template>
  <swiper :slidesPerView="1.2"
          :spaceBetween="15"
          :breakpoints="breakpoints"
          class="mySwiper mb-6">
    <swiper-slide v-for="article in news"
                  :key="article.id">
      <BaseCardNews :article="article"/>
    </swiper-slide>
  </swiper>
</template>

<script>
import BaseCardNews from '@/components/front/BaseCardNews.vue';

export default {
  components: {
    BaseCardNews,
  },
  props: {
    news: {
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
          slidesPerView: 3.5,
        },
      },
    };
  },
};
</script>
