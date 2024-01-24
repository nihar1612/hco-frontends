import { useState, useEffect } from 'react';
import { Popover } from '@headlessui/react';
import classNames from 'classnames';
import { Link } from 'components/Link';
import { NavbarLogo } from './NavbarLogo';
import {
  NavbarLinksDefault,
  NavbarLinksAbout,
  navbarLinksAboutPathnames,
  NavbarLinksPages,
  navbarLinksPagesPathnames,
} from './NavbarLinks';
import { NavbarMenuMobileDisclosure } from './NavbarMenuMobileDisclosure';

export function NavbarMenuMobile({ ctaInHeader, ctaText }: { ctaInHeader?: boolean; ctaText?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('prevent-body-scroll', isOpen);
  }, [isOpen]);

  return (
    <Popover>
      {({ open }) => (
        <div
          className={classNames('flex items-center justify-between px-6 py-5', {
            'bg-dawnDark-500 fixed inset-x-0 z-20': isOpen,
          })}
        >
          <NavbarLogo width={180} />
          {/* Call to action */}
          <div
            className={classNames('pb-2', {
              hidden: !ctaInHeader,
            })}
          >
            <Link href="/questionnaire/signup-evry-v1">
              <div className="flex justify-center whitespace-nowrap">
                <a
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center flex-1 max-w-md px-4 py-2 text-sm font-medium tracking-widest text-white uppercase whitespace-nowrap getStartedNavBar bg-gradient-to-tr from-dawnOrange-500 to-dawnPurple-500 rounded-3xl"
                >
                  {ctaText ?? 'Get started'}
                </a>
              </div>
            </Link>
          </div>
          <div>
            <Popover.Button className="focus:outline-none">
              <div onClick={() => setIsOpen((isOpen) => !isOpen)}>
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                  {open ? (
                    <path
                      d="M6 6L18 18M6 18L18 6L6 18Z"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  ) : (
                    <path
                      d="M3.9751 17.975H19.9751M3.9751 5.97501H19.9751H3.9751ZM3.9751 11.975H19.9751H3.9751Z"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  )}
                </svg>
              </div>
            </Popover.Button>

            <Popover.Panel
              static
              className={classNames('absolute inset-x-0 min-h-screen h-full z-20 bg-dawnDark-500', {
                hidden: !isOpen,
              })}
            >
              <div className="flex flex-col justify-between h-full px-6 overflow-y-scroll">
                {/* Links */}
                <div className="flex flex-col pt-6 space-y-6 text-sm text-white">
                  <NavbarMenuMobileDisclosure title="How it Works" linkPathnames={navbarLinksPagesPathnames}>
                    <NavbarLinksPages
                      linkOnClick={() => setIsOpen(false)}
                      linkClassName="font-inter text-base font-normal"
                    />
                  </NavbarMenuMobileDisclosure>
                  <NavbarLinksDefault
                    linkOnClick={() => setIsOpen(false)}
                    linkClassName="pb-6 border-b border-white border-opacity-10 uppercase tracking-widest font-medium"
                  />
                </div>
                <div
                  className={classNames('mt-6 mb-20', {
                    hidden: ctaInHeader,
                  })}
                >
                  <Link href="/questionnaire/signup-evry-v1">
                    <div className="flex justify-center">
                      <a
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-center flex-1 max-w-md px-8 py-4 text-sm font-medium tracking-widest text-white uppercase getStartedNavBar bg-gradient-to-tr from-dawnOrange-500 to-dawnPurple-500 rounded-3xl"
                      >
                        Get started
                      </a>
                    </div>
                  </Link>
                </div>
              </div>
            </Popover.Panel>
          </div>
        </div>
      )}
    </Popover>
  );
}
