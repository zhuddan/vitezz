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
    padding: 20px 0 20px 20px;
  }
  @media screen and (max-width: 769px) {
    #content {
      padding-left: 0;
    }
  }
</style>
