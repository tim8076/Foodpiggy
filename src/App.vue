<template>
  <Loading :active="isLoading"
           :z-index="9999" >
    <div class="loadingio-spinner-ripple">
      <div class="loadingIo">
        <div>
        </div>
        <div>
        </div>
      </div>
    </div>
  </Loading>
  <router-view/>
</template>

<script>
export default {
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
  },
};
</script>

<style lang="scss">
@import "./assets/scss/all";
</style>
