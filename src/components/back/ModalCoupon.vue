<template>
  <div class="modal fade"
       ref="modal">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">新增優惠券</h5>
          <button type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close">
          </button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="title"
                   class="form-label">
              優惠券標題
              <span class="text-primary">*</span>
            </label>
            <input type="text"
                  id="title"
                  class="d-block form-control"
                  v-model.trim="tempCoupon.title">
          </div>
          <div class="mb-3">
            <label for="code"
                   class="form-label">
              優惠碼
              <span class="text-primary">*</span>
            </label>
            <input type="text"
                  id="code"
                  class="d-block form-control"
                  v-model.trim="tempCoupon.code">
          </div>
          <div class="mb-3">
            <label for="percent"
                   class="form-label">
              優惠折數
              <span class="text-primary">*</span>
            </label>
            <input type="number"
                  id="percent"
                  class="d-block form-control"
                  v-model.number="tempCoupon.percent">
          </div>
          <div class="mb-3">
            <label for="due_date"
                   class="form-label">
              到期日
              <span class="text-primary">*</span>
            </label>
            <input type="date"
                  id="due_date"
                  class="d-block form-control"
                  @change="setDate">
          </div>
          <div class="mb-3">
            <div class="form-check">
              <input  class="form-check-input"
                      id="is_enabled"
                      type="checkbox"
                      :true-value="1"
                      :false-value="0"
                      v-model="tempCoupon.is_enabled">
              <label class="form-check-label"
                      for="is_enabled">
                是否啟用
              </label>
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
                  @click.prevent="sendCoupon">
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
  mixins: [
    commonMethods,
    modalMixins,
  ],
  props: {
    coupon: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      tempCoupon: {},
      modal: {},
    };
  },
  watch: {
    coupon: {
      immediate: true,
      handler() {
        this.tempCoupon = { ...this.coupon };
      },
    },
  },
  methods: {
    setDate($event) {
      const date = this.$_timestamp($event.target.value);
      this.tempCoupon.due_date = date;
    },
    sendCoupon() {
      this.$emit('send', this.tempCoupon);
    },
  },
};
</script>
