<script setup lang="ts">
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';
import { CopyButtonPlugin } from './CopyButtonPlugin';
import './CopyButtonPlugin.css';
const props = defineProps({
  code: {
    type: [String, Object, Array],
    default: '',
  },
  language: {
    type: String,
    default: '',
  },
  autodetect: {
    type: Boolean,
    default: true,
  },
  ignoreIllegals: {
    type: Boolean,
    default: true,
  },
});

// const highlightedCode = ref('');

// watch(
//   [
//     () => props.code,
//     () => props.language,
//   ],
//   update,
//   {
//     deep: true,
//     immediate: true,
//   });

// async function update() {
//   const _codeContext = typeof props.code == 'string' ? props.code : JSON.stringify(props.code, null, 2);
//   const highlightResult = hljs.highlight(
//     _codeContext,
//     {
//       language: props.language,
//     },
//   );
//   highlightedCode.value = highlightResult.value;
// }

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}
const language = ref(props.language);
const _code = computed(() => typeof props.code == 'string' ? props.code : JSON.stringify(props.code, null, 2));
const autodetect = computed(() => props.autodetect && !language.value);
const cannotDetectLanguage = computed(() => !autodetect.value && !hljs.getLanguage(language.value));
const className = computed(() => cannotDetectLanguage.value ? '' : `hljs ${language.value}`);
const highlightedCode = computed((): string => {
  // No idea what language to use, return raw code
  if (cannotDetectLanguage.value) {
    console.warn(`The language "${language.value}" you specified could not be found.`);
    return escapeHtml(_code.value);
  }

  if (autodetect.value) {
    const result = hljs.highlightAuto(_code.value);
    language.value = result.language ?? '';
    return result.value;
  }
  else {
    const result = hljs.highlight(_code.value, {
      language: language.value,
      ignoreIllegals: props.ignoreIllegals,
    });
    return result.value;
  }
});

watch(
  () => props.language,
  (newLanguage) => {
    language.value = newLanguage;
  },
  {
    immediate: true,
  },
);

console.log(navigator.clipboard);
</script>

<template>
  <pre class="hljs-copy-wrapper">
    <code ref="codeRef" class=" " :class="className" v-html="highlightedCode"></code>
    <!-- <button class="hljs-copy-button">{{ language }}</button> -->
  </pre>
</template>

<style scoped>

</style>