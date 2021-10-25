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
                    `url(${require(`@/assets/images/index/${item.imageUrl}`)})` }">
        <h2 class="text-primary mb-6 display-3">{{ item.title }}</h2>
        <router-link to="item.link"
                     class="btn btn-lg btn-primary">
          查看外送店家
        </router-link>
      </swiper-slide>
    </swiper>
</template>

<script>
export default {
  data() {
    return {
      swiperData: [
        {
          title: '美食外送 交給我們',
          imageUrl: 'jumbotron1.png',
          linkUrl: '/',
        },
        {
          title: '日式料理',
          imageUrl: 'jumbotron2.png',
          linkUrl: '/',
        },
        {
          title: '異國美食',
          imageUrl: 'jumbotron3.png',
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
