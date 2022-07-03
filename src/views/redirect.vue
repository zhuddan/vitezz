<script lang="ts" setup>
  const { params, query } = useRoute();
  const router = useRouter();
  const { path } = params;
  router.replace({ path: '/' + path, query });
</script>

<template>
  <div> </div>
</template>
