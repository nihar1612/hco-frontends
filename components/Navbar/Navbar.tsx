import { NavbarMenuMobile } from './NavbarMenuMobile';
import { NavbarMenuDesktop } from './NavbarMenuDesktop';

export default function Navbar({
  className,
  ctaInHeader,
  ctaText,
}: {
  className?: string;
  ctaInHeader?: boolean;
  ctaText?: string;
}) {
  return (
    <nav className={className}>
      <div className="block lg:hidden">
        <NavbarMenuMobile ctaInHeader={ctaInHeader} ctaText={ctaText} />
      </div>
      <div className="hidden lg:block">
        <NavbarMenuDesktop />
      </div>
    </nav>
  );
}
