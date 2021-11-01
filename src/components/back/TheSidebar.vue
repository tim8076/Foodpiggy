<template>
  <nav class="dashboard-sidebar bg-light">
    <ul class="sidebar-list pt-8 ps-6 pe-12">
      <li class="sidebar-list__item mb-8 fs-4">
        <router-link :to="{ name: 'dashboardProducts' }">
          <i class="fas fa-tags me-2"></i>
          商品列表
        </router-link>
      </li>
      <li class="sidebar-list__item mb-8 fs-4">
        <router-link to="/">
          <i class="fas fa-list me-2"></i>
          訂單列表
        </router-link>
      </li>
      <li class="sidebar-list__item mb-8 fs-4">
        <router-link :to="{ name: 'dashboardArticles' }">
          <i class="fas fa-ticket-alt me-2"></i>
          文章列表
        </router-link>
      </li>
      <li class="sidebar-list__item mb-8 fs-4">
        <router-link to="/">
          <i class="fas fa-ticket-alt me-2"></i>
          優惠券
        </router-link>
      </li>
      <li class="sidebar-list__item mb-8 fs-4">
        <a href="#"
           @click.prevent="logout">
          <i class="fas fa-sign-out-alt me-2"></i>
          登出系統
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  methods: {
    async logout() {
      this.$store.commit('CHANGE_LOADING', true);
      try {
        const api = `${process.env.VUE_APP_API}/logout`;
        const res = await this.$http.post(api);
        if (res.data.success) {
          this.$router.push('/login');
        } else {
          this.$_swal(res.data.message, 'error');
        }
      } catch (err) {
        this.$_swal(err, 'error');
      }
      this.$store.commit('CHANGE_LOADING', false);
    },
  },
};
</script>
