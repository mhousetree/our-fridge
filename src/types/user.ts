import { Timestamp } from 'firebase-admin/firestore';
import { Item } from './item';
import { News } from './news';

export type User = {
  id: string;
  name: string;
  image: string;
  items?: Item[] | undefined;
  news?: News | undefined;
  updatedAt?: Timestamp;
};
