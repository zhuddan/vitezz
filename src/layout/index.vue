<script setup lang="ts">
  import { useAppConfig } from '@/hooks/config/useAppConfig';
  import { useUserStore } from '@/store/modules/user';
  import Logo from './Logo.vue';

  const { VITE_APP_TITLE } = useAppConfig();
  const userStore = useUserStore();
  defineOptions({
    name: 'Layout',
  });

  const isLogin = computed(() => !!userStore.user);
  const userName = computed(() => userStore.user?.userName);
  const router = useRouter();
  async function handleLogout() {
    await userStore.logout();
    router.replace('/redirect/');
  }
</script>

<template>
  <section class="app-layout">
    <header>
      <a class="app-logo">
        <Logo />
      </a>
      <div v-if="isLogin" class="user-info">
        <span>{{ userName }}</span>
        <button @click="handleLogout">退出登录</button>
      </div>
    </header>
    <main>
      <router-view></router-view>
    </main>
    <footer>copyright © ???</footer>
  </section>
</template>

<style lang="scss" scoped>
  .app-layout {
    display: flex;
    flex-direction: column;
    min-height: 100%;
    header {
      height: 60px;
      line-height: 60px;
      box-shadow: 0 1px 6px 0 rgb(32 33 36 / 28%);
      padding: 0 40px;
      .app-logo {
        display: inline-block;
      }
      .user-info {
        float: right;
        color: var(--color-primary);
        button {
          margin-left: 10px;
        }
      }
    }
    main {
      flex: 1;
    }
    footer {
      height: 60px;
      background: #f2f2f2;
      color: #70757a;
      text-align: center;
      font-size: 12px;
      height: 40px;
      line-height: 40px;
      left: 0;
      width: 100%;
      bottom: 0;
    }
  }
</style>
