<template>
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
                    `url(${require('@/assets/images/index/jumbotron1.png')})` }">
        <h2 class="text-primary mb-6 display-3">{{ item.title }}</h2>
        <router-link to="item.link"
                     class="btn btn-lg btn-primary">
          查看外送店家
        </router-link>
      </swiper-slide>
      <!-- <swiper-slide class="bg-cover d-flex flex-column
                           justify-content-center align-items-center"
                    :style="{ backgroundImage:
                    `url( ${require('@/assets/images/index/jumbotron2.png')})`}">
        <h2 class="text-primary mb-6 display-3">日本職人料理</h2>
        <router-link to="/" class="btn btn-lg btn-primary">查看外送店家</router-link>
      </swiper-slide>
      <swiper-slide class="bg-cover d-flex flex-column
                           justify-content-center align-items-center"
                    :style="{ backgroundImage:
                    `url( ${require('@/assets/images/index/jumbotron3.png')})`}">
        <h2 class="text-primary mb-6 display-3">異國美式料理</h2>
        <router-link to="/" class="btn btn-lg btn-primary">查看外送店家</router-link>
      </swiper-slide> -->
    </swiper>
</template>

<script>
export default {
  data() {
    return {
      swiperData: [
        {
          title: '美食外送 交給我們',
          imageUrl: '@/assets/images/index/jumbotron1.png',
          linkUrl: '/',
        },
        {
          title: '美食外送 交給我們',
          imageUrl: '@/assets/images/index/jumbotron1.png',
          linkUrl: '/',
        },
        {
          title: '美食外送 交給我們',
          imageUrl: '@/assets/images/index/jumbotron1.png',
          linkUrl: '/',
        },
      ],
      swiperPagination: {
        clickable: true,
      },
    };
  },
};
</script>
