import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames';
import TechCrunchLogo from 'public/images/landing_page/press/tech-crunch-logo.png';
import YahooLogo from 'public/images/landing_page/press/yahoo-logo.png';
import WashULogo from 'public/images/landing_page/press/wash-u-logo.png';
import TechCrunchLogoMobile from 'public/images/landing_page/press/tech-crunch-logo-mobile.png';
import YahooLogoMobile from 'public/images/landing_page/press/yahoo-logo-mobile.png';
import WashULogoMobile from 'public/images/landing_page/press/wash-u-logo-mobile.png';

export function InThePressLogos() {
  return (
    <section className={classNames('flex justify-center px-8 pt-22 md:pt-30')}>
      <div className="flex flex-col flex-wrap items-center justify-center gap-12 md:hidden">
        <h2 className="text-lg text-center font-inter text-dawnDark-200">In the Press</h2>
        <div className="flex gap-8">
          <Link
            passHref
            href="https://techcrunch.com/2022/02/07/dawn-health-leverages-cognitive-behavioral-therapy-for-insomnia-to-help-you-sleep-better/?guccounter=1"
          >
            <a>
              <Image src={TechCrunchLogoMobile} height={24} width={137} alt="Tech Crunch" />
            </a>
          </Link>
          <Link
            passHref
            href="https://sg.finance.yahoo.com/news/dawn-health-leverages-cognitive-behavioral-140003018.html"
          >
            <a>
              <Image src={YahooLogoMobile} height={24} alt="Yahoo! Finance" width={116} />
            </a>
          </Link>
        </div>
        <Link href="https://skandalaris.wustl.edu/blog/2022/01/12/dawn-health-overcome-insomnia/" passHref>
          <a>
            <Image src={WashULogoMobile} height={28} alt="Washington University St. Louis" width={210} />
          </a>
        </Link>
      </div>

      <div className="flex-wrap items-center justify-center hidden gap-12 md:flex">
        <h2 className="text-lg text-center font-inter text-dawnDark-200">In the Press</h2>
        <Link
          passHref
          href="https://techcrunch.com/2022/02/07/dawn-health-leverages-cognitive-behavioral-therapy-for-insomnia-to-help-you-sleep-better/?guccounter=1"
        >
          <a>
            <Image src={TechCrunchLogo} height={32} width={183} alt="Tech Crunch" />
          </a>
        </Link>
        <Link
          passHref
          href="https://sg.finance.yahoo.com/news/dawn-health-leverages-cognitive-behavioral-140003018.html"
        >
          <a>
            <Image src={YahooLogo} height={32} alt="Yahoo! Finance" width={155} />
          </a>
        </Link>
        <Link href="https://skandalaris.wustl.edu/blog/2022/01/12/dawn-health-overcome-insomnia/" passHref>
          <a>
            <Image src={WashULogo} height={32} alt="Washington University St. Louis" width={240} />
          </a>
        </Link>
      </div>
    </section>
  );
}
