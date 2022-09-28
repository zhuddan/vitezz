<script setup lang="ts">
  import { usePermissionStore } from '@/store/modules/permission';
  import { useAppStore } from '@/store/modules/app';
  import SidebarItem from './SidebarItem.vue';
  defineOptions({
    name: 'Sidebar',
  });
  const permissionStore = usePermissionStore();
  const routes = computed(() => permissionStore.routes);
  const appStore = useAppStore();
  const collapse = computed(() => appStore.collapse);

  const classList = ref('');
  function handleLockScroll() {
    const body = document.body;
    if (collapse.value) {
      body.classList.add('mobile_overflow_y');
      classList.value = '';
    } else {
      body.classList.remove('mobile_overflow_y');
      classList.value = 'is-animating';
      setTimeout(() => {
        classList.value = 'collapse';
      }, 300);
    }
  }
  watchEffect(handleLockScroll);
</script>

<template>
  <aside id="aside-nav-wrapper" :class="classList">
    <button class="backdrop" @click="appStore.toggleCollapse"></button>
    <nav>
      <SidebarItem :nav="routes"> </SidebarItem>
    </nav>
  </aside>
</template>

<style scoped lang="scss">
  #aside-nav-wrapper {
    border-right: 1px solid #cdcdcd;
    width: 200px;
    position: -webkit-sticky;
    position: sticky;
    top: 90px;
    height: calc(100vh - 90px);

    .backdrop {
      transition: opacity 0.3s ease;
      position: fixed;
      background-color: rgba(0, 0, 0, 0.2);
      left: 0;
      right: 0;
      height: calc(100vh - 90px);
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
      max-height: calc(100vh - 90px);
      position: relative;
      transform: translateX(0);
      padding: 10px;
      padding-left: 0;
      width: 200px;
    }
  }

  @media screen and (max-width: 769px) {
    #aside-nav-wrapper {
      border: none;
      position: fixed;
      left: 0;
      right: 0;
      width: 100%;
      height: calc(100vh - 90px);

      .backdrop {
        opacity: 1;
      }

      nav {
        height: 100%;
        left: 0;
        width: 220px;
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
          display: block;
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
