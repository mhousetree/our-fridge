import useSWRMutation from 'swr/mutation';
import { fetchAsyncToJson } from '../../utils/fetch';
import { UpdateItemValues } from './useUpdateItemForm';

const patchItem = async (url: string, { arg }: { arg: UpdateItemValues }) => {
  const result = await fetchAsyncToJson(`${url}/${arg.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(arg),
  });
  return result;
};

export const usePatchItem = () => {
  const result = useSWRMutation('/api/items', patchItem);
  return result;
};
