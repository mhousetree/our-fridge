import { fetchAsyncToJson } from '@/utils/fetch';
import useSWRMutation from 'swr/mutation';
import { FormValues } from './useAddForm';

const postItem = async (url: string, { arg }: { arg: FormValues }) => {
  const result = await fetchAsyncToJson(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(arg),
  });
  return result;
};

export const usePostItem = () => {
  const result = useSWRMutation('/api/items', postItem);
  return result;
};
