<template>
  <div class="modal fade"
       tabindex="-1"
       ref="modal">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header bg-secondary">
          <h3 class="modal-title text-primary">
            {{ modalTitle }}
          </h3>
          <button type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close">
          </button>
        </div>
        <div class="modal-body">
          <div class="container">
            <div class="row">
              <div class="col-lg-4">
                <label for="main-image"
                       class="form-label">
                  輸入主要圖片網址
                </label>
                <input type="text"
                       id="main-image"
                       class="d-block form-control mb-3">
                <label for="main-image"
                       class="form-label">
                  或上傳圖片
                </label>
                <input type="file"
                       class="form-control mb-3"
                       id="inputGroupFile02"
                       ref="fileInput"
                       @change="uploadFile('product')">
                <img  class="img-fluid"
                      :src="tempProduct.imageUrl">
              </div>
              <div class="col-lg-8">
                  <label for="title"
                         class="form-label">
                    標題
                    <span class="text-primary">*</span>
                  </label>
                  <input type="text"
                         id="title"
                         class="d-block form-control mb-3"
                         v-model.trim="tempProduct.title">
                  <div class="row">
                    <div class="col-md-6">
                      <label for="category"
                             class="form-label">
                        分類
                        <span class="text-primary">*</span>
                      </label>
                      <input type="text"
                             id="category"
                             class="d-block form-control mb-3"
                             v-model.trim="tempProduct.category">
                    </div>
                    <div class="col-md-6">
                      <label for="subCategory"
                             class="form-label">
                        子分類
                        <span class="text-primary">*</span>
                      </label>
                      <input type="text"
                             id="subCategory"
                             class="d-block form-control mb-3"
                             v-model.trim="tempProduct.subCategory">
                    </div>
                    <div class="col-md-6">
                      <label for="unit"
                             class="form-label">
                        單位
                        <span class="text-primary">*</span>
                      </label>
                      <input type="text"
                             id="unit"
                             class="d-block form-control mb-3"
                             v-model.trim="tempProduct.unit">
                    </div>
                    <div class="col-md-6">
                      <label for="origin_price"
                              class="form-label">
                        原價
                        <span class="text-primary">*</span>
                      </label>
                      <input type="number"
                              id="origin_price"
                              class="d-block form-control mb-3"
                              v-model.number="tempProduct.origin_price">
                    </div>
                    <div class="col-md-6">
                      <label for="price"
                              class="form-label">
                        售價
                        <span class="text-primary">*</span>
                      </label>
                      <input type="number"
                              id="price"
                              class="d-block form-control mb-3"
                              v-model.number="tempProduct.price">
                    </div>
                    <div class="col-md-6 mt-6">
                      <div class="form-check">
                        <input class="form-check-input"
                               id="is_enabled"
                               type="checkbox"
                               :true-value="1"
                               :false-value="0"
                               v-model="tempProduct.is_enabled"
                               >
                        <label class="form-check-label"
                               for="is_enabled">
                          是否啟用
                        </label>
                      </div>
                    </div>
                  </div>
                  <hr>
                  <div class="mb-3">
                    <label for="description"
                           class="form-label">
                      產品描述
                    </label>
                    <textarea class="form-control"
                              id="description"
                              rows="3"
                              v-model.trim="tempProduct.description">
                    </textarea>
                  </div>
                  <div class="mb-3">
                    <label for="content"
                           class="form-label">
                      產品內容
                    </label>
                    <textarea class="form-control"
                              id="content"
                              rows="3"
                              v-model.trim="tempProduct.content">
                    </textarea>
                  </div>
                  <hr>
                  <label for="shopName"
                         class="form-label">
                    店家名稱
                  </label>
                  <input type="text"
                         id="shopName"
                         class="d-block form-control mb-3"
                         v-model.trim="tempProduct.shop.title">
                  <div class="row mb-3">
                    <div class="col-md-6">
                      <label for="shopName"
                            class="form-label">
                        店家星級(1-5顆星)
                      </label>
                      <input type="number"
                            min="1"
                            max="5"
                            id="shopStar"
                            class="d-block form-control mb-3"
                            v-model.number="tempProduct.shop.star">
                    </div>
                    <div class="col-md-6">
                      <label for="shopPrice"
                            class="form-label">
                        店家價位
                      </label>
                      <select id="shopPrice"
                              v-model.number="tempProduct.shop.price"
                              class="d-block form-control mb-3">
                        <option value="$">$</option>
                        <option value="$$">$$</option>
                        <option value="$$$">$$$</option>
                      </select>
                    </div>
                    <div class="col-md-6">
                      <label for="openTime"
                            class="form-label">
                        開門時間 (Am)
                      </label>
                      <select id="openTime"
                              class="d-block form-control mb-3"
                              v-model.number="tempProduct.shop.businessHours.open">
                        <option v-for="num in 12"
                                :key="num"
                                :value="num"> {{ num }}</option>
                      </select>
                    </div>
                    <div class="col-md-6">
                      <label for="closeTime"
                            class="form-label">
                        關門時間 (Pm)
                      </label>
                      <select id="closeTime"
                              class="d-block form-control mb-3"
                              v-model.number="tempProduct.shop.businessHours.close">
                       <option v-for="num in 12"
                                :key="num"
                                :value="num"> {{ num }}</option>
                      </select>
                    </div>
                    <div class="col-md-6 mt-6">
                      <div class="form-check">
                        <input  class="form-check-input"
                                id="is_superior"
                                type="checkbox"
                                v-model="tempProduct.is_superior">
                        <label class="form-check-label"
                                for="is_superior">
                          是否為嚴選店家
                        </label>
                      </div>
                    </div>
                    <div class="col-md-6 mt-6">
                      <div class="form-check">
                        <input class="form-check-input"
                               id="is_new"
                               type="checkbox"
                               v-model="tempProduct.is_new">
                        <label class="form-check-label"
                               for="is_new">
                          是否新上市
                        </label>
                      </div>
                    </div>
                    <div>
                      <label for="shop-image"
                        class="form-label">
                        上傳店家封面圖片
                      </label>
                      <input type="file"
                            class="form-control mb-3"
                            id="shop-image"
                            ref="shopFileInput"
                            @change="uploadFile('shop')">
                      <img  class="img-fluid"
                            :src="tempProduct.shop.imageUrl">
                    </div>
                    <template v-for="(item, index) in tempProduct.shop.comments"
                              :key="item.comment">
                      <hr class="mt-3">
                      <h4 class="mb-3">第 {{ index + 1 }} 則評論</h4>
                      <div class="mb-3 col-md-6">
                        <label for="customerName"
                              class="form-label">
                          顧客姓名
                        </label>
                        <input  type="text"
                                class="form-control"
                                id="customerName"
                                v-model.trim="item.name" />
                      </div>
                      <div class="mb-3 col-md-6">
                        <label for="customerScore"
                              class="form-label">
                          顧客給分
                        </label>
                        <select id="customerScore"
                                class="form-select"
                                v-model.number="item.star">
                          <option  v-for="num in 5"
                                   :key="num"
                                   :value="num">
                            {{ num }}
                          </option>
                        </select>
                      </div>
                      <div class="mb-3 col-md-6">
                        <label for="customerDate"
                              class="form-label">
                          評論日期
                        </label>
                        <input  type="date"
                                class="form-control"
                                id="customerDate"
                                rows="3"
                                v-model.trim="item.date" />
                      </div>
                      <div class="mb-3">
                        <label for="customerComment"
                              class="form-label">
                          評論內容
                        </label>
                        <textarea class="form-control"
                                  id="customerComment"
                                  rows="3"
                                  v-model.trim="item.comment">
                        </textarea>
                      </div>
                    </template>
                    <button class="btn btn-primary"
                            type="button"
                            @click="addComment">
                      新增顧客評論
                    </button>
                  </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal">
            關閉
          </button>
          <div :class="{ 'cursor-not-allowed' : isValid }">
            <button type="button"
                  class="btn btn-primary"
                  :class="{ disabled : isValid}"
                  @click="comfirmUpdate">
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixins from '@/mixins/modalMixins';
import commonMethods from '@/mixins/commonMethods';

export default {
  emits: ['updateProduct'],
  props: {
    product: {
      type: Object,
      default() { return {}; },
    },
    isNew: {
      type: Boolean,
      default: false,
    },
  },
  mixins: [
    commonMethods,
    modalMixins,
  ],
  data() {
    return {
      tempProduct: {
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
      },
      commentObj: {
        name: '',
        date: '',
        comment: '',
        star: 1,
      },
    };
  },
  computed: {
    isValid() {
      let valid;
      if (!this.tempProduct.title
          || !this.tempProduct.category
          || !this.tempProduct.subCategory
          || !this.tempProduct.unit
          || !this.tempProduct.origin_price
          || !this.tempProduct.price) {
        valid = true;
      }
      return valid;
    },
    modalTitle() {
      return this.isNew ? '建立產品' : '編輯產品';
    },
  },
  watch: {
    product: {
      immediate: true,
      handler() {
        this.tempProduct = this.product;
      },
    },
  },
  methods: {
    comfirmUpdate() {
      this.$emit('updateProduct', this.tempProduct);
    },
    addComment() {
      // 第一次新增評論時，新增陣列使用
      if (!this.tempProduct.shop.comments) {
        this.tempProduct.shop.comments = [];
        this.tempProduct.shop.comments.push({ ...this.commentObj });
        return;
      }
      // 已經有評論時，確認內容都有填才能再新增下一筆
      const lastIndex = this.tempProduct.shop.comments.length - 1;
      const lastComment = this.tempProduct.shop.comments[lastIndex];
      if (this.tempProduct.shop.comments
          && lastComment.name
          && lastComment.date
          && lastComment.comment) {
        this.tempProduct.shop.comments.push({ ...this.commentObj });
      } else {
        this.$_swal('還有評論內容未填', 'error');
      }
    },
    async uploadFile(type) {
      this.$store.commit('CHANGE_LOADING', true);
      let file = this.$refs.fileInput.files[0];
      if (type === 'shop') {
        [file] = this.$refs.shopFileInput.files;
      }
      try {
        const res = await this.$_uploadImage(file);
        if (res.data.success) {
          this.$_swal('圖片上傳成功');
          if (type === 'product') {
            this.tempProduct.imageUrl = res.data.imageUrl;
          } else if (type === 'shop') {
            this.tempProduct.shop.imageUrl = res.data.imageUrl;
          }
        } else {
          this.$_swal(res.data.message, 'error');
        }
      } catch (err) {
        this.$_swal(err, 'error');
      } finally {
        this.$store.commit('CHANGE_LOADING', false);
      }
    },
  },
};
</script>
