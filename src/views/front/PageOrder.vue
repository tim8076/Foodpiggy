<template>
  <div class="container py-6">
    <div class="row justify-content-center mb-12">
      <div class="col-md-8">
        <ul class="c-progress">
          <li class="c-progress__item">
            <p>1</p>
            <p>購物車</p>
          </li>
          <li class="c-progress__item active">
            <p>2</p>
            <p>訂單</p>
          </li>
          <li class="c-progress__item">
            <p>3</p>
            <p>結帳</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="row justify-content-md-center">
      <div class="col-md-6 col-lg-4 mb-6">
        <div class="shadow-sm border p-4 p-md-6 rounded-3 mb-6">
          <h3 class="fs-4 mb-4 text-primary">
            <i class="fas fa-clipboard-list me-3"></i>訂單明細
          </h3>
          <ul class="border-bottom mb-3">
            <li v-for="item in cartList"
                :key="item.id"
                class="mb-3">
                <div class="d-flex justify-content-between align-items-center">
                  <h4 class="fs-5 fw-normal">{{ item.product.title }}</h4>
                  <p> x {{ item.qty }}</p>
                </div>
                <p class="text-end text-gray-dark">$ {{ item.total }}</p>
            </li>
          </ul>
          <div class="d-flex justify-content-between align-items-center text-primary mb-2">
            <h4 class="fs-5">小計</h4>
            <p class="fw-bold"
               :class="{ 'text-decoration-line-through' : couponUsed }">
               ${{ total }}
            </p>
          </div>
          <div v-if="couponUsed"
               class="d-flex justify-content-between align-items-center mb-2
                      text-gray-dark">
            <h4 class="fs-5 fw-normal">折扣</h4>
            <p>${{ discount }}</p>
          </div>
          <button type="button"
                  class="btn p-0 mb-3"
                  @click.prevent="is_coupon = true">
            使用優惠券?
          </button>
          <div class="input-group mb-3"
               v-if="is_coupon">
            <input type="text"
                   class="form-control"
                   placeholder="請輸入優惠券代碼"
                   v-model.trim="couponCode">
            <button class="btn btn-outline-primary"
                    type="button"
                    @click.prevent="sendCoupon">
              套用
            </button>
          </div>
          <div class="d-flex justify-content-between align-items-center text-primary mb-2">
            <h4 class="fs-5">總計</h4>
            <p class="fw-bold">${{ final_total }}</p>
          </div>
        </div>
        <div class="shadow-sm border p-4 p-md-6 rounded-3">
          <h3 class="fs-4 mb-4 text-primary">
            <i class="fas fa-sticky-note me-3"></i>訂單備註
          </h3>
          <div class="mb-3">
            <label for="message"
                   class="form-label">備註</label>
            <textarea class="form-control"
                      id="message"
                      v-model.trim="message"
                      rows="5">
            </textarea>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-lg-4 order-md-start">
        <div class="shadow-sm border p-4 p-md-6 rounded-3">
          <h3 class="fs-4 mb-4 text-primary">
            <i class="fas fa-user-alt me-3"></i>訂購人資料
          </h3>
          <Form @submit="sendForm" v-slot="{ errors }">
            <div class="mb-3">
              <label for="name" class="form-label">姓名</label>
              <Field type="text"
                    class="form-control"
                    :class="{ 'is-invalid' : errors['name'] }"
                    v-model.trim="user.name"
                    id="name"
                    name="name"
                    rules="required"
                    placeholder="ex: 王小明" />
              <ErrorMessage name="name"
                            class="text-danger"/>
            </div>
            <div class="mb-3">
              <label for="tel" class="form-label">電話</label>
              <Field type="tel"
                    class="form-control"
                    :class="{ 'is-invalid' : errors['tel'] }"
                    v-model.trim="user.tel"
                    id="tel"
                    name="tel"
                    :rules="isPhone"
                    placeholder="ex: 0905166333" />
              <ErrorMessage name="tel"
                            class="text-danger"/>
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">email</label>
              <Field type="email"
                    class="form-control"
                    :class="{ 'is-invalid' : errors['email'] }"
                    v-model.trim="user.email"
                    id="email"
                    name="email"
                    rules="required|email"
                    placeholder="ex: abc@gmail.com" />
              <ErrorMessage name="email"
                            class="text-danger"/>
            </div>
            <div class="mb-3">
              <label for="payment" class="form-label">付款方式</label>
              <Field id="payment"
                     class="form-select"
                     :class="{ 'is-invalid' : errors['payment'] }"
                     name="payment"
                     rules="required"
                     v-model="user.payment"
                     as="select">
                <option value="" selected disabled>選擇付款方式</option>
                <option value="現金">現金</option>
                <option value="信用卡">信用卡</option>
              </Field>
              <ErrorMessage name="payment"
                            class="text-danger"/>
            </div>
            <div class="mb-6">
              <label for="address" class="form-label">地址</label>
              <Field type="text"
                    class="form-control"
                    :class="{ 'is-invalid' : errors['address'] }"
                    v-model.trim="user.address"
                    id="address"
                    name="address"
                    rules="required"
                    placeholder="ex: 台北市大安區中山路一段" />
              <ErrorMessage name="address"
                            class="text-danger"/>
            </div>
            <div :class="{ 'cursor-not-allowed' : isValid }">
              <button type="submit"
                      :class="{ 'disabled' : isValid }"
                      class="btn btn-primary w-100">
                建立訂單
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      is_coupon: false,
      couponCode: '',
      user: {
        name: '',
        email: '',
        tel: '',
        payment: '',
        address: '',
      },
      message: '',
    };
  },
  computed: {
    ...mapState('frontCart', [
      'cartList',
      'total',
      'final_total',
    ]),
    couponUsed() {
      if (this.final_total !== this.total) return true;
      return false;
    },
    discount() {
      return this.total - this.final_total;
    },
    isValid() {
      return Object.values(this.user).some((item) => item === '');
    },
  },
  methods: {
    ...mapActions('frontCart', [
      'getCartList',
    ]),
    ...mapActions('frontOrder', [
      'sendOrder',
      'chcekoutOrder',
      'useCoupon',
    ]),
    isPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/;
      return phoneNumber.test(value) ? true : '電話號碼格式錯誤';
    },
    async sendForm() {
      const data = {
        user: this.user,
        message: this.message,
      };
      try {
        const res = await this.sendOrder(data);
        if (res.data.success) {
          await this.chcekoutOrder({ id: res.data.orderId });
          await this.getCartList();
          this.$router.push(`/index/checkout/${res.data.orderId}`);
        } else {
          this.$_swal(res.data.message, 'error');
        }
      } catch (err) {
        this.$_swal(err, 'error');
      }
    },
    sendCoupon() {
      this.useCoupon({ code: this.couponCode });
    },
  },
};
</script>
