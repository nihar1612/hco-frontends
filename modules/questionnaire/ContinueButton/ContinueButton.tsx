import { Button } from 'components/Button/Button';

interface ContinueButtonProps {
  action: (param?: any) => void;
  disabled: boolean;
  text?: string;
}

export function ContinueButton({ action, disabled, text = 'Continue' }: ContinueButtonProps) {
  return (
    <Button
      onClick={action}
      disabled={disabled}
      className="flex items-center justify-center w-full py-4 tracking-widest"
    >
      <span className="text-sm md:text-base">{text}</span>
    </Button>
  );
}
