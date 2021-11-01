<template>
  <div ref="modal"
       class="modal fade"
       tabindex="-1">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header bg-secondary">
          <h3 class="modal-title text-primary">
            建立文章
          </h3>
          <button type="button"
                  class="btn-close"
                  data-bs-dismiss="modal">
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
                       @change="uploadFile">
                <img  class="img-fluid"
                      :src="tempArticle.image">
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
                        v-model.trim="tempArticle.title">
                <label for="subTitle"
                       class="form-label">
                    副標題
                    <span class="text-primary">*</span>
                </label>
                <input type="text"
                        id="subTitle"
                        class="d-block form-control mb-3"
                        v-model.trim="tempArticle.subTitle">
                <div class="row">
                  <div class="col-lg-6">
                    <label for="category"
                           class="form-label">
                      分類
                      <span class="text-primary">*</span>
                    </label>
                    <input type="text"
                           id="category"
                           class="d-block form-control mb-3"
                           v-model.trim="tempArticle.category">
                  </div>
                  <div class="col-lg-6">
                    <label for="author"
                           class="form-label">
                      作者
                      <span class="text-primary">*</span>
                    </label>
                    <input type="text"
                           id="author"
                           class="d-block form-control mb-3"
                           v-model.trim="tempArticle.author">
                  </div>
                  <div class="col-lg-6">
                    <label for="create_at"
                           class="form-label">
                      日期
                      <span class="text-primary">*</span>
                    </label>
                    <input type="date"
                           id="create_at"
                           class="d-block form-control mb-3"
                           @change="setDate">
                  </div>
                  <div class="col-lg-6 mt-6">
                    <div class="form-check">
                      <input  class="form-check-input"
                              id="isPublic"
                              type="checkbox"
                              v-model="tempArticle.isPublic">
                      <label class="form-check-label"
                              for="isPublic">
                        是否啟用
                      </label>
                    </div>
                  </div>
                </div>
                <div class="mb-3">
                  <label for="description"
                         class="form-label">
                    文章介紹
                  </label>
                  <textarea class="form-control"
                            id="description"
                            v-model.trim="tempArticle.description"
                            rows="6">
                  </textarea>
                </div>
                <div class="mb-3">
                  <label for="content"
                         class="form-label">
                    文章內容
                    <span class="text-primary">*</span>
                  </label>
                  <textarea class="form-control"
                            id="content"
                            v-model.trim="tempArticle.content"
                            rows="6">
                  </textarea>
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
  mixins: [
    commonMethods,
    modalMixins,
  ],
  emits: ['updateArticle'],
  props: {
    article: {
      type: Object,
      default() { return {}; },
    },
    isNew: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      tempArticle: {},
    };
  },
  computed: {
    isValid() {
      let valid;
      if (!this.tempArticle.title
          || !this.tempArticle.category
          || !this.tempArticle.create_at
          || !this.tempArticle.author
          || !this.tempArticle.isPublic
          || !this.tempArticle.content) {
        valid = true;
      }
      return valid;
    },
  },
  watch: {
    article: {
      immediate: true,
      handler() {
        this.tempArticle = this.article;
      },
    },
  },
  methods: {
    setDate(e) {
      const date = e.target.value;
      const timestamp = this.$_timestamp(date);
      this.tempArticle.create_at = timestamp;
    },
    async uploadFile() {
      this.$store.commit('CHANGE_LOADING', true);
      const file = this.$refs.fileInput.files[0];
      try {
        const res = await this.$_uploadImage(file);
        if (res.data.success) {
          this.$_swal('圖片上傳成功');
          this.tempArticle.image = res.data.imageUrl;
        } else {
          this.$_swal(res.data.message, 'error');
        }
      } catch (err) {
        this.$_swal(err, 'error');
      } finally {
        this.$store.commit('CHANGE_LOADING', false);
      }
    },
    comfirmUpdate() {
      this.$emit('updateArticle', this.tempArticle);
    },
  },
};
</script>
