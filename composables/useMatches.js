import { collection } from 'firebase/firestore'
import { useFirestore, useCollection } from 'vuefire'

export default function useMatches() {
  const db = useFirestore()
  const matches = useCollection(collection(db, 'matches'), {
    once: true,
  })

  return { matches }
}
