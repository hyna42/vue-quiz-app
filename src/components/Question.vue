<script setup lang="ts">
import type { TriviaQuestion } from "@/composables/Api";
import { useShuffleArray } from "@/composables/useShuffleArray";
import { computed, ref, watch } from "vue";

//prop
const props = defineProps<{
  question: TriviaQuestion;
  isLastQuestion: boolean;
}>();
//variables
const shuffledAnswers = computed(() =>
  useShuffleArray([
    props.question.correct_answer,
    ...props.question.incorrect_answers,
  ]),
);
const hasAnswer = computed(() => selectedAnswer.value !== null);
const selectedAnswer = ref(null);
let isCorrectAnswer = ref<boolean | null>(null);
//functions
const handleAnswer = () => {
  isCorrectAnswer.value =
    selectedAnswer.value === props.question.correct_answer;
};
//informe parent when responding, need change step
const emits = defineEmits(["answer"]);
</script>

<template>
  <div class="question">
    <fieldset>
      <legend>
        <h4>{{ question.question }}</h4>
      </legend>
      <label
        v-for="(answer, index) in shuffledAnswers"
        :key="answer"
        :for="`answer${index}`"
      >
        <input
          :id="`answer${index}`"
          type="radio"
          name="answer"
          :value="answer"
          v-model="selectedAnswer"
          @click="handleAnswer"
          :class="{
            correct:
              isCorrectAnswer === false && answer === question.correct_answer,
            wrong:
              isCorrectAnswer === false &&
              selectedAnswer === answer &&
              answer !== question.correct_answer,
          }"
          :disabled="isCorrectAnswer !== null"
        />
        {{ answer }}
      </label>
      <button :disabled="!hasAnswer" @click="emits('answer', selectedAnswer)">
        {{ isLastQuestion ? "View Results" : "Next Question" }}
      </button>
    </fieldset>
  </div>
</template>

<style scoped>
.correct {
  background-color: #47a417;
  border: 1px solid #47a417;
}

.wrong {
  background-color: #ee402e;
  border: 1px solid #ee402e;
}

.question button {
  margin-top: 1rem;
  margin-left: auto;
  display: block;
}
</style>
