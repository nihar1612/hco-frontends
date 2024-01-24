import { InputHTMLAttributes, useCallback } from 'react';
import cs from 'classnames';
import { ChangeHandler } from 'react-hook-form';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  rounded?: boolean
  onChange: ChangeHandler,
}

export const Input: React.FC<InputProps> = ({
  type = 'text',
  value,
  onChange,
  rounded = true,
  className = '',
  placeholder = 'Enter your answer',
  ...rest
}) => {
  const handleChange = useCallback((e) => {
    onChange(e.target.value);
  }, []);
  return (
    // @ts-ignore
    <input
      className={cs(
        'bg-dawnDark-500 bg-opacity-30 w-full px-6 py-4 font-inter border border-dawnDark-400 placeholder-dawnDark-300 text-white text-base xl:text-xl leading-8 focus:outline-none',
        {
          'rounded-dawnDefault': rounded,
        },
        className
      )}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      type={type}
      {...rest}
    />
  );
};
