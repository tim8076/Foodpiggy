<template>
  <div class="page-article">
    <div class="jumbotron bg-cover
              d-flex justify-content-center align-items-center mb-6"
        :style="{ backgroundImage:
        `url(${require(`@/assets/images/index/jumbotron1.png`)})` }">
    <h2 class="display-5 text-primary p-3 bg-secondary">最新消息</h2>
    </div>
    <div class="container py-6">
      <h2 class="fs-3 mb-6">{{ article.title }}</h2>
      <p class="text-prewrap mb-3">{{ article.content }}</p>
      <p class="text-prewrap mb-12">{{ article.description }}</p>
      <section class="mb-6 mb-lg-8">
        <h3 class="mb-3 fw-normal">來去點餐</h3>
        <SwiperShops :shops="hotShops"
                     :scroll="true" />
      </section>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import SwiperShops from '@/components/front/SwiperShops.vue';

export default {
  components: {
    SwiperShops,
  },
  computed: {
    ...mapState('frontArticle', [
      'article',
    ]),
    ...mapGetters('frontProducts', [
      'hotShops',
    ]),
  },
  methods: {
    ...mapActions('frontProducts', [
      'getAllProducts',
    ]),
    ...mapActions('frontArticle', [
      'getArticle',
    ]),
  },
  created() {
    const id = this.$route.params.article;
    this.getArticle({ id });
    this.getAllProducts();
  },
};
</script>
