import classNames from 'classnames';
import { forwardRef } from 'react';

type InputProps = JSX.IntrinsicElements['input'];
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(props, ref) {
  const { disabled, className } = props;
  return (
    <input
      {...props}
      ref={ref}
      className={classNames(
        'rounded-dawnDefault bg-dawnDark-500 bg-opacity-30 w-full px-6 py-4 font-inter border border-dawnDark-400 placeholder-dawnDark-300 text-white text-base xl:text-xl leading-8 focus:outline-none',
        {
          'bg-dawnDark-100': disabled,
        },
        className
      )}
    />
  );
});
