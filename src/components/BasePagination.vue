<template>
<nav aria-label="Page navigation example">
  <ul class="pagination justify-content-center">
    <li class="page-item"
        :class="{ disabled : !pages.has_pre }">
      <a class="page-link"
         href="#"
         aria-label="Previous"
         @click.prevent="updatePage(tempPage.current_page - 1)">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li class="page-item">
      <select class="form-select"
              @change="updatePage($event.target.value)"
              v-model="tempPage.current_page">
        <option v-for="page in tempPage.total_pages"
                :key="page"
                :value="page">{{ page }}
        </option>
      </select>
    </li>
    <li class="page-item"
        :class="{ disabled : !pages.has_next }">
      <a class="page-link"
         href="#"
         aria-label="Next"
         @click.prevent="updatePage(tempPage.current_page + 1)">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>
</template>

<script>
export default {
  props: {
    pages: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      tempPage: {},
    };
  },
  methods: {
    updatePage(page) {
      this.$emit('emitPage', page);
    },
  },
  watch: {
    pages: {
      immediate: true,
      handler() {
        this.tempPage = { ...this.pages };
      },
    },
  },
};
</script>
