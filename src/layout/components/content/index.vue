<script setup lang="ts">
  import { BackTop } from '@/components/BackTop';
  import Sidebar from '../sidebar/index.vue';
  defineOptions({
    name: 'LayoutContent',
  });
</script>

<template>
  <div class="content-wrapper">
    <Sidebar />
    <main id="content">
      <router-view />
    </main>
    <BackTop />
  </div>
</template>

<style scoped lang="scss">
  @import '@/style/var.scss';

  .content-wrapper {
    --app-content-inner-height: calc(var(--app-content-height) - var(--app-content-padding) * 2);
    flex: 1;
    display: flex;
    padding: 0 var(--app-content-padding);
  }

  #content {
    flex: 1;
    padding: var(--app-content-padding) 0;
    overflow-x: hidden;
    background-color: aqua;
  }

  #aside-nav-wrapper + #content {
    padding: var(--app-content-padding) 0 var(--app-content-padding) var(--app-content-padding);
  }

  @media screen and (max-width: $screen-md) {
    #aside-nav-wrapper + #content {
      padding-left: 0;
    }
  }
</style>
