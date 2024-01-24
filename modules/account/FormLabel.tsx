interface FormLabelProps {
  children: React.ReactNode,
  htmlFor: string;
}

export default function FormLabel({ children, htmlFor }: FormLabelProps) {
  return <label htmlFor={htmlFor} className="block text-sm tracking-wide mb-1">{children}</label>
}
