<template>
<nav aria-label="Page navigation example">
  <ul class="pagination justify-content-center">
    <li class="page-item"
        :class="{ disabled : !pages.has_pre }">
      <a class="page-link"
         href="#"
         aria-label="Previous"
         @click.prevent="updatePage(pages.current_page - 1)">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <template v-if="pages.total_pages < 5">
      <li class="page-item"
          v-for="page in pages.total_pages"
          :key="page"
          @click.prevent="updatePage(page)"
          :class= "{ active : page === pages.current_page }">
        <a class="page-link" href="#">
          {{ page }}
        </a>
      </li>
    </template>
    <template v-else>
      <li class="page-item"
          v-for="page in prevsPages"
          :key="page"
          @click.prevent="updatePage(page)"
          :class= "{ active : page === pages.current_page }">
        <a class="page-link" href="#">
          {{ page }}
        </a>
      </li>
    </template>
    <li class="page-item"
        :class="{ disabled : !pages.has_next }">
      <a class="page-link"
         href="#"
         aria-label="Next"
         @click.prevent="updatePage(pages.current_page + 1)">
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
  computed: {
    prevsPages() {
      const pages = [];
      const total = this.pages.total_pages;
      const current = this.pages.current_page;
      for (let i = current; i <= total && i < current + 3; i += 1) {
        pages.push(i);
      }
      return pages;
    },
  },
  methods: {
    updatePage(page) {
      this.$emit('emitPage', page);
    },
  },
};
</script>
