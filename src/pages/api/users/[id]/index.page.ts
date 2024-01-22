import { NextApiRequest, NextApiResponse } from 'next';
import { NotFoundError } from '../../utils/NotFoundError';
import { getUser } from '../../utils/firestoreHelper';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    res.status(405).end();
    return;
  }

  const userId = req.query.id;

  if (userId == null || typeof userId != 'string') {
    res.status(400).json({ message: 'Invalid parameter' });
    return;
  }

  try {
    const user = await getUser(userId);
    res.status(200).json(user);
    return;
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ message: error.statusText });
      return;
    }
    res.status(500).end();
  }
};

export default handler;
