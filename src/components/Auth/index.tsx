import { useSession } from 'next-auth/react';

type Props = {
  children: React.ReactNode;
};

export const Auth: React.FC<Props> = ({ children }) => {
  const { status } = useSession();

  if (status === 'loading') {
    // TODO: add loading component
    return <p>Loading</p>;
  }

  return children;
};
