<template>
  <div class="page-index">
    <TheHeader/>
    <router-view class="mt-20 min-height-128"/>
    <TheFooter/>
  </div>
</template>

<script>
import TheHeader from '@/components/front/TheHeader.vue';
import TheFooter from '@/components/front/TheFooter.vue';

export default {
  name: 'Home',
  components: {
    TheHeader,
    TheFooter,
  },
};
</script>
