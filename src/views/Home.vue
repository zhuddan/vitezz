<script setup lang="ts">
import { useRuoyiDicts } from '@/hooks/business/useRuoyiDicts';
import { useDicts } from '@/hooks/dict/useDicts';
const { sys_common_status, format, load } = useDicts(['sys_common_status'], { isLazy: true });
const { sys_job_group, sys_yes_no, format: Rf, load: Rd } = useRuoyiDicts(['sys_job_group', 'sys_yes_no'], {
  isLazy: true,
});

const d = computed(() => Rf(sys_job_group, ['1', '0'], { isRaw: true }));

setTimeout(() => {
  load();
  Rd();
}, 1000);
</script>

<template>
  <div>
    useDicts:  {{ format('sys_common_status', ['1', '0'], { primitive: true }) }}
  </div>
  <div>
    <pre>
      <code>
        {{ d }}
      </code>
      <code>
        {{ Rf(sys_yes_no, ['1', '0']) }}
      </code>
    </pre>
  </div>
</template>

<style scoped></style>
