<script setup lang="ts">
import type { TriviaQuestion } from "@/composables/Api";
import { getMessaye } from "@/composables/Utils";
import { computed } from "vue";

const props = defineProps<{
  answers: (string | null)[];
  questions: TriviaQuestion[];
}>();

//score
const score = computed(() => {
  return props.questions.reduce((acc, question, k) => {
    if (question.correct_answer === props.answers[k]) {
      return acc + 1;
    }
    return acc;
  }, 0);
});

//pourcentage
const percentage = computed(() => {
  return Math.round((score.value / props.questions.length) * 100);
});

//message
const message = getMessaye(percentage.value);

//emits
const emits = defineEmits<{
  restart: [];
}>();
</script>

<template>
  <div class="recap">
    <div class="message">
      <div class="emoji">{{ message.emoji }}</div>
      <h2>{{ message.title }}</h2>
      <p class="subtitle">{{ message.text }}</p>
    </div>

    <div class="score-box">
      <div class="score-number">{{ score }}/{{ questions.length }}</div>
      <div class="score-percent">{{ percentage }}%</div>
    </div>

    <div class="details">
      <p v-if="score">✅ Correct: {{ score }}</p>
      <p>❌ Wrong: {{ questions.length - score }}</p>
    </div>
    <button class="retry-btn" @click="emits('restart')">Try Again</button>
  </div>
</template>

<style scoped>
.recap {
  text-align: center;
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;
}

.message {
  margin-bottom: 2rem;
}

.emoji {
  font-size: 4rem;
  margin-bottom: 1rem;
}

h2 {
  font-size: 2rem;
  margin: 0.5rem 0;
  color: #fff;
}

.subtitle {
  font-size: 1.1rem;
  color: #b0b0b0;
  margin-top: 0.5rem;
}

.score-box {
  background: linear-gradient(135deg, #d946ef, #ec4899);
  padding: 2rem;
  border-radius: 12px;
  margin: 2rem 0;
}

.score-number {
  font-size: 3rem;
  font-weight: bold;
  color: #fff;
}

.score-percent {
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.9);
  margin-top: 0.5rem;
}

.details {
  margin: 2rem 0;
  display: flex;
  gap: 2rem;
  justify-content: center;
}

.details p {
  font-size: 1.1rem;
  color: #b0b0b0;
}

.retry-btn {
  background: #d946ef;
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.retry-btn:hover {
  background: #ec4899;
  transform: scale(1.05);
}
</style>
