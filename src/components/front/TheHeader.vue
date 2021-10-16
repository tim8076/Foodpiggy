<template>
  <header class="header position-fixed top-0 start-0 end-0 bg-light py-2"
          :class="{ 'shadow-sm' : active }">
    <nav>
      <div class="container d-flex justify-content-between align-items-center">
        <h1>
          <router-link to="/index/home"
                       class="logo-title text-overflow bg-cover">
            foodpiggy 美食外送平台
          </router-link>
        </h1>
        <button class="btn">
          <i class="fas fa-shopping-cart fs-3 text-primary"></i>
        </button>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      active: false,
    };
  },
  methods: {
    scrollHandler() {
      if (window.scrollY > 0) {
        this.active = true;
      } else if (window.scrollY <= 0) {
        this.active = false;
      }
    },
  },
  mounted() {
    window.addEventListener('scroll', this.scrollHandler);
  },
  unmounted() {
    window.removeEventListener('scroll', this.scrollHandler);
  },
};
</script>
