<script setup lang="ts">
  import { useSlotsVisible } from '@/hooks/utils/slots';
  const props = defineProps({
    src: {
      type: String,
      default: '',
    },
    alt: {
      type: String,
      default: '',
    },
    loading: {
      type: String as PropType<'eager' | 'lazy'>,
      default: 'eager',
    },
    width: {
      type: [Number, String],
      default: 320,
    },
    height: {
      type: [Number, String],
      default: 200,
    },
  });
  const isLoading = ref(true);
  const isError = ref(false);

  watch(
    () => props.src,
    (src) => {
      src && load();
    },
    {
      immediate: true,
    },
  );
  function load() {
    const img = new Image();
    isLoading.value = true;
    isError.value = false;
    img.src = props.src;
    return new Promise(() => {
      img.onload = () => {
        // isLoading.value = false;
      };
      img.onerror = () => {
        // isLoading.value = false;
        isError.value = true;
      };
    });
  }
  const { loadingVisible, errorVisible } = useSlotsVisible('loading', 'error');
  loadingVisible.value;
</script>

<template>
  <div class="img-wrap">
    <template v-if="isLoading">
      <div v-if="!loadingVisible" class="default_loading"> loading... </div>
      <slot name="loading"></slot>
    </template>
    <template v-if="isError">
      <slot v-if="errorVisible" name="error"></slot>
      <div class="default_error"> error... </div>
    </template>

    <img v-if="!isLoading && !isError" :src="src" :alt="alt" />
  </div>
</template>

<style scoped lang="scss">
  .img-wrap {
    display: inline-block;
    background: wheat;
    img {
      width: 400px;
      width: 300px;
      display: block;
    }
  }
</style>
