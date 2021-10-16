<template>
  <div class="home">
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {
  },
  created() {
    console.log(process.env.VUE_APP_API, process.env.VUE_APP_PATH);
  },
};
</script>
