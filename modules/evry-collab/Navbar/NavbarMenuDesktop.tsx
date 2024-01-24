import Image from 'next/image';
import { Link } from 'components/Link';
import { NavbarMenuDesktopDropdown } from './NavbarMenuDesktopDropdown';
import { NavbarLogo } from './NavbarLogo';
import { NavbarLinksDefault, NavbarLinksPages, navbarLinksPagesPathnames } from './NavbarLinks';
import navbarGetStarted from 'public/navbar-get-started.svg';

export function NavbarMenuDesktop() {
  return (
    <div className="flex justify-center">
      <div className="flex items-center justify-between flex-1 px-10 py-5 max-w-9xl">
        <NavbarLogo />
        <div className="flex items-center">
          <NavbarMenuDesktopDropdown title="How it Works" linkPathnames={navbarLinksPagesPathnames}>
            <NavbarLinksPages linkClassName="px-4 py-2 text-lg leading-8 rounded font-inter whitespace-nowrap hover:bg-dawnDark-400 hover:bg-opacity-70" />
          </NavbarMenuDesktopDropdown>
          <div className="font-medium leading-4 tracking-widest text-white uppercase">
            <NavbarLinksDefault linkClassName="px-8 py-4" />
          </div>
          <Link href="/questionnaire/signup-evry-v1">
            <a className="ml-8">
              <Image src={navbarGetStarted} alt="Get started" />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
