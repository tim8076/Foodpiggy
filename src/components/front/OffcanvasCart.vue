<template>
  <div ref="offcanvas"
       class="offcanvas offcanvas__cart offcanvas-end"
       tabindex="-1"
       aria-labelledby="offcanvasRightLabel">
    <div class="offcanvas-header">
      <h3>您的購物車</h3>
      <button type="button"
              class="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close">
      </button>
    </div>
    <div class="offcanvas-body">
      <div  v-for="cart in cartData"
            :key="cart.id"
            class="position-relative d-flex align-items-center mb-3 mb-md-6 bg-secondary border">
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
                  @click="$emit('updateCartNum', { id: cart.id, qty: cart.qty - 1 })">
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
                  @click="$emit('updateCartNum', { id: cart.id, qty: cart.qty + 1 })">
            <i class="fas fa-plus fs-3 text-primary"></i>
          </button>
        </div>
        <a href="#"
           class="position-absolute top-0 end-0"
           @click.prevent="$emit('deleteCart', { id: cart.id, title: cart.product.title })">
          <i class="fas fa-window-close text-primary fs-3 "></i>
        </a>
      </div>
    </div>
    <div class="d-flex justify-content-between align-items-center px-8 py-6">
      <div>
        <p class="fs-4">Total</p>
        <p class="text-primary fw-bold fs-2"> $ {{ finalTotal }}</p>
      </div>
      <router-link to="/"
                   class="btn btn-primary">
        前往結帳
      </router-link>
    </div>
  </div>
</template>

<script>
import Offcanvas from 'bootstrap/js/dist/offcanvas';

export default {
  emits: ['updateCartNum'],
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
  },
  mounted() {
    this.offCanvas = new Offcanvas(this.$refs.offcanvas);
  },
};
</script>
