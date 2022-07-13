<script setup lang="ts">
  import { AntdIcons } from '../data/index';
  import Icon from './Icon.vue';
</script>

<template>
  <div>
    <ul>
      <li v-for="(item, index) in AntdIcons.icons" :key="index">
        <Icon :icon="`${AntdIcons.prefix}:${item}`"></Icon>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
