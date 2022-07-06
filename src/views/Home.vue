<script setup lang="ts">
  // import alias test
  import HelloWorld from '@/components/HelloWorld.vue';
  import { useDicts } from '@/hooks/dict';
  import { Dict } from '@/hooks/dict/dict';
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
  const { dict, dicts, format } = useDicts(['sys_job_group', 'sys_job_status'], {});
  // const d = new Dict(['sys_job_group']);
</script>

<template>
  <div class="home">
    <p>
      {{ dicts }}
      <!-- {{ d.data.sys_job_group }} -->
    </p>
    <p>
      <!-- {{ d.format('sys_job_group', 'DEFAULT') }} -->
    </p>
    <!-- DEFAULT SYSTEM -->
    <p>
      {{ format('sys_job_group', 'DEFAULT') }}
    </p>
    <p>
      {{ format('sys_job_group', ['SYSTEM', 'DEFAULT'], { separator: '----' }) }}
    </p>
    <router-link to="/about">404 页面 测试</router-link>
    ---Home.vue---
    <h1>------------------</h1>
    <p>{{ dict.data }}</p>
    <div class="box">
      <button @click="testStore.increase"> increase </button>
      {{ testCount }}
      <button @click="testStore.decrease"> decrease </button>
    </div>
    <button @click="logout"> logout </button>
    <HelloWorld msg="beautiful world" />
  </div>
</template>

<style lang="scss" scoped></style>
