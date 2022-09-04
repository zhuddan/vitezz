<script setup lang="ts">
  import { useAppConfig } from '@/hooks/config/useAppConfig';
  import { useUserStore } from '@/store/modules/user';

  defineOptions({
    name: 'Layout',
  });

  const userStore = useUserStore();
  const isLogin = computed(() => !!userStore.user);
  const userName = computed(() => userStore.user?.userName);
  const router = useRouter();
  const { VITE_APP_TITLE } = useAppConfig();

  async function handleLogout() {
    await userStore.logout();
    router.replace('/redirect/');
  }
</script>

<template>
  <section class="app-layout">
    <header>
      <div class="container">
        <a class="app-logo">
          <img src="@/assets/logo.png" alt="" />
          <span>{{ VITE_APP_TITLE }}</span>
        </a>
        <div v-if="isLogin" class="user-info">
          <span>{{ userName }}</span>
          <button @click="handleLogout">退出登录</button>
        </div>
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
      box-shadow: 0 1px 6px 0 rgb(32 33 36 / 28%);

      .container {
        height: 60px;
        align-items: center;
        display: flex;
        justify-content: space-between;
      }

      .app-logo {
        display: flex;
        align-items: center;

        img {
          display: inline-block;
          height: 50px;
        }

        span {
          line-height: 60px;
          display: none;
          color: var(--color-primary);
          @media screen and (min-width: 900px) {
            display: inline-block;
          }
        }
      }

      .user-info {
        color: var(--color-primary);

        button {
          margin-left: 10px;
        }
      }
    }

    main {
      flex: 1;
      padding: 10px;
      overflow: hidden;
    }

    footer {
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
