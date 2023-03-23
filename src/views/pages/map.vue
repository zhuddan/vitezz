<script setup lang="ts">
import { init } from './map';
const el = ref<ElRef>(null);
init(el);
</script>

<template>
  <div>
    <p>map</p>
    <div ref="el" class="map"></div>
  </div>
</template>

<style scoped>
.map{
  height: 500px;
  width: 500px;
  border: 1px solid #ccc;
}
</style>