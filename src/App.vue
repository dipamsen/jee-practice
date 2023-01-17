<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";

const prefersDarkTheme = window.matchMedia("(prefers-color-scheme: dark)");
</script>

<template>
  <v-app :theme="prefersDarkTheme.matches ? 'dark' : 'light'">
    <RouterView />
  </v-app>
</template>
