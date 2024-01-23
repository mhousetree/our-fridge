import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  // TODO: replace image
  return (
    <Html lang="ja">
      <Head>
        <title>みんなの冷蔵庫</title>
        <link
          rel="shortcut icon"
          href="https://1.bp.blogspot.com/-yaDa9ldRRuA/V5NEMg0WWFI/AAAAAAAA8hc/ZtLLiKs7M7Mu8yHA8S1I-De5KAVxisWmgCLcB/s450/kaden_reizouko_tsumekomu.png"
          type="image/x-icon"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="みんなの冷蔵庫" />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://our-fridge-online.vercel.app/"
        />
        <meta
          property="og:image"
          content="https://1.bp.blogspot.com/-yaDa9ldRRuA/V5NEMg0WWFI/AAAAAAAA8hc/ZtLLiKs7M7Mu8yHA8S1I-De5KAVxisWmgCLcB/s450/kaden_reizouko_tsumekomu.png"
        />
        <meta
          property="og:description"
          content="みんなの冷蔵庫では 「常備しておくとうれしいアイテム」のストック情報を登録したり、他のユーザーが登録したアイテムの情報を見たりすることができます。レッツ、れいぞうコミュニケーション！"
        />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@mhousetree" />
        <meta name="twitter:creator" content="@mhousetree" />
        <meta
          name="twitter:image:src"
          content="https://1.bp.blogspot.com/-yaDa9ldRRuA/V5NEMg0WWFI/AAAAAAAA8hc/ZtLLiKs7M7Mu8yHA8S1I-De5KAVxisWmgCLcB/s450/kaden_reizouko_tsumekomu.png"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
