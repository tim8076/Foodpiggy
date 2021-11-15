<template>
  <div class="page-orderList py-6 px-6 px-md-12">
    <div class="d-flex justify-content-between mb-3">
      <h2 class="fs-3">訂單列表</h2>
      <div class="d-flex align-items-center">
        <div class="input-group border-3">
          <input type="text"
                  class="form-control"
                  placeholder="搜尋訂單"
                  v-model.trim="searchText">
          <button class="btn btn-secondary"
                  type="button">
              <i class="fas fa-search"></i>
          </button>
        </div>
        <button class="btn btn-primary py-2 flex-shrink-0 ms-3"
                type="button"
                @click.prevent="deleteAll">
          刪除全部訂單
        </button>
      </div>
    </div>
    <table class="table bg-light">
      <thead>
        <tr>
          <th scope="col" width="150">訂單日期</th>
          <th scope="col">訂單編號</th>
          <th scope="col" width="150">顧客姓名</th>
          <th scope="col" width="150">訂單金額</th>
          <th scope="col" width="150">是否啟用</th>
          <th scope="col" width="150">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders"
            :key="order.id">
          <th scope="row" class="text-primary">
            {{ $_date(order.create_at) }}
          </th>
          <td>{{ order.id }}</td>
          <td>{{ order.user.name }}</td>
          <td>{{ order.total }}</td>
          <td>
            <span class="text-success"
                  v-if="order.is_paid">
                  已付款
            </span>
            <span class="text-danger"
                  v-else>
                  未付款
            </span>
          </td>
          <td width="250">
          <div class="input-group mb-3">
              <button class="btn btn-sm btn-primary"
                      type="button"
                      @click="openModal(order)">
                編輯
              </button>
              <button class="btn btn-sm btn-secondary"
                      type="button"
                      @click="removeOrder(order.id)">
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <BasePagination :pages="pagination"
                    @emit-page="getOrders"
                    v-show="!searchText"/>
    <OrderModal ref="orderModal"
                :order="tempOrder"
                @send-order="confirmOrder"/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import OrderModal from '@/components/back/ModalOrder.vue';
import BasePagination from '@/components/BasePagination.vue';

export default {
  components: {
    OrderModal,
    BasePagination,
  },
  data() {
    return {
      modal: {},
      tempOrder: {
        user: {},
        products: {},
      },
      searchText: '',
    };
  },
  computed: {
    ...mapState('adminOrderlist', [
      'orders',
      'pagination',
    ]),
  },
  methods: {
    ...mapActions('adminOrderlist', [
      'getOrders',
      'updateOrder',
      'deleteOrder',
      'deleteAllOrders',
    ]),
    openModal(order) {
      this.tempOrder = JSON.parse(JSON.stringify(order));
      this.$refs.orderModal.showModal();
    },
    confirmOrder(order) {
      this.updateOrder(order);
      this.$refs.orderModal.hideModal();
    },
    async removeOrder(id) {
      const res = await this.$_swalComfirm('確認刪除訂單?');
      if (res.isConfirmed) this.deleteOrder({ id });
    },
    async deleteAll() {
      const res = await this.$_swalComfirm('確認刪除所有訂單?');
      if (res.isConfirmed) this.deleteAllOrders();
    },
  },
  created() {
    this.getOrders();
  },
};
</script>
