<template>
  <div>
    <NuxtLayout>
      <NuxtLoadingIndicator />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
import useAuth from "~/composables/useAuth";

const {initAuth} = useAuth();
onMounted(() => initAuth())
</script>