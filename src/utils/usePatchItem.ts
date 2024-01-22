import useSWRMutation from 'swr/mutation';
import { fetchAsyncToJson } from './fetch';
import { UpdateValues } from './useUpdateForm';

const patchItem = async (url: string, { arg }: { arg: UpdateValues }) => {
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
