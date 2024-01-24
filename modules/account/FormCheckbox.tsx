interface FormCheckboxProps {
  children: React.ReactNode;
  className?: string;
  checked: boolean;
  onChange: () => void;
}

export default function FormCheckbox({ children, className, checked, onChange }: FormCheckboxProps) {
  return (
    <label className={['flex justify-start items-center', className].join(' ')}>
      <div
        className={[
          'w-5 h-5 rounded-sm flex flex-shrink-0 justify-center items-center',
          checked ? '' : 'border border-dawnDark-400',
        ].join(' ')}
      >
        <input type="checkbox" checked={checked} onChange={onChange} className="absolute opacity-0" />
        <svg
          viewBox="0 0 20 20"
          className={['fill-current text-dawnDark-300 w-4 h-4 pointer-events-none', checked ? 'block' : 'hidden'].join(
            ' '
          )}
        >
          <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
        </svg>
      </div>
      <div className="flex-1 ml-2 select-none">{children}</div>
    </label>
  )
}
