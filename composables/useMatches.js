import { collection, getDocs } from 'firebase/firestore'
import { useFirestore } from 'vuefire'
import { ref } from 'vue'

export default function useMatches() {
  const db = useFirestore()
  const matches = ref([])

  const fetchMatches = async () => {
    const querySnapshot = await getDocs(collection(db, 'matches'))
    matches.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  }

  return {
    matches,
    fetchMatches,
  }
}
