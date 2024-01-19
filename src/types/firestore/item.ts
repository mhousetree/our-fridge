import { Item } from '../item';

export type FirestoreItem = Omit<Item, 'id'>;
