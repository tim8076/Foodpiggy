<template>
   <div class="position-relative">
     <div class="position-absolute top-0 start-0 end-0
                 top-md-10 start-md-0 end-md-0 w-100 w-md-50 mx-auto
                 p-4 bg-white z-index-1000 rounded-md-3">
        <div class="input-group">
          <input type="text"
                 class="form-control border-0 bg-gray"
                 v-model="filter"
                 @keyup.enter="setFilter(filter)"
                 placeholder="搜尋想吃的餐廳或料理">
          <button class="btn btn-secondary border-end"
                  type="button"
                  @click="toggleFilter">
            <i class="fas fa-filter"></i>
          </button>
          <button class="btn btn-secondary"
                  type="button"
                  @click="setFilter(filter)">
            <i class="fas fa-search"></i>
          </button>
        </div>
        <div v-show="showFilter"
             class="mt-3">
          <h4 class="mb-3">熱門搜尋</h4>
          <ul class="d-flex flex-wrap mb-3">
            <li class="shadow-sm rounded-3 me-3 mb-3"
                v-for="word in topSearched"
                :key="word">
              <a href="#"
                 class="d-block text-primary py-1 px-3"
                 @click.prevent="setFilter(word)">
                {{ word }}
              </a>
            </li>
          </ul>
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
            <router-link :to="item.linkUrl"
                         class="stretched-link"/>
            <h2 class="text-primary h1 p-2 bg-secondary rounded-1">{{ item.title }}</h2>
        </swiper-slide>
      </swiper>
   </div>
</template>

<script>
export default {
  data() {
    return {
      showFilter: false,
      filter: '',
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
          linkUrl: '/index/category/台式料理',
        },
        {
          title: '日式料理',
          imageUrl: 'jumbotron2.png',
          linkUrl: '/index/category/日式料理',
        },
        {
          title: '美式料理',
          imageUrl: 'jumbotron3.png',
          linkUrl: '/index/category/美式料理',
        },
      ],
      swiperPagination: {
        clickable: true,
      },
    };
  },
  methods: {
    toggleFilter() {
      this.showFilter = !this.showFilter;
    },
    setFilter(word) {
      this.filter = word;
      if (!this.filter) return;
      this.$router.push(`/index/category/${this.filter}`);
    },
  },
};
</script>
