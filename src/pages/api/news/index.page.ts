import { Timestamp } from 'firebase-admin/firestore';
import { NextApiRequest, NextApiResponse } from 'next';
import { getUsersSortByUpdate } from '../utils/firestoreHelper';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== 'GET') {
      res.setHeader('Allow', ['GET']);
      res.status(405).end();
      return;
    }

    const users = await getUsersSortByUpdate();

    const news = users.map((user) => {
      return {
        userName: user.name,
        news: user.news,
        updatedAt: new Timestamp(
          user.updatedAt!.seconds,
          user.updatedAt!.nanoseconds
        ),
      };
    });

    res.status(200).json(news);
    return;
  } catch (error) {
    console.log(error);
    res.status(500).end();
    return;
  }
};

export default handler;
