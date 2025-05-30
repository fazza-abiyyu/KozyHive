<template>
  <div>
    <AppHeader v-if="!isAuthPage" />
    <slot />
  </div>
  <footer-section/>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const isAuthPage = computed(() => route.path.includes('/auth'));

import FooterSection from "~/components/footer-section.vue";
</script>

<style scoped></style>