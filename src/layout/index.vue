<script setup lang="ts">
  import { LayoutHeader, LayoutFooter, LayoutMain } from './components';

  defineOptions({
    name: 'Layout',
  });
</script>

<template>
  <section class="layout">
    <LayoutHeader />
    <LayoutMain />
    <LayoutFooter />
  </section>
</template>

<style lang="scss" scoped>
  .layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
</style>
