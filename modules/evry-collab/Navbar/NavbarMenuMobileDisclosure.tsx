import { useRouter } from 'next/router';
import classNames from 'classnames';
import { Disclosure, Transition } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/solid';

interface NavbarMenuMobileDisclosureProps {
  title: string;
  children: React.ReactNode;
  linkPathnames: string[];
}

export function NavbarMenuMobileDisclosure({ title, children, linkPathnames }: NavbarMenuMobileDisclosureProps) {
  const router = useRouter();
  return (
    <div className="pb-6 border-b border-white border-opacity-10">
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex items-center justify-between w-full hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-dawnDark-500 focus-visible:ring-opacity-75">
              <span
                className={classNames(
                  'text-sm tracking-widest text-white uppercase',
                  `${open || linkPathnames.includes(router.asPath) ? 'font-bold' : 'font-medium'}`
                )}
              >
                {title}
              </span>
              <ChevronUpIcon className={`${open ? '' : 'transform rotate-180'} w-5 h-5`} />
            </Disclosure.Button>
            <Transition
              show={open}
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Disclosure.Panel static className="flex flex-col mt-8 mb-4 space-y-8">
                {children}
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </div>
  );
}
