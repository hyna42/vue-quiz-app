<script setup lang="ts">
import { onMounted } from "vue";
import { useFetchQuestions } from "./composables/Api";
import Quiz from "./components/Quiz.vue";

const { error, loading, questions, fetchQuestions } = useFetchQuestions();

onMounted(async () => {
  const url = "https://opentdb.com/api.php?amount=3";
  await fetchQuestions(url);
});
</script>

<template>
  <main>
    <div v-if="error" class="quiz-message">
      <div class="alert alert-error">❌ {{ error }}</div>
    </div>
    <div v-else>
      <div v-if="loading" class="quiz-message" :aria-busy="true">
        <p>Chargement des questions ...</p>
      </div>
      <Quiz v-else :questions="questions" />
    </div>
  </main>
</template>

<style scoped>
.quiz-message {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
  width: 100%;
}
</style>
