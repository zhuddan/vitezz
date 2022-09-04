<script setup lang="ts">
  import { useDicts } from '@/hooks/dict';

  const { format } = useDicts(['sys_common_status'], {});
  const format1 = ref(false);
  const format2 = ref(false);
</script>

<template>
  <div class="home container">
    <p>
      字典翻译：
      <button :class="{ active: format1 }" @click="format1 = !format1">
        <span v-if="!format1" class="value">0</span>
        <span v-else class="label">
          {{ format('sys_common_status', '0') }}
        </span>
      </button>
      <button :class="{ active: format2 }" @click="format2 = !format2">
        <span v-if="!format2" class="value">1</span>
        <span v-else class="label">
          {{ format('sys_common_status', '1') }}
        </span>
      </button>
    </p>
  </div>
</template>

<style lang="scss" scoped>
  p {
    button {
      background: none;
      border: 0;
      text-decoration: none;
      color: hsla(160, 100%, 37%, 1);
      transition: 0.4s;
      min-width: 3em;
      cursor: pointer;

      &:hover,
      &.active {
        background-color: hsla(160, 100%, 37%, 0.2);
      }

      & + button {
        margin-left: 10px;
      }
    }
  }
</style>
