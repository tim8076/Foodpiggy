<template>
  <div>
    <header class="header position-fixed top-0 start-0 end-0 z-index-1030 bg-light py-2"
          :class="{ 'shadow-sm' : active }">
      <nav>
        <div class="container d-flex justify-content-between align-items-center">
          <h1>
            <router-link to="/index/home"
                        class="logo-title text-overflow bg-cover">
              foodpiggy 美食外送平台
            </router-link>
          </h1>
          <div class="d-flex align-items-center">
            <router-link class="btn px-3"
                        :to="{ name: 'indexFavorite' }">
              <i class="far fa-heart fs-3 text-primary"></i>
            </router-link>
            <button class="btn px-3"
                    @click="toggleCart">
              <i class="fas fa-shopping-cart fs-3 text-primary"></i>
            </button>
          </div>
        </div>
      </nav>
    </header>
    <OffcanvasCart ref="cartCanvas"
                   :carts="cartList"
                   :final-total="final_total"
                   @updateCartNum="updateCart"
                   @deleteCart="deleteCart"/>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import OffcanvasCart from '@/components/front/OffcanvasCart.vue';

export default {
  components: {
    OffcanvasCart,
  },
  data() {
    return {
      active: false,
    };
  },
  computed: {
    ...mapState('frontCart', [
      'cartList',
      'final_total',
    ]),
  },
  methods: {
    ...mapActions('frontCart', [
      'getCartList',
      'updateCartNum',
      'deleteCartItem',
    ]),
    scrollHandler() {
      if (window.scrollY > 0) {
        this.active = true;
      } else if (window.scrollY <= 0) {
        this.active = false;
      }
    },
    toggleCart() {
      this.$refs.cartCanvas.toggleCanvas();
    },
    updateCart({ id, qty }) {
      if (qty < 1) {
        this.$_swal('數量不能小於 1', 'error');
        this.getCartList();
        return;
      }
      this.updateCartNum({ id, qty });
    },
    async deleteCart({ id, title }) {
      const res = await this.$_swalComfirm(`確認刪除 ${title} `);
      if (res.isConfirmed) this.deleteCartItem({ id });
    },
  },
  mounted() {
    window.addEventListener('scroll', this.scrollHandler);
    this.getCartList();
  },
  unmounted() {
    window.removeEventListener('scroll', this.scrollHandler);
  },
};
</script>
