<script setup lang="ts">
  import a from '@/assets/images/a.jpg';
  import b from '@/assets/images/b.jpg';
  import c from '@/assets/images/c.jpg';
  const route = useRoute();
  const imgs = computed(() => ({ a, b, c }[route.params.id as string]));
</script>

<template>
  <img :src="imgs" alt="" />
</template>

<style scoped>
  img {
    width: 100%;
    object-fit: cover;
    max-height: 500px;
    display: block;
  }
</style>
