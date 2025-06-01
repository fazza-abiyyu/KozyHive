<template>
  <DashSidebar/>
</template>

<script setup lang="ts">
// Menentukan metadata halaman
definePageMeta({
  layout: false // Menggunakan layout custom
});

import DashSidebar from "~/components/DashSidebar.vue";
</script>