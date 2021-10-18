<template>
  <div class="page-home">
    <SwiperJumbotron/>
  </div>
</template>

<script>
import SwiperJumbotron from '@/components/front/SwiperJumbotron.vue';

export default {
  components: {
    SwiperJumbotron,
  },
  data() {
    return {
      swiperPagination: {
        clickable: true,
      },
    };
  },
};
</script>
