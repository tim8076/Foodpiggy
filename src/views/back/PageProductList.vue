<template>
  <div class="page-productList py-6 px-6 px-md-12">
    <div class="d-flex justify-content-between mb-3">
      <h2 class="fs-3">商品列表</h2>
      <div class="d-flex align-items-center">
        <div class="input-group border-3">
          <input type="text"
                  class="form-control"
                  placeholder="搜尋商品或店家..."
                  v-model.trim="searchText">
          <button class="btn btn-secondary"
                  type="button">
              <i class="fas fa-search"></i>
          </button>
        </div>
        <button class="btn btn-primary py-2 flex-shrink-0 ms-3"
              type="button"
              @click="toggleShopData">
            切換顯示店家物件
        </button>
        <button class="btn btn-primary py-2 flex-shrink-0 ms-3"
              type="button"
              @click="openModal(true)">
              新增商品
        </button>
      </div>
    </div>
    <table class="table bg-light">
      <thead>
        <tr>
          <th scope="col" width="150">分類</th>
          <th scope="col" width="150">店家名稱</th>
          <th scope="col">產品名稱</th>
          <th scope="col" width="150">原價</th>
          <th scope="col" width="150">售價</th>
          <th scope="col" width="150">是否啟用</th>
          <th scope="col" width="150">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in productData"
            :key="product.id">
          <th scope="row" class="text-primary">{{ product.category }}</th>
          <td>{{ product.shop.title }}</td>
          <td>{{ product.title }}</td>
          <td>{{ $_toCurrency(product.origin_price) }}</td>
          <td>{{ $_toCurrency(product.price) }}</td>
          <td>
            <span class="text-success"
                  v-if="product.is_enabled">
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
                      @click="openModal(false, product)">
                編輯
              </button>
              <button class="btn btn-sm btn-secondary"
                      type="button"
                      @click="removeProduct(product)">
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <BasePagination :pages="pagination"
                    @emit-page="getProducts"
                    v-show="!searchText"/>
    <ProductModal ref="productModal"
                  :isNew="isNew"
                  :product="tempProduct"
                  @update-product="sendProduct"/>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import ProductModal from '@/components/back/ModalProduct.vue';
import BasePagination from '@/components/BasePagination.vue';

export default {
  data() {
    return {
      modal: {},
      tempProduct: {
        shop: {
          imageUrl: '',
          title: '',
          star: 1,
          businessHours: {
            open: '',
            close: '',
          },
          comments: [],
        },
      },
      isNew: false,
      searchText: '',
      getShop: false,
      shopList: [],
    };
  },
  computed: {
    ...mapState('adminProductlists', [
      'products',
      'allProducts',
      'pagination',
    ]),
    ...mapGetters('adminProductlists', [
      'getSearchProducts',
    ]),
    productsList() {
      if (!this.searchText) return this.products;
      return this.getSearchProducts(this.searchText);
    },
    productData() {
      if (!this.getShop) return this.productsList;
      this.allProducts.forEach((product) => {
        const index = this.shopList.map((shop) => shop.shop.title).indexOf(product.shop.title);
        if (index === -1) this.shopList.push(product);
      });
      return this.shopList;
    },
  },
  components: {
    ProductModal,
    BasePagination,
  },
  methods: {
    ...mapActions('adminProductlists', [
      'getProducts',
      'getAllProducts',
      'updateProduct',
      'deleteProduct',
    ]),
    openModal(isNew, item) {
      if (isNew) {
        this.tempProduct = {
          shop: {
            imageUrl: '',
            title: '',
            star: 1,
            comments: [],
            businessHours: {
              open: '',
              close: '',
            },
          },
        };
      } else {
        this.tempProduct = JSON.parse(JSON.stringify(item));
      }
      this.isNew = isNew;
      this.$refs.productModal.showModal();
    },
    async sendProduct(tempProduct) {
      await this.updateProduct({
        tempProduct,
        isNew: this.isNew,
      });
      this.$refs.productModal.hideModal();
    },
    async removeProduct(product) {
      try {
        const res = await this.$_swalComfirm(`確定刪除 ${product.title}`);
        if (res.isConfirmed) {
          this.deleteProduct({ id: product.id });
        }
      } catch (err) {
        this.$_swal(err, 'error');
      }
    },
    toggleShopData() {
      this.getShop = !this.getShop;
    },
    // setItems() {
    //   const vm = this;
    //   this.allProducts.forEach((item) => {
    //     const product = item;
    //     product.shop.comments = [];
    //     vm.updateProduct({ tempProduct: product, isNew: false });
    //   });
    // },
  },
  async created() {
    await this.getProducts();
    await this.getAllProducts();
  },
};
</script>
