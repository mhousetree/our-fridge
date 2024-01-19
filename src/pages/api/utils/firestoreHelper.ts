import { Item } from '@/types/item';
import { getFirestore } from 'firebase-admin/firestore';
import { app } from './firebaseHelper';

const db = getFirestore(app);

export const getItems = async (): Promise<NonNullable<Item[]>> => {
  const itemsRef = db.collection('items');
  const snapshot = await itemsRef.get();

  const items: Item[] = [];
  snapshot.forEach((item) => {
    items.push({ ...item.data(), id: item.id } as Item);
  });

  return items;
};
