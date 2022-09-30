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

<style scoped lang="scss">
  @import '@/style/var.scss';

  .content-wrapper {
    flex: 1;
    display: flex;
    padding: 0 var(--app-content-padding);
  }

  #content {
    flex: 1;
    padding: var(--app-content-padding) 0 var(--app-content-padding) var(--app-content-padding);
  }
  @media screen and (max-width: $screen-md) {
    #content {
      padding-left: 0;
    }
  }
</style>
