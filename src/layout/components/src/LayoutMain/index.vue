<script setup lang="ts">
  defineOptions({
    name: 'LayoutMain',
  });
</script>

<template>
  <main>
    <router-view></router-view>
  </main>
</template>

<style scoped>
  main {
    flex: 1;
    padding: 10px;
    overflow: hidden;
  }
</style>
