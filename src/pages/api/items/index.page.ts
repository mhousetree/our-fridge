import { formSchema } from '@/pages/add/useAddForm';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth].page';
import { getItems, postItem } from '../utils/firestoreHelper';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== 'GET' && req.method !== 'POST') {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end();
      return;
    }

    if (req.method === 'GET') {
      const items = await getItems();
      res.status(200).json(items);
      return;
    }

    if (req.method === 'POST') {
      const session = await getServerSession(req, res, authOptions);

      if (session === null) {
        res.status(401).json({ message: 'You must be logged in.' });
        return;
      }

      const result = formSchema.safeParse(req.body);

      if (!result.success) {
        res.status(400).json({ message: 'Invalid parameter' });
        return;
      }

      await postItem(result.data, session.user.id);
    }
  } catch (error) {
    console.log(error);
    res.status(500).end();
    return;
  }

  res.status(200).json({ message: 'Success' });
};

export default handler;
