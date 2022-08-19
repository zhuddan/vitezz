<script setup lang="ts">
  import Image from '@/components/Image.vue';
  import { useDicts } from '@/hooks/dict';
  import { useUserStore } from '@/store/modules/user';
  import { removeToken } from '@/utils/cache';
  const userStore = useUserStore();

  const router = useRouter();
  function logout() {
    userStore.logout();
    router.push('/redirect/');
  }
  const { product_type, format, load } = useDicts(['product_type'], {});
</script>

<template>
  <div class="home">
    <div>
      <p>{{ userStore.info?.userName }}</p>
      <button @click="logout">logout</button>
    </div>
    <p> {{ product_type }} </p>
    <button @click="load()">dict.load</button>
    <router-link to="/list">list</router-link>
    <div>-------------------</div>
    <p style="color: blue">
      {{ format('product_type', 'DEFAULT') }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
  p {
    color: red;
  }
</style>
