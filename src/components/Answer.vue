<script setup lang="ts">

const props = defineProps<{
  shuffledAnswers: string[];
  disabled: boolean;
  correctAnswer: string;
}>();

const model = defineModel<string | null>();

</script>

<template>
  <label
    v-for="(answer, index) in shuffledAnswers"
    :key="index"
    :for="`answer${index}`"
    :class="{
      right: props.disabled && answer === props.correctAnswer,
      wrong: props.disabled && answer !== props.correctAnswer && model=== answer,
    }"
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

<style scoped>
.right {
  color: #47a417;
  font-weight: bold;
}
.wrong {
    color: #ee402e;
    font-weight: bold;
}
</style>
