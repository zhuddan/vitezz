<script setup lang="ts">
  var xyz = [
    'fade down-5 rotate-right-50% stagger',
    'fade flip-up flip-left',
    'fade front-3 flip-down-50%  stagger-5',
    'stagger-2 narrow-100%',
  ];
  function getArrRand<T>(array: T[]) {
    return array[Math.floor(Math.random() * (array.length - 1))] + '';
  }
  const rand = getArrRand(xyz);
  const words = [
    getArrRand([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
    getArrRand([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
    getArrRand([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
    getArrRand([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
    getArrRand([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
  ];
</script>

<template>
  <div class="home">
    <XyzTransitionGroup class="item-group" :xyz="rand" appear>
      <div v-for="(i, index) in words" :key="index" class="square">
        <div class="inner">{{ i }}</div>
      </div>
    </XyzTransitionGroup>
  </div>
</template>

<style scoped>
  .home {
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(var(--app-content-height) - 40px);
    box-sizing: border-box;
  }

  .item-group {
    --xyz-translate-y: -350%;
    --xyz-ease: cubic-bezier(0.5, -1.5, 0.5, 1.5);
    width: 500px;
  }

  .square {
    height: 100px;
    width: 100px;
    display: inline-block;
    box-sizing: border-box;
    padding: 5px;
  }

  .inner {
    height: 100%;
    width: 100%;
    background-color: var(--color-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2em;
    color: #fff;
  }
</style>
