import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

type Params = {
  id: string;
};

type Props = {
  data: {
    id: string;
  };
};

const PersonalPage: NextPage<Props> = ({ data }) => {
  return <h1>{data.id}の冷蔵庫</h1>;
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  if (params === undefined) {
    return {
      notFound: true,
    };
  }

  const { id } = params;

  return {
    props: {
      data: {
        id: id,
      },
    },
  };
};

export default PersonalPage;
