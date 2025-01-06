<script setup>
import { addDoc, collection, query, where, getDocs } from 'firebase/firestore'
import { useFirestore } from 'vuefire'
import { ref } from 'vue'

const toast = useToast()

const db = useFirestore()
const name = ref('')

const checkIfNameExists = async (name) => {
  const q = query(collection(db, 'users'), where('name', '==', name))
  const querySnapshot = await getDocs(q)
  return !querySnapshot.empty
}

const addNewUser = async () => {
  if (await checkIfNameExists(name.value)) {
    toast.add({
      title: 'Gebruiker bestaat al',
      icon: 'i-heroicons-shield-exclamation',
      description: 'Deze gebruiker bestaat al in de database',
      type: 'error',
      color: 'rose',
    })
    return
  }

  try {
    const docRef = await addDoc(collection(db, 'users'), {
      name: name.value,
      losses: 0,
      wins: 0,
      nemesis: '',
    })
    console.log('Document written with ID: ', docRef.id)
    toast.add({
      title: 'Gebruiker toegevoegd',
      icon: 'i-heroicons-check-badge',
      description: 'Gebruiker is toegevoegd aan de database',
      type: 'success',
    })
  }
  catch (e) {
    console.error('Error adding document: ', e)
  }
}
</script>

<template>
  <UContainer :ui="{ base: 'border border-px-solid border-slate-500 rounded-xl my-12 py-6', constrained: 'max-w-2xl' }">
    <h1 class="mb-6 text-xl font-bold">Gebruiker toevoegen</h1>
    <UDivider :ui="{ base: 'my-6' }" />
    <UInput v-model="name" :ui="{ base: 'mb-6' }" size="lg" />
    <UButton @click="addNewUser">Gebruiker toevoegen</UButton>
  </UContainer>
</template>
