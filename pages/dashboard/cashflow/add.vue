<template>
  <FormAddCashflow/>
</template>
<script setup lang="ts">
import FormAddCashflow from "~/components/cashflow/FormAddCashflow.vue";
import DashSidebar from "~/components/DashSidebar.vue";
// Menentukan metadata halaman
definePageMeta({
  layout: false // Menggunakan layout custom
});
</script>