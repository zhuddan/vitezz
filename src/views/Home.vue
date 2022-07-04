<script setup lang="ts">
  // import alias test
  import HelloWorld from '@/components/HelloWorld.vue';
  import { useDicts } from '@/hooks/dict';
  import { useTestStore } from '@/store/modules/test';
  import { removeToken } from '@/utils/cache';
  const testStore = useTestStore();
  const testCount = computed(() => {
    return testStore.count;
  });
  const router = useRouter();
  function logout() {
    removeToken();
    router.push('/redirect/');
  }
  const { dicts } = useDicts(['sys_job_group']);
</script>

<template>
  <div class="home">
    {{ dicts.sys_job_group }}
    <router-link to="/about">404 页面 测试</router-link>
    ---Home.vue---
    <div class="box">
      <button @click="testStore.increase"> increase </button>
      {{ testCount }}
      <button @click="testStore.decrease"> decrease </button>
    </div>
    <button @click="logout"> logout </button>
    <HelloWorld msg="beautiful world" />
  </div>
</template>

<style lang="scss" scoped>
  .home {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    .box {
      width: 200px;
      display: flex;
      justify-content: space-between;
      margin: 10px auto;
      align-items: center;
    }
    button {
      font-size: 18px;
      cursor: pointer;
    }
  }
</style>
