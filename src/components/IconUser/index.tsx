/* eslint-disable @next/next/no-img-element */
import { User } from '@/types/user';
import clsx from 'clsx';

type Props = {
  user: User;
  iconSize?: 'small' | 'large';
  isNameHidden?: boolean;
};

export const IconUser: React.FC<Props> = ({
  user,
  iconSize = 'large',
  isNameHidden = false,
}) => {
  return (
    <div className="flex items-center">
      <img
        src={user.image}
        alt={user.name}
        width="48"
        height="48"
        className={clsx('rounded-full', iconSize === 'small' ? 'w-6' : 'w-8')}
      />
      <span
        className={clsx(
          isNameHidden ? 'sp:hidden' : '',
          iconSize === 'small' ? 'ml-1' : 'ml-1.5'
        )}
      >
        {user.name}
      </span>
    </div>
  );
};
