<template>
  <div class="page-article py-6 px-6 px-md-12">
    <div class="d-flex justify-content-between mb-3">
      <h2 class="fs-3">優惠券列表</h2>
      <div class="d-flex align-items-center">
        <div class="input-group border-3">
          <input type="text"
                 class="form-control"
                 placeholder="搜尋優惠券"
                 v-model.trim="searchText">
          <button class="btn btn-secondary"
                  type="button">
              <i class="fas fa-search"></i>
          </button>
        </div>
        <button class="btn btn-primary py-2 flex-shrink-0 ms-3"
              type="button"
              @click="openModal(true)">
              新增優惠券
        </button>
      </div>
    </div>
    <table class="table bg-light">
      <thead>
        <tr>
          <th scope="col" width="150">到期日</th>
          <th scope="col">優惠券名稱</th>
          <th scope="col" width="150">是否啟用</th>
          <th scope="col" width="150">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="coupon in couponList"
            :key="coupon.id">
          <th scope="row" class="text-primary">{{ $_date(coupon.due_date) }}</th>
          <td>{{ coupon.title }}</td>
          <td>
            <span class="text-success"
                  v-if="coupon.is_enabled">
                  啟用
            </span>
            <span class="text-danger"
                  v-else>
                  未啟用
            </span>
          </td>
          <td width="250">
            <div class="input-group mb-3">
                <button class="btn btn-sm btn-primary"
                        type="button"
                        @click="openModal(false, coupon)">
                  編輯
                </button>
                <button class="btn btn-sm btn-secondary"
                        type="button"
                        @click="removeCoupon(coupon)">
                  刪除
                </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <CouponModal ref="couponModal"
                 :coupon="tempCoupon"
                 @send="confirmCoupon"/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import CouponModal from '@/components/back/ModalCoupon.vue';
import commonMethods from '@/mixins/commonMethods';

export default {
  mixins: [
    commonMethods,
  ],
  components: {
    CouponModal,
  },
  data() {
    return {
      modal: {},
      tempCoupon: {},
      isNew: false,
      searchText: '',
    };
  },
  computed: {
    ...mapState('adminCoupon', [
      'coupons',
      'pagination',
    ]),
    couponList() {
      if (this.searchText) {
        return this.coupons.filter((coupon) => coupon.title.match(this.searchText));
      }
      return this.coupons;
    },
  },
  methods: {
    ...mapActions('adminCoupon', [
      'getCoupons',
      'updateCoupon',
      'deleteCoupon',
    ]),
    openModal(isNew, coupon) {
      if (isNew) {
        this.tempCoupon = {};
      } else {
        this.tempCoupon = { ...coupon };
      }
      this.isNew = isNew;
      this.$refs.couponModal.showModal();
    },
    confirmCoupon(coupon) {
      this.updateCoupon({
        coupon,
        isNew: this.isNew,
      });
      this.$refs.couponModal.hideModal();
    },
    async removeCoupon(coupon) {
      const res = await this.$_swalComfirm(`確定刪除 ${coupon.title} ?`);
      try {
        if (res.isConfirmed) this.deleteCoupon({ id: coupon.id });
      } catch (err) {
        this.$_swal(err, 'error');
      }
    },
  },
  created() {
    this.getCoupons();
  },
};
</script>
