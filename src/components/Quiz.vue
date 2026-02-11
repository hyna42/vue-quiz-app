<script setup lang="ts">
import type { TriviaQuestion } from "@/composables/Api";

const props = defineProps<{
  questions: TriviaQuestion[];
}>();
</script>

<template>
  <div class="quiz">
    <!-- title -->
    <h1>General Knowledge Quiz</h1>
    <pre>{{ questions }}</pre>
    <!-- progress bar -->

    <!-- question -->

    <!-- answers : 1 choice == radio -->

    <!-- button : next question -->
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

