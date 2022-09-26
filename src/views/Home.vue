<script setup lang="ts"></script>

<template>
  <div>
    <p v-for="item in 99" :key="item">{{ item }}</p>
  </div>
</template>

<style scoped>
  p {
    margin-top: 0;
  }
</style>
