import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { Popover, Transition } from '@headlessui/react';
import { usePopper } from 'react-popper';
import classNames from 'classnames';

interface NavbarMenuDesktopDropdownProps {
  title: string;
  children: React.ReactNode;
  linkPathnames: string[];
}

export function NavbarMenuDesktopDropdown({ title, children, linkPathnames }: NavbarMenuDesktopDropdownProps) {
  const router = useRouter();
  const popperElementRef = useRef(null);
  const [buttonElement, setButtonElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);
  const { styles, attributes } = usePopper(buttonElement, popperElement, {
    placement: 'bottom-start',
    modifiers: [
      {
        name: 'arrow',
        options: {
          element: arrowElement,
        },
      },
      {
        name: 'offset',
        enabled: true,
        options: {
          offset: [0, 5],
        },
      },
    ],
  });

  // Hover logic
  const [openDropdown, setOpenDropdown] = useState(false);
  const [mouseOverButton, setMouseOverButton] = useState(false);
  const [mouseOverMenu, setMouseOverMenu] = useState(false);

  const timeoutDuration = 50;
  let timeoutButton: any;
  let timeoutMenu: any;

  const onMouseEnterButton = () => {
    clearTimeout(timeoutButton);
    setOpenDropdown(true);
    setMouseOverButton(true);
  };
  const onMouseLeaveButton = () => {
    timeoutButton = setTimeout(() => setMouseOverButton(false), timeoutDuration);
  };

  const onMouseEnterMenu = () => {
    clearTimeout(timeoutMenu);
    setMouseOverMenu(true);
  };
  const onMouseLeaveMenu = () => {
    timeoutMenu = setTimeout(() => setMouseOverMenu(false), timeoutDuration);
  };

  const show = openDropdown && (mouseOverMenu || mouseOverButton);
  return (
    <Popover>
      <Popover.Button ref={setButtonElement}>
        <div
          onClick={() => setOpenDropdown(!openDropdown)}
          onMouseEnter={onMouseEnterButton}
          onMouseLeave={onMouseLeaveButton}
          className={classNames(
            'px-8 leading-4 tracking-widest text-white uppercase h-full py-4',
            `${show || linkPathnames.includes(router.asPath) ? 'font-bold' : 'font-medium'}`
          )}
        >
          {title}
        </div>
      </Popover.Button>

      <div ref={popperElementRef} style={styles.popper} {...attributes.popper} className="z-10">
        <Transition
          show={show}
          unmount={false}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
          beforeEnter={() => setPopperElement(popperElementRef.current)}
          afterLeave={() => setPopperElement(null)}
        >
          <Popover.Panel
            onMouseEnter={onMouseEnterMenu}
            onMouseLeave={onMouseLeaveMenu}
            unmount={false}
            className="rounded bg-dawnDark-550"
            onClick={() => setOpenDropdown(!openDropdown)}
          >
            <div
              ref={setArrowElement}
              style={styles.arrow}
              className="before:rounded before:-top-2 before:w-5 before:h-5 before:transform before:rotate-45 before:bg-dawnDark-550 before:absolute"
            />
            <div className="flex flex-col p-4 text-white">{children}</div>
          </Popover.Panel>
        </Transition>
      </div>
    </Popover>
  );
}
