import { NextApiRequest, NextApiResponse } from 'next';
import { getUsers } from '../utils/firestoreHelper';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== 'GET') {
      res.setHeader('Allow', ['GET']);
      res.status(405).end();
      return;
    }

    const users = await getUsers();
    res.status(200).json(users);
    return;
  } catch (error) {
    console.log(error);
    res.status(500).end();
    return;
  }
};

export default handler;
