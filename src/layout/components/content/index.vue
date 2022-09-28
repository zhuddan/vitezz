<script setup lang="ts">
  import { BackTop } from '@/components/BackTop';
  import Sidebar from '../sidebar/index.vue';
  defineOptions({
    name: 'LayoutContent',
  });
</script>

<template>
  <div class="content-wrapper">
    <Sidebar></Sidebar>
    <main id="content">
      <router-view></router-view>
    </main>
    <BackTop />
  </div>
</template>

<style scoped>
  .content-wrapper {
    flex: 1;
    display: flex;
    padding: 0 20px;
  }

  #content {
    flex: 1;
  }
</style>
