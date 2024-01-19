import { Noto_Sans_JP } from 'next/font/google';

const noto = Noto_Sans_JP({ subsets: ['latin'] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${noto.className}`}
    >
      <h1>みんなの冷蔵庫</h1>
    </main>
  );
}
