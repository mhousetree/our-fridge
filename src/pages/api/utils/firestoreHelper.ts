import { FormValues } from '@/pages/add/useAddForm';
import { FirestoreUser } from '@/types/firestore/user';
import { Item } from '@/types/item';
import { FieldValue, getFirestore } from 'firebase-admin/firestore';
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

export const postItem = async (
  body: FormValues,
  userId: string
): Promise<void> => {
  const itemRef = db.collection('items').doc();
  const userRef = db.collection('users').doc(userId);

  await db.runTransaction(async (transaction) => {
    const userDoc = await transaction.get(userRef);

    if (!userDoc.exists) {
      throw new Error(`${userId} ID not found.`);
    }

    const items = (userDoc.data() as FirestoreUser | undefined)?.items ?? [];

    transaction.set(itemRef, {
      ...body,
      userId,
      createdAt: FieldValue.serverTimestamp(),
    });

    transaction.update(userRef, {
      items: [
        ...items,
        { id: itemRef.id, name: body.name, stock: body.stock, userId },
      ],
      updatedAt: FieldValue.serverTimestamp(),
    });
  });
};
