<template>
  <div class="position-relative">
    <div class="position-absolute top-0 start-0 end-0
                top-md-10 start-md-0 end-md-0 w-100 w-md-50 mx-auto
                p-4 bg-white z-index-1000 rounded-md-3">
      <div class="input-group">
        <button class="btn btn-gray"
                type="button"
                @click="toggleTopSearch">
          <i class="fas fa-search"></i>
        </button>
        <input type="text"
                class="form-control border-0 bg-gray"
                v-model="searchText"
                @keyup.enter="setQuery"
                @focus="toggleTopSearch"
                placeholder="搜尋想吃的餐廳或料理">
        <button class="btn btn-secondary border-end"
                type="button"
                @click="toggleFilter">
          <i class="fas fa-filter"></i>
        </button>
      </div>
      <div v-show="showTopSearch"
           class="mt-3">
        <h4 class="mb-3">熱門搜尋</h4>
        <ul class="d-flex flex-wrap mb-3">
          <li class="shadow-sm rounded-3 me-3 mb-3"
              v-for="word in topSearched"
              :key="word">
            <a href="#"
               class="d-block text-primary py-1 px-3"
               @click.prevent="setSearchText(word)">
              {{ word }}
            </a>
          </li>
        </ul>
      </div>
      <div v-show="showFilter"
           class="mt-3">
        <div class="container-fluid">
          <h4 class="fs-6 mb-3">料理</h4>
          <ul class="row gx-0">
            <li class="col-4 mb-3"
                v-for="(type, index) in category"
                :key="type">
              <div class="form-check">
                <input class="form-check-input"
                        :id="`type${index}`"
                        type="checkbox"
                        :value="type"
                        v-model="filters">
                <label class="form-check-label"
                       :for="`type${index}`">
                  {{ type }}
                </label>
              </div>
            </li>
          </ul>
          <ul class="row mb-6">
            <h4 class="fs-6 mb-3">預算</h4>
            <li v-for="(budget) in budgets"
                :key="budget"
                class="col-4">
              <button class="btn btn-outline-primary w-100"
                      @click.prevent="setBudget(budget), setButton($event)">
                {{ budget }}
              </button>
            </li>
          </ul>
          <button class="btn btn-primary w-100"
                  type="button"
                  @click.prevent="setQuery">
            送出查詢
          </button>
        </div>
      </div>
    </div>
    <swiper :pagination="swiperPagination"
            :autoplay="{
                delay: 3000,
                disableOnInteraction: false,
            }"
            class="mySwiper jumbotronSwiper">
      <swiper-slide class="bg-cover d-flex flex-column
                           justify-content-center align-items-center"
                    v-for="item in swiperData"
                    :key="item.title"
                    :style="{ backgroundImage:
                    `url(${require(`@/assets/images/index/${item.imageUrl}`)})` }">
        <router-link :to="{ name: 'indexCategory',
                            query: { search: item.query } }"
                      class="stretched-link"/>
        <h2 class="text-primary h1 p-2 bg-secondary rounded-1">{{ item.title }}</h2>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
export default {
  props: {
    category: {
      type: Array,
      default: () => [],
      required: true,
    },
    budgets: {
      type: Array,
      default: () => [],
      required: true,
    },
  },
  data() {
    return {
      showTopSearch: false,
      showFilter: false,
      searchText: '',
      filters: [],
      budget: '',
      topSearched: [
        '台式料理',
        '甜點',
        '日式',
        '便當',
        '漢堡',
        '壽司',
        '拉麵',
      ],
      swiperData: [
        {
          title: '美食外送 交給我們',
          imageUrl: 'jumbotron1.png',
          query: '台式料理',
        },
        {
          title: '日式料理',
          imageUrl: 'jumbotron2.png',
          query: '日式料理',
        },
        {
          title: '美式料理',
          imageUrl: 'jumbotron3.png',
          query: '美式料理',
        },
      ],
      swiperPagination: {
        clickable: true,
      },
    };
  },
  methods: {
    toggleTopSearch() {
      this.showFilter = false;
      this.showTopSearch = !this.showTopSearch;
    },
    toggleFilter() {
      this.showTopSearch = false;
      this.showFilter = !this.showFilter;
    },
    setBudget(money) {
      this.budget = money;
    },
    setButton(event) {
      event.target.classList.toggle('btn-primary');
    },
    setSearchText(keyword) {
      this.searchText = keyword;
      this.setQuery();
    },
    setQuery() {
      // 如果有搜尋文字，就清空篩選條件
      if (this.searchText) {
        this.budget = '';
        this.filters = [];
      }
      this.$router.push({
        name: 'indexCategory',
        query: {
          search: this.searchText,
          budget: this.budget,
          filters: JSON.stringify(this.filters),
        },
      });
    },
  },
};
</script>
