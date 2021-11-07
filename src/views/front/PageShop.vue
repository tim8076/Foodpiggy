<template>
  <div class="page-shop"
       v-if="shopData">
    <div class="jumbotron bg-cover
                d-flex justify-content-center align-items-center mb-6"
         :style="{ backgroundImage: `url(${coverImage})` }">
    </div>
    <div class="container">
      <div class="d-flex align-items-end">
        <h2 class="fw-normal me-2">{{ shopName }} </h2>
        <button type="button"
                class="text-decoration-underline btn p-0"
                @click.prevent="openShopModal">
          店家資訊
        </button>
      </div>
      <div class="d-flex align-items-center mb-3">
        <p class="py-2 px-3 bg-thirdly fs-6 text-white me-3"
           v-if="shopData.is_superior">
          piggy 特選
        </p>
        <p class="py-2 px-3 bg-primary fs-6 text-white me-3"
           v-if="shopData.is_new">
          新上市
        </p>
        <p>
          <i class="fas fa-star text-thirdly"></i>
          {{ shopData.shop.star }}
        </p>
      </div>
      <p class="card-text fw-light text-gray-dark">
       {{ shopData.shop.price }} {{ shopData.category }} , {{ shopData.subCategory }}
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
               v-if="foodData"
               :product-data="foodData"
               @send-order="addOrder"/>
    <ModalShop ref="shopModal"
               v-if="shopData"
               :shop-data="shopData"/>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import BaseCardFood from '@/components/front/BaseCardFood.vue';
import ModalFood from '@/components/front/ModalFood.vue';
import ModalShop from '@/components/front/ModalShop.vue';

export default {
  components: {
    BaseCardFood,
    ModalFood,
    ModalShop,
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
      this.$refs.foodModal.hideModal();
    },
    openShopModal() {
      this.$refs.shopModal.showModal();
    },
  },
  created() {
    this.shopName = this.$route.params.shop;
    this.getAllProducts();
  },
};
</script>
