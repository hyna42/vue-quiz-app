<script setup lang="ts">
import type { TriviaQuestion } from "@/composables/Api";
import Progress from "./Progress.vue";
import { computed, ref } from "vue";
import Question from "./Question.vue";
import Recap from "./Recap.vue";

//props
const props = defineProps<{
  questions: TriviaQuestion[];
}>();

//variables
const step = ref(0);
const state = ref("question");

//all responses
const answers = ref<(string | null)[]>(props.questions.map(() => null));

//compute
const currentQuestion = computed(() => props.questions[step.value] || null);

//fonctions
const addAnswer = (answer: string|null) => {
  //incremente answers
  answers.value[step.value] = answer;
  //si on est en dernier : afficher un texte
  if (step.value === props.questions.length - 1) {
    state.value = "recap";
    console.log("🎉 Quiz terminé !");
  } else {
    //sinon incrémente
    step.value++;
  }
};

//start new quiz
const restartQuiz = () => {
  step.value = 0;
  state.value = "question";
  answers.value = props.questions.map(() => null);

  console.log("🚀 Let's go!");
};

// console.log(":TEST:",props.questions.map(q=>q.correct_answer))
</script>

<template>
  <div class="quiz">
    <!-- title -->
    <h1>General Knowledge Quiz</h1>
    <div v-if="state === 'question'">
      <!-- progress bar -->
      <Progress :max="questions.length" :value="step + 1" />
      <!-- question -->
      <Question
        v-if="currentQuestion"
        :question="currentQuestion"
        @answer="addAnswer"
        :key="step"
        :isLastQuestion="step === props.questions.length - 1"
      />
    </div>
    <div v-if="state === 'recap'">
      <Recap
        v-if="answers && questions"
        :answers="answers"
        :questions="questions"
        @restart="restartQuiz"
      />
    </div>
  </div>
  <!-- <pre>{{ answers }}</pre> -->
</template>

<style scoped>
h1 {
  text-align: center;
}
.quiz {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
}
</style>
