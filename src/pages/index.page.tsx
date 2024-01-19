import { Item } from '@/types/item';
import { fetchAsyncToJson } from '@/utils/fetch';
import { GetStaticProps, NextPage } from 'next';
import { Noto_Sans_JP } from 'next/font/google';

const noto = Noto_Sans_JP({ subsets: ['latin'] });

type Props = { data: Item[] };

const Home: NextPage<Props> = ({ data }) => {
  return (
    <main className={noto.className}>
      <h1>みんなの冷蔵庫</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            {item.owner}さんの{item.title}&emsp;{item.stock}個
          </li>
        ))}
      </ul>
    </main>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const data = await fetchAsyncToJson<Item[]>(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/items`
    );
    return {
      props: {
        data: data,
      },
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default Home;
