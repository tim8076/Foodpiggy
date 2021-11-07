<template>
  <div ref="modal"
       class="modal modal__shop fade"
       tabindex="-1">
    <div class="modal-dialog modal-lg">
      <div class="modal-content overflow-hidden">
        <div class="position-relative">
          <img class="modal-image w-100 img-cover"
               :src="shop.imageUrl"
               :alt="shopData.title">
          <button type="button"
                  class="btn p-2 position-absolute top-2 end-2
                         bg-white rounded-circle lh-1"
                  @click="hideModal">
            <i class="fas fa-times text-dark fs-3"></i>
          </button>
        </div>
        <div class="modal-body">
          <div class="p-5 w-md-80 mx-auto bg-white shadow text-center mb-6">
            <div class="d-flex justify-content-center align-items-center mb-3">
              <h3 class="me-3 fw-normal">{{ shop.title }}</h3>
              <p>
                <i class="fas fa-star text-thirdly"></i>
                {{ shop.star }}
              </p>
            </div>
            <div class="d-flex fs-6 justify-content-center mb-3">
              <p class="me-2">{{ shop.price }}</p>
              <p class="me-2">{{ shopData.category}}</p>
              <p>{{ shopData.subCategory }}</p>
            </div>
            <p>營業時間: {{ openTime }}</p>
          </div>
          <h4 class="border-bottom pb-2 w-md-80 mx-auto">{{ shop.comments.length }} 則評論</h4>
          <ul class="w-md-80 mx-auto">
            <li v-for="item in shop.comments"
                :key="item.name"
                class="py-6 border-bottom">
              <div class="d-flex justify-content-between align-items-center">
                <h5 class="fw-normal">{{ item.name }}</h5>
                <p class="fs-6">
                  <i class="fas fa-star text-thirdly"></i>
                  {{ item.star }} / 5
                </p>
              </div>
              <p class="text-gray-dark mb-3">{{ item.date }}</p>
              <p>{{ item.comment }}</p>
            </li>
          </ul>
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
    shopData: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      modal: {},
    };
  },
  computed: {
    shop() {
      return this.shopData.shop;
    },
    openTime() {
      const time = this.shopData.shop.businessHours;
      const open = time.open < 10 ? `0${time.open}` : time.open;
      const close = time.close < 10 ? `0${time.close}` : time.close;
      return `上午 ${open}:00 - 下午 ${close}:00`;
    },
  },
};
</script>
