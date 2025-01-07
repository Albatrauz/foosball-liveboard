import { collection } from 'firebase/firestore'
import {useCollection, useFirestore} from 'vuefire'

export default function useUsers() {
  const db = useFirestore()
  const users = useCollection(collection(db, 'users'))

  return { users }
}
