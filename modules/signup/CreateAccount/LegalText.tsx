import Link from 'next/link';
import classNames from 'classnames';

export function LegalText({ className }: { className?: string }) {
  return (
    <div className={classNames('text-sm leading-6 text-dawnDark-300 xl:col-span-2', className)}>
      By providing your email, you agree to our{' '}
      <Link href="/legal/privacy-policy">
        <a className="text-dawnOrange-400">Privacy Policy</a>
      </Link>{' '}
      and{' '}
      <Link href="/legal/terms-of-service">
        <a className="text-dawnOrange-400">Terms of Service</a>
      </Link>
      {'.'}
    </div>
  );
}
