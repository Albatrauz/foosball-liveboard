<script setup>
const props = defineProps({
  currentStep: Number,
});

const steps = [
  {
    label: 'Team 1',
    title: 'Team 1',
    key: 'team1',
    content: 'Selecteer de spelers voor team 1',
  },
  {
    label: 'Team 2',
    title: 'Team 2',
    key: 'team2',
    content: 'Selecteer de spelers voor team 2',
  },
  {
    label: 'Score toevoegen',
    title: 'Score',
    key: 'score',
    content: 'Voer de score in',
  },
];
</script>

<template>
  <UTabs :items="steps" />
</template>

<style scoped></style>
