<template>
  <div class="page-dashboard"
       :class="{ active : is_toggle }">
    <TheHeader @toggle="toggleMenu"/>
    <div class="d-flex">
      <TheSidebar/>
      <router-view class="dashboard-content flex-grow-1 bg-gray hide-scrollbar"/>
    </div>
  </div>
</template>

<script>
import TheHeader from '@/components/back/TheHeader.vue';
import TheSidebar from '@/components/back/TheSidebar.vue';

export default {
  data() {
    return {
      is_toggle: false,
    };
  },
  components: {
    TheHeader,
    TheSidebar,
  },
  methods: {
    async checkLogin() {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)piggyToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      this.$http.defaults.headers.common.Authorization = token;
      const api = `${process.env.VUE_APP_API}/api/user/check`;
      try {
        const res = await this.$http.post(api);
        if (!res.data.success) {
          this.$router.push('/login');
        }
      } catch (err) {
        this.$_swal(err, 'error');
      }
    },
    toggleMenu(isToggle) {
      this.is_toggle = isToggle;
    },
  },
  created() {
    this.checkLogin();
  },
};
</script>
