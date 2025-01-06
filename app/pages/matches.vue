<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { collection, getDocs } from 'firebase/firestore'
import { useFirestore } from 'vuefire'

const db = useFirestore()
const matches = ref([])

const fetchMatches = async () => {
  const querySnapshot = await getDocs(collection(db, 'matches'))
  matches.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

onMounted(() => {
  fetchMatches()
})

const formattedMatches = computed(() => {
  return matches.value.map(match => ({
    team1: [match.name1, match.name2],
    team2: [match.name3, match.name4],
    scoreTeam1: match.scoreTeam1,
    scoreTeam2: match.scoreTeam2,
    date: new Date(match.date.seconds * 1000).toLocaleDateString('nl-NL', dateOptions),
  }));
});

const dateOptions = { day: 'numeric', month: 'long', year: 'numeric' };
</script>

<template>
  <div>
    <UContainer :ui="{ base: 'grid grid-cols-12 gap-6' }">
      <div v-for="(match, index) in formattedMatches" :key="index" class="col-span-6">
        <UCard>
          <template #header>
            Wedstrijd op {{ match.date }}
          </template>

          <div class="flex">
            <ul>
              <li v-for="player in match.team1" :key="player">{{ player }}</li>
            </ul>
            <div class="text-3xl font-bold text-shakespeare-500">{{ match.scoreTeam1 }}</div>
            <UDivider label="VS" />
            <div class="text-3xl font-bold text-shakespeare-500">{{ match.scoreTeam2 }}</div>
            <ul>
              <li v-for="player in match.team2" :key="player">{{ player }}</li>
            </ul>
          </div>

          <template #footer>
            <Placeholder class="h-8" />
          </template>
        </UCard>
      </div>
    </UContainer>
  </div>
</template>

<style scoped>
/* Add your styles here */
</style>