<template>
  <div class="modal fade"
       tabindex="-1"
       ref="modal">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header bg-secondary">
          <h3 class="modal-title text-primary">
            訂單編號: {{ tempOrder.id }}
          </h3>
          <button type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close">
          </button>
        </div>
        <div class="modal-body">
          <div class="container-fluid">
            <h4 class="mb-3 fw-normal">顧客資料</h4>
            <div class="row gy-2 gx-4 mb-6">
              <div class="col-md-6">
                <label for="name"
                      class="form-label">
                  姓名
                </label>
                <input type="text"
                      id="name"
                      class="d-block form-control"
                      v-model.trim="tempOrder.user.name">
              </div>
              <div class="col-md-6">
                <label for="name"
                      class="form-label">
                  電話
                </label>
                <input type="tel"
                      id="tel"
                      class="d-block form-control"
                      v-model.trim="tempOrder.user.tel">
              </div>
              <div class="col-md-6">
                <label for="email"
                      class="form-label">
                  信箱
                </label>
                <input type="email"
                      id="email"
                      class="d-block form-control"
                      v-model.trim="tempOrder.user.email">
              </div>
              <div class="col-md-6">
                <label for="address"
                      class="form-label">
                  地址
                </label>
                <input type="text"
                      id="address"
                      class="d-block form-control"
                      v-model.trim="tempOrder.user.address">
              </div>
              <div class="col-md-6">
                <div class="form-check form-switch">
                  <input class="form-check-input"
                         type="checkbox"
                         role="switch"
                         id="is_paid"
                         v-model="tempOrder.is_paid">
                  <label class="form-check-label"
                         for="is_paid">
                    {{ tempOrder.is_paid ? '已付款' : '未付款' }}
                  </label>
                </div>
              </div>
            </div>
            <div class="w-md-75 mx-auto">
              <div class="d-flex justify-content-between align-items-center">
                <h4 class="mb-3 fw-normal">訂單明細</h4>
                <p>日期: {{ $_date(tempOrder.create_at) }}</p>
              </div>
              <ul class="border-bottom mb-2">
                <li v-for="product in products"
                    :key="product.id"
                    class="mb-3">
                    <div class="d-flex justify-content-between align-items-center">
                      <div class="d-flex align-items-center me-3">
                        <h4 class="fs-5 fw-normal me-3">{{ product.product.title }}</h4>
                        <p> x {{ product.qty }}</p>
                      </div>
                      <p class="text-end text-gray-dark">$ {{ product.total }}</p>
                    </div>
                </li>
              </ul>
              <p class="text-end text-primary">NT$ {{ tempOrder.total }}</p>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal">
            關閉
          </button>
          <button type="button"
                  class="btn btn-primary"
                  @click.prevent="sendOrder">
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixins from '@/mixins/modalMixins';
import commonMethods from '@/mixins/commonMethods';

export default {
  props: {
    order: {
      type: Object,
      default: () => ({}),
    },
  },
  mixins: [
    commonMethods,
    modalMixins,
  ],
  data() {
    return {
      tempOrder: {
        user: {},
        products: {},
      },
    };
  },
  computed: {
    products() {
      return Object.values(this.tempOrder.products);
    },
  },
  watch: {
    order: {
      immediate: true,
      handler() {
        this.tempOrder = this.order;
      },
    },
  },
  methods: {
    sendOrder() {
      this.$emit('sendOrder', this.tempOrder);
    },
  },
};
</script>
