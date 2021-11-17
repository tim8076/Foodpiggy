<template>
  <div class="page-article py-6 px-6 px-md-12">
    <div class="d-flex justify-content-between mb-3">
      <h2 class="fs-3">文章列表</h2>
      <div class="d-flex align-items-center">
        <div class="input-group border-3">
          <input type="text"
                  class="form-control"
                  placeholder="搜尋文章"
                  v-model.trim="searchText">
          <button class="btn btn-secondary"
                  type="button">
              <i class="fas fa-search"></i>
          </button>
        </div>
        <button class="btn btn-primary py-2 flex-shrink-0 ms-3"
              type="button"
              @click="openModal(true)">
              新增文章
        </button>
      </div>
    </div>
    <table class="table bg-light">
      <thead>
        <tr>
          <th scope="col" width="150">文章分類</th>
          <th scope="col">文章標題</th>
          <th scope="col" width="150">是否啟用</th>
          <th scope="col" width="150">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="article in articles"
            :key="article.id">
          <th scope="row" class="text-primary">{{ article.category }}</th>
          <td>{{ article.title }}</td>
          <td>
            <span class="text-success"
                  v-if="article.isPublic">
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
                        @click="openModal(false, article.id)">
                  編輯
                </button>
                <button class="btn btn-sm btn-secondary"
                        type="button"
                        @click="removeArticle(article)">
                  刪除
                </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <ArticleModal ref="articleModal"
                  :article="tempArticle"
                  @updateArticle="sendArticle"/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ArticleModal from '@/components/back/ModalArticle.vue';

export default {
  components: {
    ArticleModal,
  },
  data() {
    return {
      modal: {},
      article: {},
      tempArticle: {},
      isNew: false,
      searchText: '',
    };
  },
  computed: {
    ...mapState('adminArticles', [
      'articles',
    ]),
  },
  methods: {
    ...mapActions('adminArticles', [
      'getArticle',
      'getArticles',
      'updateArticle',
      'deleteArticle',
    ]),
    openModal(isNew, articleId) {
      if (isNew) {
        this.tempArticle = {};
      } else {
        this.$store.commit('CHANGE_LOADING', true);
        this.getArticle({ id: articleId })
          .then((res) => {
            if (res.data.success) {
              this.tempArticle = { ...res.data.article };
            } else {
              this.$_swal(res.data.message, 'error');
            }
          })
          .catch((err) => {
            this.$_swal(err, 'error');
          })
          .finally(() => {
            this.$store.commit('CHANGE_LOADING', false);
          });
      }
      this.isNew = isNew;
      this.$refs.articleModal.showModal();
    },
    sendArticle(tempArticle) {
      this.updateArticle({
        tempArticle,
        isNew: this.isNew,
      })
        .then(() => {
          this.$refs.articleModal.hideModal();
        });
    },
    async removeArticle(article) {
      const res = await this.$_swalComfirm(`確定刪除 ${article.title} ?`);
      try {
        if (res.isConfirmed) this.deleteArticle({ id: article.id });
      } catch (err) {
        this.$_swal(err, 'error');
      }
    },
  },
  created() {
    this.getArticles();
  },
};
</script>
