<script setup lang="ts">

import useMatches from '~~/composables/useMatches'

const { matches } = useMatches()

const formattedMatches = computed(() => {
  return matches.value.map(match => ({
    team1: match.team1,
    team2: match.team2,
    date: new Date(match.date.seconds * 1000).toLocaleDateString('nl-NL', dateOptions),
  }))
})

const dateOptions = { day: 'numeric', month: 'long', year: 'numeric' }
</script>

<template>
  <UContainer :ui="{ base: 'grid grid-cols-12 gap-6 pt-12' }">
    <div v-for="(match, index) in formattedMatches" :key="index" class="col-span-6">
      <UCard>
        <template #header>
          <div class="flex justify-between items-center">
            <div class="">
              2 vs 2
            </div>
            <div class="text-right text-shakespeare-500 font-bold">
              {{ match.date }}
            </div>
          </div>
        </template>

        <div class="flex">
          <div class="flex flex-col-reverse flex-1">
            <div class="inline-flex justify-center">
              <span class="text-xs text-slate-300 flex" v-for="(player, index) in match.team1.names" :key="player">
                {{ player }}<span v-if="index === match.team1.names.length - 2">&nbsp;&&nbsp; </span>
              </span>
            </div>
            <div class="text-3xl font-bold text-shakespeare-500 text-center mb-6">{{ match.team1.score }}</div>
          </div>

          <UDivider label="VS" size="xs" orientation="vertical" />

          <div class="flex flex-col-reverse flex-1">
            <div class="inline-flex justify-center">
              <span class="text-xs text-slate-300 flex" v-for="(player, index) in match.team2.names" :key="player">
                {{ player }}<span v-if="index === match.team2.names.length - 2">&nbsp;&&nbsp; </span>
              </span>
            </div>
            <div class="text-3xl font-bold text-shakespeare-500 text-center mb-6">{{ match.team2.score }}</div>
          </div>
        </div>
      </UCard>
    </div>
  </UContainer>
</template>
