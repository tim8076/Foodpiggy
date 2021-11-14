<template>
  <div ref="offcanvas"
       class="offcanvas offcanvas__cart offcanvas-end"
       tabindex="-1"
       aria-labelledby="offcanvasRightLabel">
    <div class="offcanvas-header">
      <h3>您的購物車</h3>
      <div>
        <button type="button"
              class="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close">
        </button>
      </div>
    </div>
    <div class="offcanvas-body">
      <template v-if="cartData.length">
        <div  v-for="cart in cartData"
            :key="cart.id"
            class="position-relative d-flex align-items-center mb-3 mb-md-6
                   shadow-sm">
          <img class="offcanvas-image img-cover me-3"
              :src="cart.product.imageUrl">
          <div class="d-flex flex-column justify-content-between w-100 w-md-100">
            <h4 class="fw-normal">{{ cart.product.title }}</h4>
            <p class="fs-3 fw-bold">{{ cart.final_total }}</p>
          </div>
          <div class="input-group align-self-center
                      justify-content-center flex-grow-1 me-2 me-md-3">
            <button class="btn p-0 border-0"
                    type="button"
                    v-if="cart.qty === 1"
                    @click.prevent="$emit('deleteCart',
                    { id: cart.id, title: cart.product.title })">
              <i class="far fa-trash-alt fs-3 text-primary"></i>
            </button>
            <button class="btn p-0 border-0"
                    type="button"
                    v-else
                    @click.prevent="$emit('updateCartNum', { id: cart.id, qty: cart.qty - 1 })">
              <i class="fas fa-minus fs-3 text-primary"></i>
            </button>
            <input type="text"
                  class="form-control border-0 fs-3 bg-transparent
                          fw-bold text-center flex-grow-0 w-25 px-0 mx-2 mx-md-3"
                  v-model.number="cart.qty"
                  @keyup.enter="$emit('updateCartNum', { id: cart.id, qty: cart.qty })"
                  @blur="$emit('updateCartNum', { id: cart.id, qty: cart.qty })">
            <button class="btn p-0 border-0"
                    type="button"
                    @click.prevent="$emit('updateCartNum', { id: cart.id, qty: cart.qty + 1 })">
              <i class="fas fa-plus fs-3 text-primary"></i>
            </button>
          </div>
        </div>
      </template>
      <div v-else
           class="text-center d-flex flex-column justify-content-center align-items-center h-100">
        <img :src="require('@/assets/images/logo/logo-pig.png')"
             class="cart-logo mb-3"
             alt="logo-image">
        <p class="fs-4 mb-6">
          購物車還沒有商品<br>快去訂購喜愛的美食吧!
        </p>
        <button class="btn btn-primary w-50"
                type="button"
                @click="goShop">
          購物去
        </button>
      </div>
    </div>
    <div v-if="cartData.length"
         class="d-flex justify-content-between align-items-center px-8 py-6">
      <div>
        <p class="fs-4">Total</p>
        <p class="text-primary fw-bold fs-2"> $ {{ finalTotal }}</p>
      </div>
      <div>
        <button class="btn btn-outline-primary me-2"
                type="button"
                @click.prevent="$emit('deleteAll')">
          清空購物車
        </button>
        <button type="button"
                class="btn btn-primary"
                @click.prevent="goCheckout">
          前往結帳
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Offcanvas from 'bootstrap/js/dist/offcanvas';

export default {
  emits: ['updateCartNum',
    'deleteCart',
    'deleteAll',
  ],
  props: {
    carts: {
      type: Array,
      default: () => [],
    },
    finalTotal: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    cartData: {
      get() {
        return this.carts;
      },
    },
  },
  data() {
    return {
      offCanvas: {},
    };
  },
  methods: {
    showCanvas() {
      this.offCanvas.show();
    },
    hideCanvas() {
      this.offCanvas.hide();
    },
    toggleCanvas() {
      this.offCanvas.toggle();
    },
    goShop() {
      this.hideCanvas();
      this.$router.push('/index/home');
    },
    goCheckout() {
      this.hideCanvas();
      this.$router.push('/index/order');
    },
  },
  mounted() {
    this.offCanvas = new Offcanvas(this.$refs.offcanvas);
  },
};
</script>
