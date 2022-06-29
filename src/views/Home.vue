<script setup lang="ts">
// import alias test 
import HelloWorld from '@/components/HelloWorld.vue';
import { useTestStore } from '@/store/modules/test';
const testStore = useTestStore();

const testCount = computed(()=>{
  return testStore.count;
});
</script>

<template>
  ---Home.vue---
  <div class="box">
    <button @click="testStore.increase">
      increase
    </button>
    {{ testCount }}
    <button @click="testStore.decrease">
      decrease
    </button>
  </div>

  <HelloWorld msg="beautiful world" />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  .box{
    width: 200px;
    display: flex;
    justify-content: space-between;
    margin:  10px auto ;
    align-items: center;
  }
  button{
   font-size: 18px;
   cursor: pointer;
  }
}
</style>
