<script setup lang="ts">
  import { AppLogo } from '@/components/Application/';
  import { useUserStore } from '@/store/modules/user';
  import { useWindowScroll } from '@vueuse/core';
  defineOptions({
    name: 'LayoutHeader',
  });
  const userStore = useUserStore();
  const isLogin = computed(() => !!userStore.user);
  const userName = computed(() => userStore.user?.userName);
  const { y } = useWindowScroll();
  const isFixed = computed(() => y.value > 61);
  const router = useRouter();

  async function handleLogout() {
    await userStore.logout();
    router.replace('/redirect/');
  }
</script>

<template>
  <header
    class="layout-header"
    :class="{
      is_fixed: isFixed,
      animate__animated: isFixed,
      animate__slideInDown: isFixed,
    }"
  >
    <div class="container">
      <AppLogo />
      <div v-if="isLogin" class="user-info">
        <span>{{ userName }}</span>
        <button class="btn-primary" @click="handleLogout">退出登录</button>
      </div>
    </div>
  </header>
  <div v-if="isFixed" class="layout-header-tool"></div>
</template>

<style scoped lang="scss">
  @keyframes scrollTop {
    from {
      top: -60px;
    }

    to {
      top: 0;
    }
  }

  .layout-header-tool {
    height: 60px;
  }

  .layout-header {
    border-bottom: 1px solid #ebebeb;
    background: white;
    height: 60px;

    &.is_fixed {
      position: fixed;
      box-shadow: 0 1px 6px 0 rgb(32 33 36 / 28%);
      border-bottom: 0;
      animation-duration: 0.3s;
      top: 0;
      left: 0;
      right: 0;
    }
  }

  .container {
    height: 60px;
    align-items: center;
    display: flex;
    justify-content: space-between;
  }

  .user-info {
    color: var(--color-primary);

    button {
      margin-left: 10px;
    }
  }
</style>
