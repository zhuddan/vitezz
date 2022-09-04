<script setup lang="ts">
  import { BackTop } from '@/components/BackTop';
  defineOptions({
    name: 'LayoutMain',
  });
</script>

<template>
  <main>
    <BackTop />
    <router-view></router-view>
  </main>
</template>

<style scoped>
  main {
    flex: 1;
    overflow: hidden;
  }
</style>
