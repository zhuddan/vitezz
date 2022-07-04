<script setup lang="ts">
  import { setToken } from '@/utils/cache';
  import { getCodeImg, login } from '@/api/login';
  const router = useRouter();
  const username = ref('csgr222');
  const password = ref('123456');
  const code = ref('');
  const uuid = ref('');
  const codeUrl = ref('');

  function handleLogin() {
    login(username.value, password.value, code.value, uuid.value).then((res) => {
      console.log(res);
      setToken(res.token);
      router.push('/');
    });
  }
  getCodeImg().then((res) => {
    codeUrl.value = 'data:image/gif;base64,' + res.img;
    uuid.value = res.uuid;
  });
</script>

<template>
  <div style="overflow: hidden">
    <div class="login">
      <div>
        <img :src="codeUrl" alt="" />
        <input id="code" v-model="code" type="text" />
      </div>
      <input id="username" v-model="username" type="text" />
      <input id="password" v-model="password" type="text" />
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
