<script setup lang="ts">
  import { useAppConfig } from '@/hooks/config/useAppConfig';

  const { VITE_APP_TITLE } = useAppConfig();
</script>

<template>
  <router-link class="app-logo" to="/">
    <img src="@/assets/logo.png" alt="" />
    <span>{{ VITE_APP_TITLE }}</span>
  </router-link>
</template>

<style scoped lang="scss">
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

    &:hover {
      animation: pulse 0.3s forwards;
    }
  }
</style>
