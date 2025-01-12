<script setup>
import Header from './components/header.vue'
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLoadingIndicator />
  <Header />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <UNotifications />
</template>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Climate+Crisis&display=swap');
</style>
