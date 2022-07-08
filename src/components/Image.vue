<script setup lang="ts">
  import { useDateFormat, useImage, useNow } from '@vueuse/core';

  const props = defineProps<{
    src: string;
  }>();

  const isError = ref(false);

  watch(
    () => props.src,
    () => {
      isError.value = false;
    },
  );
  const data = useImage(
    { src: props.src },
    {
      onError: (e) => {
        isError.value = true;
      },
    },
  );
  const { isLoading, error, state } = data;
  data.execute(200, () => {
    console.log();
  });

  const d = useDateFormat(useNow({}), 'YYYY-MM-DD HH:mm:ss d');
</script>

<template>
  {{ d }}
  <span v-if="isLoading">Loading</span>
  <span v-else-if="isError">isError</span>
  <img v-else :src="src" />
</template>

<style scoped></style>
