<template>
  <div class="page-shop">
    <div class="jumbotron bg-cover
                d-flex justify-content-center align-items-center mb-6"
         :style="{ backgroundImage: `url(${coverImage})` }">
    </div>
    <div class="container">
      <h2 class="mb-3 fw-normal">{{ shopName }}</h2>
      <div class="d-flex align-items-center mb-3">
        <p class="py-2 px-3 bg-thirdly fs-6 text-white me-3"
           v-if="shopData?.is_superior">
          piggy 特選
        </p>
        <p class="py-2 px-3 bg-primary fs-6 text-white me-3"
           v-if="shopData?.is_new">
          新上市
        </p>
        <p>
          <i class="fas fa-star text-thirdly"></i>
          {{ shopData?.shop.star }}
        </p>
      </div>
      <p class="card-text fw-light text-gray-dark">
       {{ shopData?.category }} , {{ shopData?.subCategory }}
      </p>
    </div>
    <hr>
    <div class="container py-3">
      <section v-for="food in foodListByCategory"
               :key="food.category"
               class="mb-6">
        <h2 class="mb-3 fw-normal mb-3">{{ food.category }}</h2>
        <div class="row">
          <div class="col-md-6 col-lg-4"
               v-for="item in food.foods"
               :key="item.title">
            <BaseCardFood :product="item"
                          @trigger-modal="openModal"/>
          </div>
        </div>
      </section>
    </div>
    <ModalFood ref="foodModal"
               :productData="foodData"
               @send-order="addOrder"/>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import BaseCardFood from '@/components/front/BaseCardFood.vue';
import ModalFood from '@/components/front/ModalFood.vue';

export default {
  components: {
    BaseCardFood,
    ModalFood,
  },
  data() {
    return {
      shopName: '',
      foodData: {},
    };
  },
  computed: {
    ...mapState('frontProducts', [
      'allProducts',
    ]),
    ...mapState('frontCart', [
      'closeModal',
    ]),
    shopFoodList() {
      return this.allProducts.filter((product) => product.shop.title === this.shopName);
    },
    shopData() {
      return this.shopFoodList[0];
    },
    coverImage() {
      return this.shopData?.shop.imageUrl;
    },
    subCategory() {
      const categories = this.shopFoodList.map((shop) => shop.subCategory);
      return categories.filter((item, index, ary) => ary.indexOf(item) === index);
    },
    foodListByCategory() {
      const list = [];
      this.subCategory.forEach((item) => {
        const foods = [];
        this.shopFoodList.forEach((food) => {
          if (food.subCategory === item) foods.push(food);
        });
        list.push({ category: item, foods });
      });
      return list;
    },
  },
  watch: {
    closeModal() {
      if (this.closeModal) this.$refs.foodModal.hideModal();
    },
  },
  methods: {
    ...mapActions('frontProducts', [
      'getAllProducts',
    ]),
    ...mapActions('frontCart', [
      'addToCart',
    ]),
    openModal(product) {
      this.foodData = { ...product };
      this.$refs.foodModal.showModal();
    },
    async addOrder(order) {
      await this.addToCart(order);
    },
  },
  created() {
    this.shopName = this.$route.params.shop;
    this.getAllProducts();
  },
};
</script>
