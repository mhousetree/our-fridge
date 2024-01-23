import { FormValues } from '@/pages/add/useAddForm';
import { FirestoreUser } from '@/types/firestore/user';
import { Item } from '@/types/item';
import { User } from '@/types/user';
import { FieldValue, getFirestore } from 'firebase-admin/firestore';
import { NotFoundError } from './NotFoundError';
import { app } from './firebaseHelper';
import { UpdateItemValues } from '@/pages/update/useUpdateItemForm';

const db = getFirestore(app);

export const getItem = async (itemId: string): Promise<NonNullable<Item>> => {
  const itemRef = db.collection('items').doc(itemId);
  const doc = await itemRef.get();

  if (!doc.exists) {
    throw new NotFoundError(`${itemId} ID not found.`);
  }

  return { ...doc.data(), id: itemId } as Item;
};

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
      throw new NotFoundError(`${userId} ID not found.`);
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

export const updateItem = async (body: UpdateItemValues): Promise<void> => {
  const { id, userId, stock } = body;
  const itemRef = db.collection('items').doc(id);
  const userRef = db.collection('users').doc(userId);

  await db.runTransaction(async (transaction) => {
    const itemDoc = await transaction.get(itemRef);
    const userDoc = await transaction.get(userRef);

    if (!itemDoc.exists) {
      throw new NotFoundError(`${id} ID's item not found.`);
    }
    if (!userDoc.exists) {
      throw new NotFoundError(`${userId} ID's item not found.`);
    }

    const items = (userDoc.data() as FirestoreUser | undefined)?.items ?? [];

    items[items.findIndex((item) => item.id === id)].stock = stock;

    transaction.update(userRef, {
      items,
      updatedAt: FieldValue.serverTimestamp(),
    });

    transaction.update(itemRef, {
      stock: stock,
      updatedAt: FieldValue.serverTimestamp(),
    });
  });
};

export const getUser = async (userId: string): Promise<NonNullable<User>> => {
  const userRef = db.collection('users').doc(userId);
  const doc = await userRef.get();

  if (!doc.exists) {
    throw new NotFoundError(`${userId} ID not found.`);
  }

  return { ...doc.data(), id: userId } as User;
};

export const getUsers = async (): Promise<NonNullable<User[]>> => {
  const usersRef = db.collection('users');
  const snapshot = await usersRef.get();

  const users: User[] = [];
  snapshot.forEach((user) => {
    users.push({ ...user.data(), id: user.id } as User);
  });

  return users;
};
