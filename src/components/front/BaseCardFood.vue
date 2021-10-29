<template>
  <div class="card card__food flex-row bg-gray mb-3 mb-md-6">
    <a href="#"
       class="stretched-link"
       @click.prevent="openModal">
    </a>
    <div class="text px-3 py-6 p-md-6 flex-grow-1 d-flex flex-column justify-content-between">
      <h3 class="fs-4">{{ product.title }}</h3>
      <p>$ {{ product.price }}</p>
    </div>
    <div class="overflow-hidden">
      <img class="image img-cover"
          :src="product.imageUrl"
          :alt="product.title">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    openModal() {
      this.$emit('triggerModal', this.product);
    },
  },
};
</script>
