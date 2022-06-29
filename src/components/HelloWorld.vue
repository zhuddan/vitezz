<script setup lang="ts">
import { useTestStore } from '@/store/modules/test';

defineProps<{ msg: string }>();
const count = ref(0);
const testStore = useTestStore();

const testCount = computed(()=>{
  return testStore.count;
});
</script>

<template>
  ---HelloWorld.vue---
  <h1>{{ msg }}</h1>
  test count is {{ testCount }}
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
