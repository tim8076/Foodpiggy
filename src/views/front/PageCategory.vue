<template>
  <div class="page-category">
    <div v-if="typeName"
         class="jumbotron bg-cover
                d-flex justify-content-center align-items-center mb-12"
         :style="{ backgroundImage:
         `url(${require(`@/assets/images/index/categories/${typeName}/cover.jpg`)})` }">
      <h2 class="display-5 text-primary p-3 bg-secondary">{{ category }}</h2>
    </div>
    <div v-else
        class="jumbotron bg-cover
              d-flex justify-content-center align-items-center mb-12"
        :style="{ backgroundImage:
        `url(${require(`@/assets/images/index/categories/taiwanese/cover.jpg`)})` }">
      <h2 class="display-5 text-primary p-3 bg-secondary">精選美食</h2>
    </div>
    <div class="container">
      <h2 class="mb-3 fw-normal">餐廳列表</h2>
      <div class="row" v-if="filterShops">
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
      queryObj: {},
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
      return this.categoryImages.find((item) => item.type === this.category)?.filename;
    },
    filterShops() {
      const { budget, filters, search } = { ...this.queryObj };
      let filterItems = [...this.shopList];
      let catchArray = [];
      // 如果是文字搜尋，過濾出搜尋文字的店家
      if (search) {
        catchArray = filterItems.filter((item) => {
          const key = search;
          return item.category.match(key)
            || item.subCategory.match(key)
            || item.shop.title.match(key);
        });
      }
      // 如果有預算跟料理篩選，先篩出一樣預算的店家，再進行料理篩選
      if (budget && filters.length) {
        filterItems = filterItems.filter((shop) => shop.shop.price === budget);
        catchArray = filterItems.filter((item) => {
          let isSelect = false;
          filters.forEach((filter) => {
            if (filter === item.category
              || filter === item.subCategory) {
              isSelect = true;
            }
          });
          return isSelect;
        });
      }
      // 只有預算篩選，篩選一樣預算店家
      if (budget && filters.length === 0) {
        catchArray = filterItems.filter((shop) => shop.shop.price === budget);
      }
      // 只有料理篩選，篩選一樣料理店家
      if (!budget && filters.length) {
        catchArray = filterItems.filter((item) => {
          let isSelect = false;
          filters.forEach((filter) => {
            if (filter === item.category
              || filter === item.subCategory) {
              isSelect = true;
            }
          });
          return isSelect;
        });
      }
      return catchArray;
    },
  },
  methods: {
    ...mapActions('frontProducts', [
      'getAllProducts',
    ]),
  },
  created() {
    const { budget, filters, search } = this.$route.query;
    this.queryObj = {
      search,
      budget,
      filters: filters ? JSON.parse(filters) : [],
    };
    this.getAllProducts();
  },
};
</script>
