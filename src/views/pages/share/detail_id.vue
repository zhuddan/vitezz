<script setup lang="ts">
import a from '@/assets/images/a.jpg';
import b from '@/assets/images/b.jpg';
import c from '@/assets/images/c.jpg';
import { useRouteParams } from '@/hooks/web/route/useRouteParams';

const route = useRoute();
const router = useRouter();
const all = ['a', 'b', 'c'];
const id = useRouteParams('id');
console.log(id);
watch(id, ()=>{
  console.log(id);
});

// const index = computed({
//   get() {
//     return all.findIndex(e=>e == route.params.id);
//   },
//   set(id) {
//     router.push(`/share/detail/${all[id]}`);
//   },
// });

// function next() {
//   if (index.value < 2) {
//     index.value++;
//     return;
//   }
//   index.value = 0;
// }

function prev() {
  // if (index.value > 0) {
  //   index.value--;
  //   return;
  // }
  // index.value = 2;
  id.value = 'c';

  console.log([]);
}

const imgs = computed(() => ({ a, b, c }[route.params.id as string]));

// useRouteChange('/share/detail/', 'params.id', (e)=>{
//   console.log(e);
// });
</script>

<template>
  <div class="detail-box">
    <button class="left" @click="prev">
      <Icon size="40" icon="ep:arrow-left" />
    </button>
    <img :src="imgs" alt="">
    <button class="right">
      <Icon size="40" icon="ep:arrow-right" />
    </button>
  </div>
</template>

<style lang="scss" scoped>
.detail-box{
  position: relative;

  button{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    height: 100%;
    z-index: 1;

    &.right{
      right: 0;
    }

    :hover{
      cursor: pointer;
    }
  }
}

img {
  width: 100%;
  max-width: 80%;
  object-fit: contain;
  margin: 0 auto;
  display: block;
  height: var(--app-content-inner-height);
}
</style>
