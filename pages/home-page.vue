<template>
  <div id="hero">
    <hero-section/>
  </div>
  <div id="card">
    <card-section/>
  </div>
  <div id="about">
    <about-section/>
  </div>
</template>
<script setup lang="ts">
import CardSection from "~/components/home-page/card-section.vue";
import HeroSection from "~/components/home-page/hero-section.vue";
import AboutSection from "~/components/home-page/about-section.vue";
</script>