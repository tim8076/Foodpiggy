<template>
  <header class="bg-secondary py-1">
    <div class="container d-flex justify-content-between">
      <h1>
        <router-link to="/index/home" class="logo-title text-overflow bg-cover">
          foodpiggy 美食外送平台
        </router-link>
      </h1>
      <button type="button"
              class="d-lg-none btn btn-sm text-primary"
              @click="toggleMenu">
        <i class="fas fa-bars fs-3"></i>
      </button>
    </div>
  </header>
</template>

<script>
export default {
  emits: ['toggle'],
  data() {
    return {
      is_open: false,
    };
  },
  methods: {
    toggleMenu() {
      this.is_open = !this.is_open;
      this.$emit('toggle', this.is_open);
    },
  },
};
</script>
