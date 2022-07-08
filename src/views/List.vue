<script setup lang="ts">
  import HelloWorld from '@/components/HelloWorld.vue';

  interface Item {
    name: string;
    age: number;
    id: number;
    sex: '男' | '女';
  }
  const data = ref<Item[]>([
    {
      name: '张三',
      age: 25,
      sex: '男',
      id: 1,
    },
    {
      name: '李四',
      age: 15,
      sex: '男',
      id: 2,
    },
    {
      name: '王二',
      age: 15,
      sex: '女',
      id: 3,
    },
    {
      name: '麻子',
      age: 15,
      sex: '男',
      id: 4,
    },
  ]);

  function handleSet() {
    data.value[0] = { ...data.value[0], name: 'alice', sex: '女', age: 22 };
  }
  type HelloWorldRefType = InstanceType<typeof HelloWorld>;
  const helloWorldRef = ref<Nullable<HelloWorldRefType>>(null);
  onMounted(() => {
    helloWorldRef.value?.open();
  });
</script>

<template>
  <HelloWorld ref="helloWorldRef" type="b" />
  <div>
    <ul>
      <li v-for="item in data" :key="item.id">
        姓名：<span>{{ item.name }}</span>

        年龄：<span>{{ item.age }}</span>

        性别：<span>{{ item.sex }}</span>
      </li>
    </ul>

    <button @click="handleSet">set</button>
  </div>
</template>

<style scoped></style>
