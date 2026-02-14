<script setup lang="ts">
import type { TriviaQuestion } from "@/composables/Api";
import { useShuffleArray } from "@/composables/useShuffleArray";
import { computed, ref, watch } from "vue";
import Answer from "./Answer.vue";

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
const correctAnswer = computed(()=>props.question.correct_answer)

const isCorrectAnswer = computed(() => {
  if (selectedAnswer.value === null) return null;
  return selectedAnswer.value === correctAnswer;
});


//informe parent when responding, need change step
const emits = defineEmits(["answer"]);
</script>

<template>
  <div class="question">
    <fieldset>
      <legend>
        <h4>{{ question.question }}</h4>
      </legend>
      <!-- TODO refacto => Answer component -->
       <Answer 
        :shuffled-answers="shuffledAnswers" :disabled="isCorrectAnswer !== null"
        v-model="selectedAnswer"
        :correctAnswer="correctAnswer"
   
      />
      <!-- TODO : buton automatique -->
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
