<template>
  <div  ref="modal"
        class="modal fade"
        tabindex="-1">
    <div class="modal-dialog modal modal-dialog-centered">
      <div class="modal-content overflow-hidden">
        <div class="position-relative">
          <img class="img-cover w-100"
               :src="foodData.imageUrl"
               :alt="foodData.title">
          <button type="button"
                  class="btn p-2 position-absolute top-2 end-2
                         bg-white rounded-circle lh-1"
                  @click="hideModal">
            <i class="fas fa-times text-dark fs-3"></i>
          </button>
        </div>
        <div class="modal-body">
          <div class="d-flex justify-content-between">
            <h3 class="modal-title mb-3">{{ foodData.title }}</h3>
            <p class="fs-4">${{ foodData.price }} / {{ foodData.unit }}</p>
          </div>
          <p class="mb-3 text-gray-dark">{{ foodData.content }}</p>
          <p class="mb-3">{{ foodData.description }}</p>
        </div>
        <div class="modal-footer py-6">
          <div class="container-fluid">
            <div class="row justify-content-between">
              <p class="mb-3">請輸入訂購數量</p>
              <div class="col-md-5">
                 <div class="input-group mb-6">
                    <div :class="{ 'cursor-not-allowed': orderNum <= 1 }">
                      <button class="btn btn-secondary text-gray-dark"
                            :class="{ disabled : orderNum <= 1 }"
                            type="button"
                            @click.prevent="setOrderNum(-1)">
                        <i class="fas fa-minus"></i>
                      </button>
                    </div>
                    <input type="number"
                           min="1"
                           class="form-control text-center"
                           v-model.number="orderNum">
                    <button class="btn btn-secondary text-gray-dark"
                            type="button"
                            @click.prevent="setOrderNum(1)">
                      <i class="fas fa-plus"></i>
                    </button>
                  </div>
              </div>
              <div class="col-md-5">
                <button type="button"
                        class="btn btn-primary w-100 w-md-auto d-block ms-auto"
                        @click="comfirmOrder">
                  加入購物車
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixins from '@/mixins/modalMixins';

export default {
  mixins: [modalMixins],
  props: {
    productData: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    foodData: {
      get() {
        return this.productData;
      },
    },
  },
  data() {
    return {
      modal: {},
      orderNum: 1,
    };
  },
  watch: {
    productData: {
      immediate: true,
      handler() {
        this.orderNum = 1;
      },
    },
  },
  methods: {
    setOrderNum(num) {
      if (this.orderNum < 1) return;
      this.orderNum += num;
    },
    comfirmOrder() {
      if (this.orderNum < 1) {
        this.$_swal('訂購數量小於1', 'error');
        return;
      }
      this.$emit('sendOrder', {
        productId: this.foodData.id,
        qty: this.orderNum,
      });
    },
  },
};
</script>
