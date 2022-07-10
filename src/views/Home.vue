<script setup lang="ts">
  import { useDicts } from '@/hooks/dict';
  import { useUserStore } from '@/store/modules/user';
  import { removeToken } from '@/utils/cache';
  import Image from '@/components/Image.vue';
  const userStore = useUserStore();

  const router = useRouter();
  function logout() {
    userStore.logout();
    router.push('/redirect/');
  }
  const { sys_job_group, format, load } = useDicts(['sys_job_group'], {});
</script>

<template>
  <div class="home">
    <div>
      <p>{{ userStore.info?.userName }}</p>
      <button @click="logout">logout</button>
    </div>
    <p> {{ sys_job_group }} </p>
    <button @click="load()">dict.load</button>
    <router-link to="/list">list</router-link>
    <div>-------------------</div>
    <p style="color: blue">
      {{ format('sys_job_group', 'DEFAULT') }}
    </p>
  </div>
</template>

<style lang="scss" scoped></style>
