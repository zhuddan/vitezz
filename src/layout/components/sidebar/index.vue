<script setup lang="ts">
  import { usePermissionStore } from '@/store/modules/permission';
  import { useAppStore } from '@/store/modules/app';
  import SidebarItem from './SidebarItem.vue';
  import type { RouteRecordRaw } from 'vue-router';
  defineOptions({
    name: 'Sidebar',
  });
  const permissionStore = usePermissionStore();
  const appStore = useAppStore();
  const routes = computed(() => permissionStore.routes);
  const collapse = computed(() => appStore.collapse);
  const classList = ref('');
  let t: Nullable<TimeoutHandle> = null;
  function handleLockScroll() {
    if (t) return;
    const body = document.body;
    console.log(collapse);
    if (collapse.value) {
      body.classList.add('mobile_overflow_y');
      classList.value = 'is-animating';
      t = setTimeout(() => {
        clearTimeout(t!);
        t = null;
        classList.value = 'collapse';
      }, 300);
    } else {
      body.classList.remove('mobile_overflow_y');
      classList.value = '';
    }
  }
  function select(e: RouteRecordRaw) {
    appStore.toggleCollapse();
  }
  watch(collapse, handleLockScroll, { immediate: true });
</script>

<template>
  <aside id="aside-nav-wrapper" :class="classList">
    <button class="backdrop" @click="appStore.toggleCollapse"></button>
    <nav>
      <SidebarItem :nav="routes" @select="select"> </SidebarItem>
    </nav>
  </aside>
</template>

<style scoped lang="scss">
  $width: 200px;
  $height: calc(100vh - var(--app-header-hight) - var(--app-breadcrumbs-hight));
  @import '@/style/var.scss';

  #aside-nav-wrapper {
    font-size: var(--app-header);
    border-right: 1px solid #cdcdcd;
    width: $width;
    position: -webkit-sticky;
    position: sticky;
    top: 90px;
    max-height: $height;

    .backdrop {
      transition: opacity 0.3s ease;
      position: fixed;
      background-color: rgba(0, 0, 0, 0.2);
      left: 0;
      right: 0;
      height: $height;
      opacity: 0;
      transform: translateX(-100%);
      display: none;
      border: 0;
    }

    nav {
      display: flex;
      overflow: auto;
      box-sizing: border-box;
      flex-direction: column;
      max-height: $height;
      position: relative;
      transform: translateX(0);
      padding: 10px;
      padding-left: 0;
      width: $width;
    }
  }
  /* stylelint-disable-next-line order/order */
  @media screen and (max-width: $screen-md) {
    #aside-nav-wrapper {
      border: none !important;
      position: fixed;
      left: 0;
      right: 0;
      width: 100%;
      height: $height;

      .backdrop {
        opacity: 1;
      }

      nav {
        height: 100%;
        left: 0;
        width: calc($width + 20px);
        background: #fff;
        transform: translateX(0);
        transition: transform 0.3s ease;
        padding-left: 20px;
      }

      &.collapse {
        transform: translateX(-100%);

        nav {
          transform: translateX(-100%);
        }
      }

      &:not(.collapse) {
        .backdrop {
          transform: translateX(0);
        }
      }

      &.is-animating {
        nav {
          transform: translateX(-100%);
        }

        .backdrop {
          opacity: 0;
        }
      }
    }
  }
</style>
