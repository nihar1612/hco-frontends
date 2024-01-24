import Image from 'next/image';
import { Link } from 'components/Link';
import dawnLogo from 'public/dawn-logo.svg';

interface NavbarLogoProps {
  width?: number;
}
export function NavbarLogo({ width = 107 }: NavbarLogoProps) {
  return (
    <Link href="/">
      <a aria-label="Back to main page">
        <Image src={dawnLogo} alt="Dawn logo" width={width} />
      </a>
    </Link>
  );
}
