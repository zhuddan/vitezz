<script setup lang="ts">
  import { usePermissionStore } from '@/store/modules/permission';
  const permissionStore = usePermissionStore();

  const list = computed(() => permissionStore.routes);
</script>

<template>
  <div class="container app-container">
    <ul>
      <li v-for="(item, index) in list" :key="index">
        <router-link :to="item.path">
          <span class="content">{{ item.path }}</span>
          <Icon icon="ant-design:arrow-right-outlined"
        /></router-link>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }

  li {
    width: 49%;
    box-sizing: border-box;
    margin-bottom: 10px;
    padding: 15px 10px;
    border-radius: 4px;
    border: 1px solid #ebeef5;

    &:hover {
      box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
      border-color: var(--color-primary);

      a {
        color: var(--color-primary);

        .content {
          flex: 1;
        }
      }
    }

    a {
      align-items: center;
      display: flex;

      .content {
        transition: all 0.3s;
      }
    }
  }
</style>
