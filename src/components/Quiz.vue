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
const end = ref(false);

//all responses
const answers = ref<(string | null)[]>(props.questions.map(() => null));

//compute
const currentQuestion = computed(() => props.questions[step.value] || null);

//fonctions
const addAnswer = (answer: string) => {
  //incremente answers
  answers.value[step.value] = answer;
  //si on est en dernier : afficher un texte
  if (step.value === props.questions.length - 1) {
    end.value = true;
    console.log("🎉 Quiz terminé !");
  } else {
    //sinon incrémente
    step.value++;
    console.log(`Question ${step.value + 1}/${props.questions.length}`);
  }
};
</script>

<template>
  <div class="quiz">
    <!-- title -->
    <h1>General Knowledge Quiz</h1>
    <div v-if="end">
      <Recap/>
    </div>
    <div v-else>
      <!-- progress bar -->
      <Progress :max="questions.length" :value="step + 1" />
      <!-- question -->
      <Question
        v-if="currentQuestion"
        :question="currentQuestion"
        @answer="addAnswer"
        :key="step"
      />
    </div>
    <hr />
    <pre>
      {{ currentQuestion }}
    </pre>
    <pre>
      {{ answers }}
    </pre>
  </div>
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
