<template>
<<<<<<< Updated upstream
  <div>
    <h2 class="font-climate uppercase text-transparent opacity-60 left-1/2 -translate-x-1/2 absolute whitespace-nowrap">Nieuwe Wedstrijd</h2>
    <UContainer>
      <form @submit.prevent="addMatch">
        <div class="grid grid-cols-12">
          <div class="col-span-6">
            <h3 class="text-2xl">Team 1</h3>
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

          <div class="col-span-6">
            <h3 class="text-2xl">Team 2</h3>
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
        </div>
      </form>

=======
  <div class="p-6">
    <UContainer
      :ui="{
        base: 'border border-px-solid border-slate-500 rounded-xl my-12 py-6',
        constrained: 'max-w-container',
      }"
    >
      <h2 class="text-3xl font-bold mb-8 text-center font-climate uppercase">
        Nieuwe Wedstrijd
      </h2>

      <!-- Step indicator -->
      {/* Add Step indicator */}

      <!-- Step 1: Team 1 Selection -->
      <div v-if="currentStep === 1" class="space-y-6">
        <h3 class="text-xl font-semibold">Selecteer Team 1</h3>
        <div class="grid grid-cols-2 gap-6">
          <div>
            <label class="block mb-2">Speler 1</label>
            <div class="grid grid-cols-2 gap-2">
              <UButton
                v-for="user in availableUsers"
                :key="user.id"
                :class="[
                  'p-3 rounded-lg transition-colors',
                  player1?.id === user.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-black',
                  isPlayerSelected(user, 1)
                    ? 'opacity-50 cursor-not-allowed'
                    : '',
                ]"
                @click="selectPlayer(1, user)"
                :disabled="isPlayerSelected(user, 1)"
              >
                {{ user.name }}
              </UButton>
            </div>
          </div>
          <div>
            <label class="block mb-2">Speler 2</label>
            <div class="grid grid-cols-2 gap-2">
              <UButton
                v-for="user in availableUsers"
                :key="user.id"
                :class="[
                  'p-3 rounded-lg transition-colors',
                  player2?.id === user.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-black',
                  isPlayerSelected(user, 2)
                    ? 'opacity-50 cursor-not-allowed'
                    : '',
                ]"
                @click="selectPlayer(2, user)"
                :disabled="isPlayerSelected(user, 2)"
              >
                {{ user.name }}
              </UButton>
            </div>
          </div>
        </div>
        <button
          @click="nextStep"
          :disabled="!player1 || !player2"
          class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Volgende
        </button>
      </div>

      <!-- Step 2: Team 2 Selection -->
      <div v-if="currentStep === 2" class="space-y-6">
        <h3 class="text-xl font-semibold">Selecteer Team 2</h3>
        <div class="grid grid-cols-2 gap-6">
          <div>
            <label class="block mb-2">Speler 3</label>
            <div class="grid grid-cols-2 gap-2">
              <UButton
                v-for="user in availableUsersTeam2"
                :key="user.id"
                :class="[
                  'p-3 rounded-lg transition-colors text-black',
                  player3?.id === user.id
                    ? 'bg-blue-500 text-black'
                    : 'bg-gray-100 hover:bg-gray-200',
                  isPlayerSelected(user) ? 'opacity-50 cursor-not-allowed' : '',
                ]"
                @click="selectPlayer(3, user)"
                :disabled="isPlayerSelected(user)"
              >
                {{ user.name }}
              </UButton>
            </div>
          </div>
          <div>
            <label class="block mb-2">Speler 4</label>
            <div class="grid grid-cols-2 gap-2">
              <Ubutton
                v-for="user in availableUsersTeam2"
                :key="user.id"
                :class="[
                  'p-3 rounded-lg transition-colors text-black',
                  player4?.id === user.id
                    ? 'bg-blue-500 text-black'
                    : 'bg-gray-100 hover:bg-gray-200',
                  isPlayerSelected(user) ? 'opacity-50 cursor-not-allowed' : '',
                ]"
                @click="selectPlayer(4, user)"
                :disabled="isPlayerSelected(user)"
              >
                {{ user.name }}
              </Ubutton>
            </div>
          </div>
        </div>
        <div class="flex gap-2">
          <button
            @click="previousStep"
            class="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            Terug
          </button>
          <button
            @click="nextStep"
            :disabled="!player3 || !player4"
            class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Volgende
          </button>
        </div>
      </div>

      <!-- Step 3: Score Selection -->
      <div v-if="currentStep === 3" class="space-y-6">
        <h3 class="text-xl font-semibold">Selecteer Score</h3>
        <div class="grid grid-cols-2 gap-8">
          <div>
            <h4 class="mb-2">Team 1 Score: {{ score1 }}</h4>
            <div class="grid grid-cols-6 gap-2">
              <button
                v-for="n in 11"
                :key="n - 1"
                @click="score1 = n - 1"
                :class="[
                  'p-3 rounded-lg transition-colors',
                  score1 === n - 1
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200',
                ]"
              >
                {{ n - 1 }}
              </button>
            </div>
          </div>
          <div>
            <h4 class="mb-2">Team 2 Score: {{ score2 }}</h4>
            <div class="grid grid-cols-6 gap-2">
              <button
                v-for="n in 11"
                :key="n - 1"
                @click="score2 = n - 1"
                :class="[
                  'p-3 rounded-lg transition-colors',
                  score2 === n - 1
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200',
                ]"
              >
                {{ n - 1 }}
              </button>
            </div>
          </div>
        </div>
        <div class="flex gap-2">
          <button
            @click="previousStep"
            class="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            Terug
          </button>
          <button
            @click="addMatch"
            class="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Wedstrijd Toevoegen
          </button>
        </div>
      </div>
>>>>>>> Stashed changes
    </UContainer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useFirestore } from 'vuefire';
import useUsers from '~~/composables/useUsers.js';

const db = useFirestore();
const { users } = useUsers();

const currentStep = ref(1);
const player1 = ref(null);
const player2 = ref(null);
const player3 = ref(null);
const player4 = ref(null);
const score1 = ref(0);
const score2 = ref(0);

const availableUsers = computed(() => users.value);

// Remove availableUsersTeam1 as we don't need it anymore

const availableUsersTeam2 = computed(() => {
  return users.value.filter((user) => {
    return user.id !== player1.value?.id && user.id !== player2.value?.id;
  });
});

const isPlayerSelected = (user, playerPosition) => {
  if (currentStep.value === 1) {
    // For Team 1 selection
    if (playerPosition === 1) {
      return player2.value?.id === user.id;
    } else if (playerPosition === 2) {
      return player1.value?.id === user.id;
    }
  } else {
    // For Team 2 selection
    return [player1.value, player2.value, player3.value, player4.value].some(
      (p) => p?.id === user.id
    );
  }
  return false;
};
const selectPlayer = (playerNumber, user) => {
  switch (playerNumber) {
    case 1:
      player1.value = user;
      break;
    case 2:
      player2.value = user;
      break;
    case 3:
      player3.value = user;
      break;
    case 4:
      player4.value = user;
      break;
  }
};

const nextStep = () => {
  if (currentStep.value < 3) currentStep.value++;
};

const previousStep = () => {
  if (currentStep.value > 1) currentStep.value--;
};

const addMatch = async () => {
  try {
    const matchData = {
      team1: {
        names: [player1.value.name, player2.value.name],
        score: score1.value,
      },
      team2: {
        names: [player3.value.name, player4.value.name],
        score: score2.value,
      },
      date: serverTimestamp(),
    };

    await addDoc(collection(db, 'matches'), matchData);

    // Reset form
    currentStep.value = 1;
    player1.value = null;
    player2.value = null;
    player3.value = null;
    player4.value = null;
    score1.value = 0;
    score2.value = 0;
  } catch (error) {
    console.error('Error adding match:', error);
  }
};
</script>
<<<<<<< Updated upstream
<style>
  h2 {
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: #00beeb;
    color: transparent;
    @apply text-[100px];
  }
</style>
=======

<style scoped>
h2 {
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #00beeb;
  color: transparent;
}
</style>
>>>>>>> Stashed changes
