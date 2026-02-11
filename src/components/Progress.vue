<script setup lang="ts">
const props = defineProps<{
  max: number;
  value: number;
}>();
</script>

<template>
  <div class="progress">
    <progress :value="value" :max="max" />
    <span>{{ Math.round((value / max) * 100) }}%</span>
  </div>
</template>

<style scoped>
.progress {
  display: flex;
  align-items: center;
  
}
progress{
    margin-bottom: 0;
    margin-right: 1rem;
}
</style>
