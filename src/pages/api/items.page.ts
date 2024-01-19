import type { NextApiRequest, NextApiResponse } from 'next';
import { getItems } from './utils/firestoreHelper';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== 'GET') {
      res.setHeader('Allow', ['GET']);
      res.status(405).end();
      return;
    }

    const items = await getItems();
    res.status(200).json(items);
    return;
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};

export default handler;
