<script setup lang="ts">
  import { setToken } from '@/utils/cache';
  const router = useRouter();
  const username = ref('');
  function handleLogin() {
    if (!username.value) {
      alert('username is required');
      return;
    }
    setToken(
      'eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6Ijc2YTgzNDA1LTY0MTMtNDA2NS1hNGEzLWUyNmM3NGNlOTY4YyJ9.BEkfOsVFWx-Nvb27BLT1_gFzQrkE9FPECbubCPo-K9H0RA0OYQCoZJDGxS5WpmWsYU_ezfVrgefh4wie6X4yoA',
    );
    router.push('/');
  }
</script>

<template>
  <div style="overflow: hidden">
    <div class="login">
      <label for="username">username</label>
      <input id="username" v-model="username" type="text" />
      <button @click="handleLogin">login</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .login {
    margin: 200px auto 0;
    width: 200px;
  }
</style>
