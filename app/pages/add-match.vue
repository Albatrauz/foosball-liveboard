<template>
  <div>
    <h2>Nieuwe Wedstrijd</h2>

    <form @submit.prevent="addMatch">
      <div>
        <h3>Team 1</h3>
        <div>
          <label for="player1">Speler 1:</label>
          <select
            id="player1"
            v-model="player1"
            required
            @change="updatePlayerName(1)"
          >
            <option value="">
              Selecteer speler
            </option>
            <option v-for="user in availableUsers" :key="user.name" :value="user.name">
              {{ user.name }}
            </option>
          </select>
          <span v-if="playerNames[0]">{{ playerNames[0] }}</span>
        </div>
        <div>
          <label for="player2">Speler 2:</label>
          <select
            id="player2"
            v-model="player2"
            required
            @change="updatePlayerName(2)"
          >
            <option value="">
              Selecteer speler
            </option>
            <option
              v-for="user in availableUsers"
              :key="user.name"
              :value="user.name"
              :disabled="player1 === user.name"
            >
              {{ user.name }}
            </option>
          </select>
          <span v-if="playerNames[1]">{{ playerNames[1] }}</span>
        </div>
        <div>
          <label for="score1">Score:</label>
          <input
            id="score1"
            v-model.number="score1"
            type="number"
            required
          >
        </div>
      </div>

      <div>
        <h3>Team 2</h3>
        <div>
          <label for="player3">Speler 3:</label>
          <select
            id="player3"
            v-model="player3"
            required
            @change="updatePlayerName(3)"
          >
            <option value="">
              Selecteer speler
            </option>
            <option
              v-for="user in availableUsers"
              :key="user.name"
              :value="user.name"
              :disabled="player1 === user.name || player2 === user.name"
            >
              {{ user.name }}
            </option>
          </select>
          <span v-if="playerNames[2]">{{ playerNames[2] }}</span>
        </div>
        <div>
          <label for="player4">Speler 4:</label>
          <select
            id="player4"
            v-model="player4"
            required
            @change="updatePlayerName(4)"
          >
            <option value="">
              Selecteer speler
            </option>
            <option
              v-for="user in availableUsers"
              :key="user.id"
              :value="user.name"
              :disabled="player1 === user.inamed || player2 === user.name || player3 === user.name"
            >
              {{ user.name }}
            </option>
          </select>
          <span v-if="playerNames[3]">{{ playerNames[3] }}</span>
        </div>
        <div>
          <label for="score2">Score:</label>
          <input
            id="score2"
            v-model.number="score2"
            type="number"
            required
          >
        </div>
      </div>

      <button type="submit">
        Wedstrijd Toevoegen
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useFirestore } from 'vuefire'
import useUsers from '~~/composables/useUsers'
import useMatches from '~~/composables/useMatches'

const { fetchMatches } = useMatches() // Voeg fetchMatches toe
const db = useFirestore()
const { users } = useUsers()

const player1 = ref('')
const player2 = ref('')
const player3 = ref('')
const player4 = ref('')
const score1 = ref(0)
const score2 = ref(0)
const playerNames = ref(['', '', '', '']) // Array om de namen van de spelers op te slaan

const availableUsers = computed(() => {
  return users.value.filter(user =>
    user.id !== player1.value
    && user.id !== player2.value
    && user.id !== player3.value
    && user.id !== player4.value,
  )
})

const updatePlayerName = (playerNumber) => {
  const userId = playerNumber === 1
    ? player1.value
    : playerNumber === 2
      ? player2.value
      : playerNumber === 3
        ? player3.value
        : player4.value

  const user = users.value.find(user => user.id === userId)
  if (user) {
    playerNames.value[playerNumber - 1] = user.naam
  }
  else {
    playerNames.value[playerNumber - 1] = ''
  }
}

const addMatch = async () => {
  try {
    const matchData = {
      team1: [player1.value, player2.value, score1.value],
      team2: [player3.value, player4.value, score2.value],
      date: serverTimestamp(),
    }

    // Voeg de wedstrijd toe aan de 'matches' collectie in Firestore
    const docRef = await addDoc(collection(db, 'matches'), matchData)
    console.log('Wedstrijd toegevoegd met ID:', docRef.id)

    // Reset formulier na toevoegen
    player1.value = ''
    player2.value = ''
    player3.value = ''
    player4.value = ''
    score1.value = 0
    score2.value = 0
    playerNames.value = ['', '', '', '']
  }
  catch (error) {
    console.error('Fout bij het toevoegen van de wedstrijd:', error)
    // Eventueel een foutmelding tonen aan de gebruiker
  }
}
</script>
