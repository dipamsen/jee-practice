<script setup lang="ts">
import { ref, computed, watchEffect } from "vue";
import { useRoute } from "vue-router";
import questions from "../test-questions.json";
import type { QuestionInfo } from "../types";

const route = useRoute();
const seed = route.query.seed || Math.floor(Math.random() * 100000);
// @ts-expect-error
const random = new Math.seedrandom(seed);

function shuffle<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
questions.questions = questions.questions.map((question) => {
  question.QuestionDiagramURL = `https://questionkscimagestorage.blob.core.windows.net${question.QuestionDiagramURL.slice(
    1
  )}`;
  return question;
});

async function getQuestion(i: number) {
  const id = questionsList.value[i].QuestionId;
  const response = await fetch(
    `https://jee-api-fp.vercel.app/question?id=${id}`
  );
  const data: QuestionInfo = await response.json();
  questionsList.value[i].fullInfo = data;
}

type PartialQuestion = typeof questions["questions"][number];
type Question = PartialQuestion & { fullInfo?: QuestionInfo };
const questionsList = ref<Question[]>(shuffle(questions.questions));
const currIndex = ref(0);
getQuestion(currIndex.value);
getQuestion(currIndex.value + 1);

const getNext = () => {
  getQuestion(currIndex.value + 1);
};

const previous = () => {
  if (currIndex.value > 0) {
    currIndex.value--;
    reset();
  }
};
const next = () => {
  if (currIndex.value < questionsList.value.length - 1) {
    currIndex.value++;
    getNext();
    reset();
  }
};
const reset = () => {
  selectedAns.value = "";
  isCorrect.value = null;
};

const selectedAns = ref<string | string[]>("");
const submitAns = () => {
  let val = selectedAns.value;
  if (Array.isArray(val)) {
    val = val.join("");
  }

  if (val === currQuestion.value.fullInfo?.questionData.answerOption) {
    isCorrect.value = true;
  } else {
    isCorrect.value = false;
  }
};

const currQuestion = computed(() => questionsList.value[currIndex.value]);
const isCorrect = ref<boolean | null>(null);
</script>

<template>
  <main>
    <h1>Test your knowledge</h1>

    <v-card v-if="currQuestion.fullInfo">
      <div class="d-flex ma-5 justify-space-between">
        <span
          >{{ currQuestion.chapterName }} -
          {{ currQuestion.kscClusterName }}</span
        >
        <span>{{ currQuestion.QuestionType }}</span>
      </div>
      <v-img :aspect-ratio="3 / 1" :src="currQuestion.QuestionDiagramURL" />

      <v-card-text>
        <div
          class="ul"
          style="gap: 2rem"
          v-if="
            currQuestion.QuestionType === 'Objective' ||
            currQuestion.QuestionType === 'Multiple Choice'
          "
        >
          <v-btn-toggle
            rounded="l"
            :multiple="currQuestion.QuestionType === 'Multiple Choice'"
            v-model="selectedAns"
            :disabled="isCorrect !== null"
          >
            <v-btn
              v-for="option in ['A', 'B', 'C', 'D']"
              :color="
                isCorrect ? 'green' : isCorrect === false ? 'red' : 'primary'
              "
              variant="elevated"
              :key="option"
              :value="option"
              >{{ option }}</v-btn
            >
          </v-btn-toggle>
          <v-btn
            @click="submitAns"
            color="primary"
            variant="outlined"
            :disabled="isCorrect !== null || selectedAns === ''"
          >
            Submit
          </v-btn>
        </div>
        <div class="ul" v-else-if="currQuestion.QuestionType === 'Numerical'">
          <v-text-field
            label="Answer"
            variant="underlined"
            type="number"
            v-model="selectedAns"
          ></v-text-field>
          <v-btn color="primary" variant="outlined"> Submit </v-btn>
        </div>
      </v-card-text>

      <v-card-actions class="justify-space-between">
        <v-btn
          color="primary"
          variant="elevated"
          @click="previous"
          :disabled="currIndex === 0"
        >
          Previous
        </v-btn>
        <v-btn
          color="primary"
          variant="elevated"
          @click="next"
          :disabled="currIndex === questionsList.length - 1"
          >Next</v-btn
        >
      </v-card-actions>

      <section v-if="isCorrect !== null">
        <v-card-title v-if="isCorrect">Correct Answer!</v-card-title>
        <v-card-title v-if="isCorrect === false">Wrong Answer!</v-card-title>
        <v-card-text>
          Answer:
          {{ currQuestion.fullInfo.questionData.answerOption }}
        </v-card-text>
        <v-card-text>
          <v-img :src="currQuestion.fullInfo.questionData.fullSolutionURL" />
        </v-card-text>
      </section>
    </v-card>
    <v-card loading v-else>
      <v-img :aspect-ratio="3 / 1" />
    </v-card>

    <footer>Seed: {{ seed }}</footer>
  </main>
</template>

<style>
main {
  width: 90%;
  max-width: 800px;
  margin: 0 auto;
}
.ul {
  display: grid;
}

.ul > * {
  grid-column-start: 1;
  grid-row-start: 1;
  justify-self: center;
}

.ul > *:last-child {
  justify-self: right;
}
</style>
