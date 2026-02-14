<script setup lang="ts">

const props = defineProps<{
    shuffledAnswers: string[];
    disabled:boolean
}>();

const model = defineModel<(string|null)>();
</script>

<template>
  <label
    v-for="(answer, index) in shuffledAnswers"
    :key="index"
    :for="`answer${index}`"
  >
    <input
      :id="`answer${index}`"
      type="radio"
      name="answer"
      :value="answer"
      v-model="model"
      :disabled="disabled"
    />
    {{ answer }}
  </label>
</template>
