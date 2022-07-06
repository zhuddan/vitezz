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
  const { dicts, sys_job_status, sys_job_group } = useDicts(['sys_job_status', 'sys_job_group'], {});
</script>

<template>
  <div class="home">
    <p> {{ sys_job_status }} </p>
    <!-- <button @click="dict.load()">dict.load</button> -->
    <div>-------------------</div>
    <p style="color: blue">
      {{ dicts }}
    </p>

    <div>
      <button @click="logout">logout</button>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
