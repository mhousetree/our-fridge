import clsx from 'clsx';
import React from 'react';

type Props = React.ComponentProps<'input'>;

export const StockFormInput = React.forwardRef<HTMLInputElement, Props>(
  ({ type, className, ...props }, ref) => {
    return (
      <input
        className={clsx(
          'py-2 px-4 rounded-full text-center bg-white',
          className
        )}
        type={type}
        ref={ref}
        {...props}
      />
    );
  }
);

StockFormInput.displayName = 'StockFormInput';
