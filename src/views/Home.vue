<script setup lang="ts">
import { useRuoyiDicts } from '@/hooks/business/useRuoyiDicts';
import { useDicts } from '@/hooks/dict/useDicts';
const { sys_common_status } = useDicts(['sys_common_status']);
const t = useRuoyiDicts(['sys_job_group']);
// console.log(sys_job_group);
</script>

<template>
  <div>
    useDicts:  {{ sys_common_status.map(e => e.label) }}
  </div>
  <div>
    useDicts:
  </div>
</template>

<style scoped></style>
