<script setup lang="ts">
import { useDicts } from '@/hooks/business/useRuoyiDicts';
const { sys_common_status, format } = useDicts(
  ['sys_job_group', 'sys_yes_no', 'sys_common_status', 'sys_common_status'],
);

const baseFormat = computed(() => format(sys_common_status, '1'));
const customDict = [
  {
    customLabel: 'zd',
    customValue: 1,
  },
];
const customDictFormat = format(customDict, 1, {
  valueField: 'customValue',
  labelField: 'customLabel',
});
const stringFormat = computed(() => format('sys_yes_no', ['Y', 'N'], { symbol: '🧨🧨🧨🧨' }));
</script>

<template>
  <div>
    <h3>useRuoyiDicts </h3>
    <p>
      baseFormat: {{ baseFormat }}
    </p>
    <p>
      customDictFormat: {{ customDictFormat }}
    </p>
    <p>
      stringFormat: {{ stringFormat }}
    </p>
  </div>
</template>

<style scoped></style>
