import { FaceSmileIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';

type Props = {
  children: React.ReactNode;
};

export const Auth: React.FC<Props> = ({ children }) => {
  const { status } = useSession();

  if (status === 'loading') {
    return (
      <div className="h-96 w-full flex items-center justify-center">
        <FaceSmileIcon className="animate-spin w-12" />
      </div>
    );
  }

  return children;
};
