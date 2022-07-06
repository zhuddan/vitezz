<script setup lang="ts">
  // import alias test
  import { useDicts } from '@/hooks/dict';
  import { Dict } from '@/hooks/dict/dict';
  import { removeToken } from '@/utils/cache';

  const router = useRouter();
  function logout() {
    removeToken();
    router.push('/redirect/');
  }
  const { sys_job_group, format, load } = useDicts(['sys_job_group'], {});
  var d = new Dict(['sys_job_status']);
</script>

<template>
  <div class="home">
    <p> {{ sys_job_group }} </p>
    <button @click="load()">dict.load</button>
    <div>-------------------</div>
    <p style="color: blue">
      {{ format('sys_job_group', 'DEFAULT') }}
    </p>

    <div>
      <button @click="logout">logout</button>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
