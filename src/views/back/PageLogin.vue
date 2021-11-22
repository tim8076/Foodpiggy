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
          <Form @submit="signIn" v-slot="{ errors }">
            <h2 class="text-center">登入</h2>
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <Field type="email"
                    class="form-control"
                    :class="{ 'is-invalid' : errors['email'] }"
                    v-model.trim="user.username"
                    id="email"
                    name="email"
                    rules="required|email"
                    placeholder="請輸入帳號"
                    autocomplete="email" />
              <ErrorMessage name="email"
                            class="text-danger"/>
            </div>
            <div class="mb-6">
              <label for="password" class="form-label">密碼</label>
              <Field type="password"
                    class="form-control"
                    :class="{ 'is-invalid' : errors['password'] }"
                    v-model.trim="user.password"
                    id="password"
                    name="password"
                    rules="required"
                    placeholder="請輸入密碼"
                    autocomplete="current-password"/>
              <ErrorMessage name="password"
                            class="text-danger"/>
            </div>
            <div class="div"
                 :class="{ 'cursor-not-allowed' : isValid }">
              <input type="submit"
                   class="btn btn-primary w-100"
                   :class="{ 'disabled' : isValid }"
                   value="登入">
            </div>
          </Form>
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
  computed: {
    isValid() {
      return Object.values(this.user).some((item) => item === '');
    },
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
