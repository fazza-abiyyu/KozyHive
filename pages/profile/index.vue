<template>
  <AppHeader/>
  <profileSidebar/>
  <profile/>
</template>
<script setup lang="ts">
import profileSidebar from "~/components/profileSidebar.vue";
import Profile from "~/components/profile/profile.vue";

// Menentukan metadata halaman
definePageMeta({
  layout: false // Menggunakan layout custom
});

</script>