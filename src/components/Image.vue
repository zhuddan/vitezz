<script setup lang="ts">
  import { useSlotsVisible } from '@/hooks/utils/slots';
  import { emit } from 'process';
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
    objectFit: {
      type: String as PropType<'fill' | 'contain' | 'cover' | 'none' | 'scale-down'>,
      default: 'fill',
    },
  });
  const emits = defineEmits(['click']);
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
        isLoading.value = false;
      };
      img.onerror = () => {
        isLoading.value = false;
        isError.value = true;
      };
    });
  }
  const { loadingVisible, errorVisible } = useSlotsVisible('loading', 'error');
  const attrs = useAttrs();
  function onClick() {
    if (isLoading.value) return;
    emits('click');
  }

  const imgStyle = computed(() => {
    return {
      objectFit: props.objectFit,
    };
  });
</script>

<template>
  <div class="img-wrap" v-bind="attrs" @click="onClick">
    <template v-if="isLoading">
      <div v-if="!loadingVisible" class="default_loading"> 加载中... </div>
      <slot name="loading"></slot>
    </template>
    <template v-else-if="isError">
      <slot v-if="errorVisible" name="error"></slot>
      <div class="default_error"> 预览失败... </div>
    </template>
    <img v-else :src="src" :alt="alt" :style="imgStyle" />
  </div>
</template>

<style scoped lang="scss">
  .img-wrap {
    display: inline-block;
    overflow: hidden;
    img {
      width: inherit;
      height: inherit;
      display: block;
      // object-fit: ;
    }
    .default_loading,
    .default_error {
      width: inherit;
      height: inherit;
      background: rgba(148, 148, 148, 0.502);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .default_loading {
      cursor: wait;
    }
  }
</style>
