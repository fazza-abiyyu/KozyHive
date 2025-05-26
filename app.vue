<template>
  <div>
    <NuxtLayout>
      <NuxtLoadingIndicator />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
import useAuth from "~/composables/UseAuth";

const {initAuth} = useAuth();
onMounted(() => initAuth())
</script>