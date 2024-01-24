import { FC } from 'react';
import cs from 'classnames';

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset';
}

export const Button: FC<ButtonProps> = ({ type = 'button', children, className, onClick, disabled, ...rest }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cs(
        className,
        'bg-gradient-to-bl from-dawnOrange-500 to-dawnPurple-500 rounded-full px-8 md:py-5 text-xs font-medium text-white uppercase',
        { 'opacity-40 cursor-not-allowed': disabled }
      )}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};
