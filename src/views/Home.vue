<script setup lang="ts">
import { useRuoyiDicts } from '@/hooks/business/useRuoyiDicts';
const { sys_common_status, sys_yes_no, dicts, format, load: Rd } = useRuoyiDicts(['sys_job_group', 'sys_yes_no', 'sys_common_status'], {
  isLazy: true,
});

const s = computed(() => format(sys_common_status, '1'));
console.log(s);
// console.log
const data = [
  {
    data: 'zd',
    asdsd: 1,
  },
];
const sd = format(data, 1, {
  valueField: 'asdsd',
});
const ssd = format('sys_common_status', '1;');
setTimeout(Rd, 1000);
</script>

<template>
  <div>
    <p>
      {{ s }}
    </p>
    <p>
      sd: {{ sd }}
    </p>
    <!-- useDicts:  {{ format('sys_common_status', ['1', '0'], { primitive: true }) }} -->
  </div>
  <div>
    <p>
      <code>
        {{ format(data, '1', { isRaw: true, valueField: 'data' }) }}
      </code>
      <code>
        {{ format('sys_common_status', ['1', '2']) }}
      </code>
    </p>
  </div>
</template>

<style scoped></style>
