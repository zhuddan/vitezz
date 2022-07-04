<script setup lang="ts">
  import { setToken } from '@/utils/cache';
  import { getCodeImg } from '@/api/login';
  const router = useRouter();
  const username = ref('admin');
  const password = ref('admin123');
  const code = ref('');
  const uuid = ref('');
  const codeUrl = ref('');

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
  getCodeImg().then((res) => {
    codeUrl.value = 'data:image/gif;base64,' + res.img;
    uuid.value = res.uuid;
  });
</script>

<template>
  <div style="overflow: hidden">
    <div class="login">
      <img :src="codeUrl" alt="" />
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
