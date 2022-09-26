<script setup lang="ts">
  import { usePermissionStore } from '@/store/modules/permission';
  import { useAppStore } from '@/store/modules/app';
  import SidebarItem from './SidebarItem.vue';
  defineOptions({
    name: 'LayoutSlider',
  });
  const permissionStore = usePermissionStore();
  const routes = computed(() => permissionStore.routes);
  const appStore = useAppStore();
  const collapse = computed(() => appStore.collapse);
  function handleLockScroll() {
    const body = document.body;
    if (collapse.value) {
      body.style['overflow-y'] = '';
    } else {
      body.style['overflow-y'] = 'hidden';
    }
  }
  watchEffect(handleLockScroll);
</script>

<template>
  <nav :class="{ collapse }">
    <div class="mask"></div>
    <aside>
      <SidebarItem :nav="routes"> </SidebarItem>
    </aside>
  </nav>
</template>

<style scoped lang="scss">
  aside {
    width: 200px;
    position: -webkit-sticky;
    position: sticky;
    top: 90px;
    display: flex;
    max-height: calc(100vh - 90px);
    overflow: auto;
    box-sizing: border-box;
    padding: 20px 0;
    flex-direction: column;
    background-color: white;
  }

  .mask {
    display: none;
    position: fixed;
    background-color: rgba(0, 0, 0, 0.3);
    left: 0;
    right: 0;
    height: calc(100vh - 90px);
  }
  @media screen and (max-width: 769px) {
    aside {
      position: fixed;
      transition: transform 0.3s;
      height: 100%;
      padding: 20px 20px;
      left: 0;
    }

    .mask {
      display: block;
    }

    .collapse {
      aside {
        transform: translateX(calc(-100% - 20px));
      }

      .mask {
        display: none;
      }
    }
  }
</style>
