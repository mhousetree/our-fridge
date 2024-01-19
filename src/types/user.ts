import { Item } from './item';

export type User = {
  id: string;
  name: string;
  image: string;
  items: Item[] | undefined;
};
