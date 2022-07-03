<script setup lang="ts">
  import { setToken } from '@/utils/cache';
  const router = useRouter();
  const username = ref('');
  function handleLogin() {
    if (!username.value) {
      alert('username is required');
      return;
    }
    setToken(Date.now() + username.value);
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
