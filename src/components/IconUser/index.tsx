/* eslint-disable @next/next/no-img-element */
import { User } from '@/types/user';
import clsx from 'clsx';

type Props = {
  user: User;
  iconSize?: 'small' | 'large';
};

export const IconUser: React.FC<Props> = ({ user, iconSize = 'large' }) => {
  return (
    <div className="flex items-center">
      <img
        src={user.image}
        alt={user.name}
        width="48"
        height="48"
        className={clsx('rounded-full', iconSize === 'small' ? 'w-4' : 'w-8')}
      />
      <span className="ml-2">{user.name}</span>
    </div>
  );
};
