<script setup lang="ts">
  import { useTestStore } from '@/store/modules/test';
  const testStore = useTestStore();
  const testCount = computed(() => {
    return testStore.count;
  });
</script>

<template>
  ---About.vue---
  {{ testCount }}
</template>
