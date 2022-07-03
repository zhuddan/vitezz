<script setup lang="ts">
  import { useTestStore } from '@/store/modules/test';
  const testStore = useTestStore();
  const testCount = computed(() => {
    return testStore.count;
  });
  document.getElementById;
</script>

<template>
  {{ testCount }}
  <router-link to="/">home</router-link>
</template>
