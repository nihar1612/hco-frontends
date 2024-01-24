import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames';
import imageTechCrunchLogoMobileGray from 'public/images/landing_page/tech-crunch-logo/tech-crunch-logo-mobile-gray.png';
import imageTechCrunchLogoMobileGreen from 'public/images/landing_page/tech-crunch-logo/tech-crunch-logo-mobile-green.png';
import imageTechCrunchLogoDesktopGray from 'public/images/landing_page/tech-crunch-logo/tech-crunch-logo-desktop-gray.png';
import imageTechCrunchLogoDesktopGreen from 'public/images/landing_page/tech-crunch-logo/tech-crunch-logo-desktop-green.png';

interface ImageOnHoverProps {
  defaultImage: StaticImageData;
  onHoverImage: StaticImageData;
  width: number;
  height: number;
}
function ImageOnHover({ defaultImage, onHoverImage, width, height }: ImageOnHoverProps) {
  return (
    <div className="relative" style={{ width, height }}>
      <Image src={onHoverImage} layout="fill" alt="Tech Crunch logo" />
      <div className="transition-opacity duration-300 ease-in-out group-hover:opacity-0 group-active:opacity-0">
        <Image src={defaultImage} layout="fill" alt="Tech Crunch logo" />
      </div>
    </div>
  );
}

interface InThePressProps {
  useDarkBackground?: boolean;
}

export function InThePress({ useDarkBackground }: InThePressProps) {
  return (
    <section
      className={classNames(
        'flex justify-center px-8 py-22 md:py-30',
        `${useDarkBackground ? 'bg-dawnDark-700 text-white' : 'bg-white'}`
      )}
    >
      <div className="max-w-[822px]">
        <h2 className="text-2xl font-semibold text-center font-inter md:text-4xl">In the Press</h2>
        <Link href="https://techcrunch.com/2022/02/07/dawn-health-leverages-cognitive-behavioral-therapy-for-insomnia-to-help-you-sleep-better/">
          <a className="flex flex-col md:flex-row md:h-[240px] mt-10 md:mt-14 group">
            <div className="hidden md:block">
              <ImageOnHover
                defaultImage={imageTechCrunchLogoDesktopGray}
                onHoverImage={imageTechCrunchLogoDesktopGreen}
                width={301}
                height={240}
              />
            </div>
            <div className="mx-auto md:hidden">
              <ImageOnHover
                defaultImage={imageTechCrunchLogoMobileGray}
                onHoverImage={imageTechCrunchLogoMobileGreen}
                width={311}
                height={240}
              />
            </div>

            <div
              className={classNames(
                'md:px-8 px-6 md:-mt-0 border-l md:border-t border-b border-r rounded-b-xl md:rounded-r-xl md:border-l-0 max-w-[311px] md:max-w-none',
                `${useDarkBackground ? 'border-dawnDark-400' : 'border-dawnDark-150'}`
              )}
            >
              <p className="pt-6 text-xl font-semibold leading-8 md:text-2xl md:leading-10 md:pt-5">
                “For those whose insomnia has taken over, Dawn Health, an insomnia treatment startup, wants to put you
                back in control over your sleep.”
              </p>
              <p
                className={classNames(
                  'md:text-xl md:leading-8 font-inter mt-2 pb-6 md:pb-0 text-base',
                  `${useDarkBackground ? '' : 'text-dawnDark-500'}`
                )}
              >
                - Christine Hall, TechCrunch
              </p>
            </div>
          </a>
        </Link>
      </div>
    </section>
  );
}
