<script setup lang="ts">
  const dialog = ref<Nullable<HTMLDialogElement>>(null);

  function openDialog() {
    dialog.value?.showModal();
  }
  function closeDialog() {
    dialog.value?.close();
  }
</script>

<template>
  <div class="page">
    <h1> native dialog test </h1>
    <button @click="openDialog()">open dialog</button>
    <dialog ref="dialog">
      <h1>
        <span>标题</span>
        <span>x</span>
      </h1>
      <main>
        <p v-for="item in 2" :key="item">{{ item }}</p>
      </main>
      <footer>
        <button @click="closeDialog()">确定</button>
        <button @click="closeDialog()">取消</button>
      </footer>
    </dialog>
  </div>
</template>

<style scoped lang="scss">
  dialog {
    width: 300px;
    height: 200px;
    flex-direction: column;
    border-width: 1px;
    padding: 10px;
    border-radius: 4px;

    &[open] {
      display: flex;
    }
  }

  h1,
  p {
    margin: 0;
  }

  main {
    flex: 1;
    overflow: auto;
  }

  dialog::backdrop {
    // background: rgba(255, 0, 0, 0.207);
  }
</style>
