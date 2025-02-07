import { collection, doc, deleteDoc } from 'firebase/firestore';

import { useFirestore, useCollection } from 'vuefire';

function useMatches() {
  const db = useFirestore();
  const matches = useCollection(collection(db, 'matches'), {
    once: true,
  });

  return { matches };
}

function deleteMatch(id) {
  const db = useFirestore();
  const matchRef = doc(db, 'matches', id);
  return deleteDoc(matchRef);
}

export { useMatches, deleteMatch };
