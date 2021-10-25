<template>
  <div class="page-category">
    <div class="jumbotron bg-cover
                d-flex justify-content-center align-items-center mb-12"
         :style="{ backgroundImage:
         `url(${require(`@/assets/images/index/categories/${typeName}/cover.jpg`)})` }">
      <h2 class="display-5 text-primary p-3 bg-secondary">{{ category }}</h2>
    </div>
    <div class="container">
      <h2 class="mb-3 fw-normal">餐廳列表</h2>
      <div class="row">
        <div v-for="shop in filterShops"
            :key="shop"
            class="col-md-4 col-lg-3 mb-6">
          <BaseCardShop :shop="shop" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import BaseCardShop from '@/components/front/BaseCardShop.vue';

export default {
  components: {
    BaseCardShop,
  },
  data() {
    return {
      category: '',
    };
  },
  computed: {
    ...mapState('frontProducts', [
      'categoryImages',
    ]),
    ...mapGetters('frontProducts', [
      'shopList',
    ]),
    typeName() {
      return this.categoryImages.find((item) => item.type === this.category).filename;
    },
    filterShops() {
      return this.shopList.filter((shop) => shop.category === this.category);
    },
  },
  methods: {
    ...mapActions('frontProducts', [
      'getAllProducts',
    ]),
  },
  created() {
    this.category = this.$route.params.category;
    this.getAllProducts();
  },
};
</script>
