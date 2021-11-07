<template>
  <div class="card card__news
              bg-primary border rounded-3">
    <div class="card-body position-relative">
      <h4 class="card-title text-white">{{ article.title }}</h4>
      <h5 class="text-gray">{{ article.subTitle }}</h5>
      <img :src="article.image"
           class="newsImage position-absolute bottom-0 end-0">
    </div>
    <router-link :to="{ name: 'indexArticle',
                        params: { article: article.id } }"
                 class="stretched-link"/>
  </div>
</template>

<script>
export default {
  props: {
    article: Object,
    default: () => ({}),
  },
};
</script>
