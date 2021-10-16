<template>
  <div class="page-login">
    <div class="bg-light">
      <div class="container">
         <h1>
          <router-link to="/" class="logo-title text-overflow bg-cover">
            foodpiggy 美食外送平台
          </router-link>
        </h1>
      </div>
    </div>
    <div class="container">
      <div class="login row align-items-center">
        <div class="col-lg-8 d-none d-lg-block">
          <h2 class="fs-1 text-primary">隨點隨到 <br>最方便的美食外送平台</h2>
        </div>
        <div class="login-panel col-md-6 mx-md-auto col-lg-4 py-12">
          <form @submit.prevent="signIn">
            <h2 class="text-center">登入</h2>
            <div class="mb-4">
              <label class="mb-1" for="email">Email</label>
              <input type="email"
                    class="form-control"
                    id="email"
                    required
                    v-model.trim="user.username">
            </div>
            <div class="mb-8">
              <label class="mb-1" for="password">密碼</label>
              <input type="password"
                    class="form-control"
                    id="password"
                    required
                    v-model.trim="user.password">
            </div>
            <input type="submit"
                   class="btn btn-primary w-100"
                   value="登入">
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    async signIn() {
      const api = `${process.env.VUE_APP_API}/admin/signin`;
      try {
        const res = await this.$http.post(api, this.user);
        if (res.data.success) {
          const { token, expired } = res.data;
          document.cookie = `piggyToken=${token}; expires=${new Date(expired)}`;
          this.$router.push('/dashboard/products');
        } else {
          this.$_swal(res.data.message, 'error');
        }
      } catch (err) {
        this.$_swal(err, 'error');
      }
    },
  },
};
</script>
