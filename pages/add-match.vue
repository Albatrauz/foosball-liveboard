<template>
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
      TODO: Add Step indicator

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
                color="shakespeare"
                variant="outline"
                :class="[
                  'p-3',
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
                color="shakespeare"
                variant="outline"
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
                color="shakespeare"
                variant="outline"
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
              <UButton
                v-for="user in availableUsersTeam2"
                :key="user.id"
                color="shakespeare"
                variant="outline"
                @click="selectPlayer(4, user)"
                :disabled="isPlayerSelected(user)"
              >
                {{ user.name }}
              </UButton>
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
              <UButton
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
              </UButton>
            </div>
          </div>
          <div>
            <h4 class="mb-2">Team 2 Score: {{ score2 }}</h4>
            <div class="grid grid-cols-6 gap-2">
              <UButton
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
              </UButton>
            </div>
          </div>
        </div>
        <div class="flex gap-2">
          <UButton
            @click="previousStep"
            color="gray"
            variant="solid"
          >
            Terug
          </UButton>
          <UButton
            @click="addMatch"
            color="green"
            variant="solid"
          >
            Wedstrijd Toevoegen
          </UButton>
        </div>
      </div>
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

<style scoped>
h2 {
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #00beeb;
  color: transparent;
}
</style>
