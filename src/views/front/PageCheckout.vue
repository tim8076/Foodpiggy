<template>
  <div class="page-checkout">
    <div class="container py-6"
        v-if="JSON.stringify(order) !== '{}'">
      <div class="w-md-75 mx-auto mb-6">
        <ul class="c-progress">
          <li class="c-progress__item">
            <p>1</p>
            <p>購物車</p>
          </li>
          <li class="c-progress__item">
            <p>2</p>
            <p>訂單</p>
          </li>
          <li class="c-progress__item active">
            <p>3</p>
            <p>結帳</p>
          </li>
        </ul>
      </div>
      <div class="mb-6 text-center">
        <h2 class="fs-3 fw-normal">預估外送時間</h2>
        <p class="text-primary fs-1 mb-3">20分鐘</p>
        <img class="img-fluid motor-icon mb-3"
            src="@/assets/images/logo/moto.png"
            alt="motor">
        <p class="mb-3">訂單正準備外送至您府上，請耐心等候</p>
      </div>
      <div class="w-md-75 w-lg-50 mx-auto mb-6">
        <div class="shadow-sm border p-4 p-md-6 rounded-3 mb-6">
          <h3 class="fs-4 mb-4 text-primary">
            <i class="fas fa-clipboard-list me-3"></i>您的訂單
          </h3>
          <ul class="border-bottom mb-3">
            <li v-for="product in order.products"
                :key="product.id"
                class="mb-3">
                <div class="d-flex justify-content-between align-items-center">
                  <h4 class="fs-5 fw-normal">{{ product.product.title }}</h4>
                  <p> x {{ product.qty }}</p>
                </div>
                <p class="text-end text-gray-dark">$ {{ product.total }}</p>
            </li>
          </ul>
          <div class="d-flex justify-content-between align-items-center">
            <h4 class="fs-5 text-primary">小計</h4>
            <p>{{ order.total }}</p>
          </div>
        </div>
        <div class="shadow-sm border p-4 p-md-6 rounded-3 mb-6">
          <h3 class="fs-4 mb-4 text-primary">
            <i class="fas fa-clipboard-list me-3"></i>訂單詳情
          </h3>
          <ul>
            <li class="d-flex justify-content-between align-items-center mb-3">
              <h4 class="text-gray-dark fw-normal fs-5">訂單編號:</h4>
              <p>{{ order.id }}</p>
            </li>
            <li class="d-flex justify-content-between align-items-center mb-3">
              <h4 class="text-gray-dark fw-normal fs-5">訂餐人姓名:</h4>
              <p>{{ user.name }}</p>
            </li>
            <li class="d-flex justify-content-between align-items-center mb-3">
              <h4 class="text-gray-dark fw-normal fs-5">付款方式:</h4>
              <p>{{ user.payment }}</p>
            </li>
            <li class="d-flex justify-content-between align-items-center mb-3">
              <h4 class="text-gray-dark fw-normal fs-5">付款狀態:</h4>
              <p>{{ order.is_paid ? '完成付款' : '未付款' }}</p>
            </li>
            <li class="d-flex justify-content-between align-items-center mb-3">
              <h4 class="text-gray-dark fw-normal fs-5">送餐地址:</h4>
              <p>{{ user.address }}</p>
            </li>
          </ul>
        </div>
        <router-link :to="{ name: 'indexHome' }"
          class="btn btn-primary w-100">
          返回首頁
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState('frontOrder', [
      'order',
    ]),
    user() {
      return this.order.user;
    },
  },
  methods: {
    ...mapActions('frontOrder', [
      'getOrder',
    ]),
  },
  created() {
    const id = this.$route.params.orderId;
    this.getOrder({ id });
  },
};
</script>
