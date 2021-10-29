<template>
  <div class="card card__category">
    <router-link class="link"
                 :to="{ name: 'indexCategory', params: { category: type.type } }" />
    <div class="card-body bg-primary px-1
        d-flex flex-column align-items-center justify-content-center">
      <img class="logo bg-white rounded-circle mb-3"
           :src="require(`@/assets/images/index/categories/${type.filename}/small.png`)"
           :alt="type.type">
      <h3 class="card-text fw-light text-white fs-5">
       {{ type.type }}
      </h3>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    type: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>
