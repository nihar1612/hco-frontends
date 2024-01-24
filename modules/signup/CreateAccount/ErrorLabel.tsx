export function ErrorLabel({ text, className }: { text: string; className?: string }) {
  return <div className={`mt-2 text-sm font-inter text-dawnRed-500 ${className}`}>{text}</div>;
}
