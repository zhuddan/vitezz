<script setup lang="ts">
  import { getRandomColor } from '@/utils';

  function getColor() {
    return getRandomColor({ max: 'eeeeee' });
  }
</script>

<template>
  <div style="width: 100%">
    <h1> grid test </h1>
    <div class="box">
      <div v-for="item in 9" :key="item" class="item grid_1" :style="{ backgroundColor: getColor() }">{{
        item
      }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .box {
    margin-top: 0;
    display: inline-grid;
    width: 100%;
    border: 1px solid;
    padding: 10px;
    grid-template-columns: 1fr 2fr minmax(200px, 1fr);
    grid-template-rows: repeat(3, 100px);
    box-sizing: border-box;
    grid-row-gap: 20px;
    grid-column-gap: 20px;

    .item {
      font-size: 2em;
      line-height: 100px;
      text-align: center;
      color: aliceblue;
    }
  }
</style>
