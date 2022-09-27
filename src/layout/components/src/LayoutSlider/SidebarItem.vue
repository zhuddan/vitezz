<script setup lang="ts">
  import path from 'path-browserify';
  import type { RouteRecordRaw } from 'vue-router';

  const props = defineProps({
    nav: {
      type: Array as PropType<RouteRecordRaw[]>,
      default: () => [],
    },
    parentPath: {
      type: String,
      default: '',
    },
  });

  const getPath = (currentPath: string) => {
    const _parentPath = props.parentPath.startsWith('/') ? props.parentPath : '/' + props.parentPath;
    return path.join(_parentPath, currentPath);
  };
</script>

<template>
  <ol>
    <li v-for="(item, index) in nav" :key="index">
      <template v-if="item.children?.length">
        <details open>
          <summary>
            <strong>{{ item.name }}</strong></summary
          >
          <SidebarItem :nav="item.children" :parent-path="getPath(item.path)" />
        </details>
      </template>
      <span v-else class="title">
        <router-link :to="getPath(item.path)">{{ item.name }}</router-link>
      </span>
    </li>
  </ol>
</template>

<style lang="scss" scoped>
  ol,
  li {
    list-style: none;
    padding: 0;
    color: #4e4e4e;
    font-size: 0.833rem;
    margin: 0;
  }

  li {
    line-height: 24px;

    &:hover {
      cursor: pointer;
    }
  }

  details {
    ol {
      padding-left: 12px;
    }
  }

  .title {
    &:hover {
      color: var(--color-primary);
    }
  }
</style>
