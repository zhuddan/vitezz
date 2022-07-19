<script setup lang="ts">
  import { getCodeImg } from '@/api/login';
  import { useUserStore } from '@/store/modules/user';
  import Image from '@/components/Image.vue';
  import { IconPicker } from '@/components/Icon';

  const router = useRouter();
  const username = ref('csgr222');
  const password = ref('123456');
  const code = ref('');
  const uuid = ref('');
  const codeUrl = ref('');

  const userStore = useUserStore();

  function handleLogin() {
    userStore.login(username.value, password.value, code.value, uuid.value).then(() => {
      router.push('/');
    });
  }
  function getCode() {
    getCodeImg().then((res) => {
      codeUrl.value = 'data:image/gif;base64,' + res.img;
      uuid.value = res.uuid;
    });
  }

  getCode();

  const d = computed(() => {});
</script>

<template>
  <div>
    <IconPicker />
  </div>
  <div style="overflow: hidden">
    <div class="login">
      <router-link to="/about/aaa/aaa">about</router-link>
      <div>
        <Image :src="codeUrl" style="width: 100px; height: 30px" object-fit="fill" @click="getCode"> </Image>
        <input id="code" v-model="code" type="text" @keydown.enter="handleLogin" />
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

    a {
      color: red;
    }
  }
</style>
