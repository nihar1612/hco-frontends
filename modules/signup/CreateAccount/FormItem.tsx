interface FormItemProps {
  label: string;
  className?: string;
  optional?: boolean;
  children: React.ReactNode;
}

export function FormItem({ label, className, optional = false, children }: FormItemProps) {
  return (
    <div className={className}>
      <label className="block pl-1 mb-2 text-base font-normal leading-8 xl:text-xl">
        {label}
        {optional && <span className="text-dawnDark-200"> (optional)</span>}
      </label>
      {children}
    </div>
  );
}
