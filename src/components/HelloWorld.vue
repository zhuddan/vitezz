<script setup lang="ts">
  defineProps({
    type: {
      type: String as PropType<'a' | 'b'>,
      required: true,
    },
  });
  function open() {
    console.log('open');
  }
  defineExpose({
    open,
  });
</script>

<template>
  <div> </div>
</template>

<style scoped></style>
