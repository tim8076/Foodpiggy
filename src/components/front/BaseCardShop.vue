<template>
  <div class="card card__shop">
    <router-link class="link"
                 :to="{ name: 'indexshop', params: { shop: shopData.title } }" />
    <a href="#"
       class="heart position-absolute top-5 end-5 fs-4 text-primary z-index-1000"
       v-show="!active"
       @click.stop.prevent="addToFavorite"
       @click.prevent="toggleActive">
      <i class="far fa-heart"></i>
    </a>
    <a href="#"
       class="heart position-absolute top-5 end-5 fs-4 text-primary z-index-1030"
       v-show="active"
       @click.stop.prevent="removeFavorite"
       @click.prevent="toggleActive">
      <i class="fas fa-heart"></i>
    </a>
    <div class="overflow-hidden position-relative rounded-3 mb-2">
      <img :src="shopData.imageUrl"
            class="card-img-top"
            :alt="shopData.title">
      <div class="position-absolute top-0 start-0 pt-3 fs-6 text-white">
          <p class="ps-3 py-1 pe-3 mb-3 bg-thirdly"
             v-if="shop.is_superior">
            特選店家
          </p>
          <p class="ps-3 py-1 pe-3 mb-3 p-1 bg-primary"
             v-if="shop.isNew">
            新餐廳
          </p>
      </div>
    </div>
    <div class="card-body p-0">
      <div class="d-flex justify-content-between align-items-center">
        <h3 class="card-title fs-4">{{ shopData.title }}</h3>
        <p class="me-2">
          <i class="fas fa-star text-thirdly"></i>
          {{ shopData.star }}
        </p>
      </div>
      <p class="card-text fw-light text-gray-dark">
       {{ shop.shop.price }} {{ shop.category }} , {{ shop.subCategory }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    shop: {
      type: Object,
      default() {
        return {};
      },
    },
    isFavoritePage: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      active: false,
    };
  },
  computed: {
    shopData() {
      return this.shop.shop;
    },
  },
  watch: {
    isFavoritePage: {
      immediate: true,
      handler() {
        if (this.isFavoritePage) this.active = true;
      },
    },
  },
  methods: {
    addToFavorite() {
      this.$emit('addFavorite', this.shop.shop.title);
      this.$_swal('已加入收藏清單');
    },
    removeFavorite() {
      this.$emit('removeFavorite', this.shop.shop.title);
      this.$_swal('已從收藏清單移除');
    },
    toggleActive() {
      this.active = !this.active;
    },
  },
};
</script>
