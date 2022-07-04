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
      'Bearer eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6IjYxYjdkNDU3LTlhZmQtNDI1ZC1iNGYxLTI3OWNiYjA5NGM2MiJ9.9udQpXYPrYSj_ks1UNF5_d4Olu_WlFeesvNTd1uSFrss2jbe75QUNxuAPkVKb-kif5AZwSpaF63WNAAPYMMgxA',
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
