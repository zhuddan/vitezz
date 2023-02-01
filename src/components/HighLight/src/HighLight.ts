import { computed, defineComponent, h, ref, watch } from 'vue';
// import hljs from 'highlight.js/lib/core';
import hljs from 'highlight.js';

import 'highlight.js/styles/github-dark.css';
import { CopyButtonPlugin } from './CopyButtonPlugin';
import './CopyButtonPlugin.css';
hljs.addPlugin(new CopyButtonPlugin() as any);

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

export const HighLight = defineComponent({
  props: {
    code: {
      type: [String, Object, Array],
      required: true,
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
  },
  setup(props) {
    const _code = computed(() => typeof props.code == 'string' ? props.code : JSON.stringify(props.code, null, 2));
    const language = ref(props.language);
    watch(() => props.language, (newLanguage) => {
      language.value = newLanguage;
    });

    const autodetect = computed(() => props.autodetect && !language.value);
    const cannotDetectLanguage = computed(() => !autodetect.value && !hljs.getLanguage(language.value));

    const className = computed((): string => {
      if (cannotDetectLanguage.value)
        return '';

      else
        return `hljs ${language.value}`;
    });

    const highlightedCode = computed((): string => {
      // No idea what language to use, return raw code
      if (cannotDetectLanguage.value) {
        console.warn(`The language "${language.value}" you specified could not be found.`);
        return escapeHtml(_code.value);
      }

      if (autodetect.value) {
        const result = hljs.highlightAuto(_code.value);
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
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

    return {
      className,
      highlightedCode,
    };
  },
  render() {
    return h('pre', {}, [
      h('code', {
        class: this.className,
        innerHTML: this.highlightedCode,
        tabindex: '0',
      }),
    ]);
  },
});
