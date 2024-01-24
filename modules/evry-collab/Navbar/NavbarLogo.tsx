import Image from 'next/image';
import { Link } from 'components/Link';
import dawnEvryLogo from 'public/evry-collab/dawn-evry-logo.svg';

interface NavbarLogoProps {
  width?: number;
}
export function NavbarLogo({ width = 235 }: NavbarLogoProps) {
  return (
    <Link href="/evry">
      <a aria-label="Back to main page">
        <Image src={dawnEvryLogo} alt="Dawn logo" width={width} />
      </a>
    </Link>
  );
}
