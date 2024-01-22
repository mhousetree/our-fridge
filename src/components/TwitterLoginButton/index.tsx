import clsx from 'clsx';
import { signIn } from 'next-auth/react';
import XIcon from './logo.svg';

type Props = {
  className?: string;
};

export const TwitterLoginButton: React.FC<Props> = ({ className }) => {
  return (
    <button
      className={clsx(
        'bg-black p-2 text-white flex items-center rounded-md',
        className
      )}
      onClick={() => signIn()}
    >
      <XIcon className="w-3" />
      <span className="ml-2 text-sm">Xでログイン</span>
    </button>
  );
};
