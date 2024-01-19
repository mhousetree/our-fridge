import { FetchError } from './FetchError';

const checkStatus = (res: Response): Response => {
  if (!res.ok) {
    throw new FetchError(res);
  }

  return res;
};

export const fetchAsync = async (
  ...params: Parameters<typeof fetch>
): Promise<Response> => fetch(...params).then(checkStatus);

export const fetchAsyncToJson = async <T>(
  ...params: Parameters<typeof fetchAsync>
): Promise<T> => fetchAsync(...params).then((res) => res.json() as T);
