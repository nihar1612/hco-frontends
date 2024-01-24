import { useRouter } from 'next/router';
import { Link } from 'components/Link';
import classNames from 'classnames';

interface NavbarLinksProps {
  linkClassName?: string;
  linkOnClick?: () => void;
}

export function NavbarLinksDefault({ linkClassName, linkOnClick }: NavbarLinksProps) {
  const router = useRouter();
  return (
    <>
      <Link href="/faq">
        <a
          onClick={linkOnClick}
          className={classNames(linkClassName, {
            'font-bold': router.pathname.startsWith('/faq'),
          })}
        >
          FAQS
        </a>
      </Link>
      <Link href="/blog">
        <a
          onClick={linkOnClick}
          className={classNames(linkClassName, {
            'font-bold': router.pathname.startsWith('/blog'),
          })}
        >
          Blog
        </a>
      </Link>
    </>
  );
}

export const navbarLinksAboutPathnames = ['/company', '/reviews', '/employers'];
export function NavbarLinksAbout({ linkClassName, linkOnClick }: NavbarLinksProps) {
  return (
    <>
      <Link href="/company">
        <a onClick={linkOnClick} className={linkClassName}>
          Company
        </a>
      </Link>
      <Link href="/reviews">
        <a onClick={linkOnClick} className={linkClassName}>
          Reviews
        </a>
      </Link>
      <Link href="/employers">
        <a onClick={linkOnClick} className={linkClassName}>
          Enterprise
        </a>
      </Link>
    </>
  );
}

export const navbarLinksPagesPathnames = ['/insomnia-criteria', '/cbt-i-app', '/insomnia-cure', '/sleep-therapy'];
export function NavbarLinksPages({ linkClassName, linkOnClick }: NavbarLinksProps) {
  return (
    <>
      <Link href="/insomnia-criteria">
        <a onClick={linkOnClick} className={linkClassName}>
          Insomnia Criteria
        </a>
      </Link>
      <Link href="/cbt-i-app">
        <a onClick={linkOnClick} className={linkClassName}>
          CBT-I App
        </a>
      </Link>
      <Link href="/sleep-therapy">
        <a onClick={linkOnClick} className={linkClassName}>
          Sleep Therapy
        </a>
      </Link>
      <Link href="/primary-insomnia">
        <a onClick={linkOnClick} className={linkClassName}>
          Primary Insomnia
        </a>
      </Link>
      <Link href="/chronic-insomnia">
        <a onClick={linkOnClick} className={linkClassName}>
          Chronic Insomnia
        </a>
      </Link>
      <Link href="/insomnia-test">
        <a onClick={linkOnClick} className={linkClassName}>
          Insomnia Test
        </a>
      </Link>
    </>
  );
}
