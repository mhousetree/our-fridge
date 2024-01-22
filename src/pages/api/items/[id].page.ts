import { updateSchema } from '@/utils/useUpdateForm';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth].page';
import { getItem, updateItem } from '../utils/firestoreHelper';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET' && req.method !== 'PATCH') {
    res.setHeader('Allow', ['GET', 'PATCH']);
    res.status(405).end();
    return;
  }

  if (req.method === 'GET') {
    const itemId = req.query.id;

    if (itemId == null || typeof itemId != 'string') {
      res.status(400).json({ message: 'Invalid parameter' });
      return;
    }

    const item = await getItem(itemId);
    res.status(200).json(item);
    return;
  }

  if (req.method === 'PATCH') {
    const session = await getServerSession(req, res, authOptions);

    try {
      if (session === null) {
        res.status(401).json({ message: 'You must be logged in.' });
        return;
      }

      const result = updateSchema.safeParse(req.body);

      if (!result.success) {
        res.status(400).json({ message: 'Invalid parameter' });
        return;
      }

      if (result.data.userId !== session.user.id) {
        res.status(403).json({ message: 'Invalid login user' });
        return;
      }

      await updateItem(result.data);
    } catch (error) {
      console.log(error);
      res.status(500).end();
      return;
    }
  }

  res.status(200).json({ message: 'Success' });
};

export default handler;
