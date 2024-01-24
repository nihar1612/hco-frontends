import Image from 'next/image';
import { Link } from 'components/Link';
import classNames from 'classnames';
import dawnLogo from 'public/dawn-logo.svg';
import IconFacebook from 'components/icons/IconFacebook';
import IconTwitter from 'components/icons/IconTwitter';
import IconInstagram from 'components/icons/IconInstagram';

export default function Footer({ className }: { className?: string }) {
  return (
    <footer className={classNames('flex justify-center border-t border-white border-opacity-10', className)}>
      <div className="flex flex-col items-center flex-1 px-10 py-8 max-w-9xl xl:flex-row xl:justify-between">
        <div className="flex flex-col items-center xl:flex-row">
          <div className="w-24 xl:mr-14">
            <Link href="/">
              <a aria-label="Back to main page">
                <Image src={dawnLogo} alt="Dawn logo" />
              </a>
            </Link>
          </div>
          <div className="flex flex-col items-center flex-1 mt-8 space-y-8 text-sm leading-4 xl:text-base xl:flex-row xl:space-y-0 xl:space-x-14 xl:mt-0">
            <Link href="/legal/terms-of-service">
              <a className="font-medium tracking-widest text-white uppercase">Terms</a>
            </Link>
            <Link href="/legal/privacy-policy">
              <a className="font-medium tracking-widest text-white uppercase">Privacy</a>
            </Link>
            <Link href="https://www.notion.so/dawn-health/Dawn-Job-Board-c370eab65ee14522a716bc8fcbedd213">
              <a className="font-medium tracking-widest text-white uppercase">Jobs</a>
            </Link>
            <a href="mailto:team@dawn.health" className="font-medium tracking-widest text-white uppercase">
              Contact
            </a>
            <a href="#" className="font-medium tracking-widest uppercase text-dawnDark-200">
              © 2023 Sleepedy, Inc
            </a>
          </div>
        </div>
        <div className="flex items-center mt-6 space-x-12 text-white xl:mt-0">
          <Link href="https://www.facebook.com/dawnhealthapp">
            <a aria-label="Facebook">
              <IconFacebook className="w-6 h-6" />
            </a>
          </Link>
          <Link href="https://twitter.com/dawnhealthapp">
            <a aria-label="Twitter">
              <IconTwitter className="w-6 h-6" />
            </a>
          </Link>
          <Link href="https://www.instagram.com/dawnhealthapp/">
            <a aria-label="Instagram">
              <IconInstagram className="w-6 h-6" />
            </a>
          </Link>
        </div>
      </div>
    </footer>
  );
}
