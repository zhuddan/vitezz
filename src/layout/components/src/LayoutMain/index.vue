<script setup lang="ts">
  import { BackTop } from '@/components/BackTop';
  import LayoutSlider from '../LayoutSlider/index.vue';
  defineOptions({
    name: 'LayoutMain',
  });
</script>

<template>
  <section>
    <LayoutSlider></LayoutSlider>
    <BackTop />
    <main>
      <router-view></router-view>
    </main>
  </section>
</template>

<style scoped>
  section {
    flex: 1;
    display: flex;
    padding: 0 20px;
  }

  main {
    flex: 1;
  }
</style>
