/* eslint-disable no-unused-vars */
import { useState, useMemo, forwardRef, Dispatch, SetStateAction, Fragment } from 'react';
import { Popover, Listbox, Transition } from '@headlessui/react';
import { usePopper } from 'react-popper';
import { getCountries, getCountryCallingCode } from 'react-phone-number-input';
import PhoneInput from 'react-phone-number-input/input';
import countryNamesEn from 'react-phone-number-input/locale/en.json';
import { CountryCode } from 'libphonenumber-js/core';
import { ChevronDownIcon, CheckIcon } from '@heroicons/react/solid';
import getUnicodeFlagIcon from 'country-flag-icons/unicode';

interface FormPhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  inputRef: any;
}
export function FormPhoneNumberInput({ value, onChange, inputRef }: FormPhoneInputProps) {
  const [country, setCountry] = useState<CountryCode | undefined>('US');
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'top',
    strategy: 'fixed',
    modifiers: [
      {
        name: 'arrow',
        options: {
          element: arrowElement,
        },
      },
      {
        name: 'offset',
        options: {
          offset: [0, 14],
        },
      },
    ],
  });
  return (
    <div className="relative flex items-center border-dawnDark-400 rounded-dawnDefault">
      <div className="absolute left-0 pl-6">
        <CustomCountrySelect country={country} onChange={setCountry} />
      </div>

      <PhoneInput
        international={false}
        country={country}
        placeholder="(123) 456-7890"
        inputComponent={CustomInput}
        value={value}
        onChange={onChange}
        ref={inputRef}
      />
      <div className="absolute right-0 pr-6">
        <Popover>
          <Popover.Button className={'flex'} ref={setReferenceElement}>
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 1.99994C10.0222 1.99994 8.08879 2.58643 6.4443 3.68524C4.79981 4.78406 3.51809 6.34584 2.76121 8.1731C2.00433 10.0004 1.8063 12.011 2.19215 13.9508C2.578 15.8906 3.53041 17.6725 4.92894 19.071C6.32746 20.4695 8.10929 21.4219 10.0491 21.8078C11.9889 22.1936 13.9996 21.9956 15.8268 21.2387C17.6541 20.4819 19.2159 19.2001 20.3147 17.5556C21.4135 15.9111 22 13.9777 22 11.9999C22 10.6867 21.7413 9.38636 21.2388 8.1731C20.7363 6.95985 19.9997 5.85746 19.0711 4.92887C18.1425 4.00028 17.0401 3.26369 15.8268 2.76114C14.6136 2.2586 13.3132 1.99994 12 1.99994ZM12 19.9999C10.4178 19.9999 8.87104 19.5307 7.55544 18.6517C6.23985 17.7726 5.21447 16.5232 4.60897 15.0614C4.00347 13.5996 3.84504 11.9911 4.15372 10.4392C4.4624 8.88737 5.22433 7.4619 6.34315 6.34308C7.46197 5.22426 8.88743 4.46234 10.4393 4.15366C11.9911 3.84497 13.5997 4.0034 15.0615 4.6089C16.5233 5.2144 17.7727 6.23978 18.6518 7.55538C19.5308 8.87097 20 10.4177 20 11.9999C20 14.1217 19.1572 16.1565 17.6569 17.6568C16.1566 19.1571 14.1217 19.9999 12 19.9999Z"
                fill="#4F555F"
              />
              <path
                d="M12 8.99989C12.5523 8.99989 13 8.55218 13 7.99989C13 7.44761 12.5523 6.99989 12 6.99989C11.4477 6.99989 11 7.44761 11 7.99989C11 8.55218 11.4477 8.99989 12 8.99989Z"
                fill="#4F555F"
              />
              <path
                d="M12 9.99989C11.7348 9.99989 11.4804 10.1053 11.2929 10.2928C11.1054 10.4803 11 10.7347 11 10.9999V15.9999C11 16.2651 11.1054 16.5195 11.2929 16.707C11.4804 16.8945 11.7348 16.9999 12 16.9999C12.2652 16.9999 12.5196 16.8945 12.7071 16.707C12.8946 16.5195 13 16.2651 13 15.9999V10.9999C13 10.7347 12.8946 10.4803 12.7071 10.2928C12.5196 10.1053 12.2652 9.99989 12 9.99989Z"
                fill="#4F555F"
              />
            </svg>
          </Popover.Button>

          <Popover.Panel ref={setPopperElement} style={styles.popper} {...attributes.popper} className="z-10">
            <p className="w-[309px] p-4 text-xl bg-dawnDark-550 rounded-xl font-inter">
              Will only be used to send important appointment information and reminders
            </p>
            <div
              ref={setArrowElement}
              style={styles.arrow}
              className="before:rounded before:-top-3 before:-right-2 before:w-5 before:h-5 before:transform before:rotate-45 before:bg-dawnDark-550 before:absolute"
            />
          </Popover.Panel>
        </Popover>
      </div>
    </div>
  );
}

type CustomInputProps = JSX.IntrinsicElements['input'];
export const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(function Input(props, ref) {
  return (
    <input
      {...props}
      ref={ref}
      className="w-full py-4 text-base leading-8 text-white border pl-28 md:pl-30 rounded-dawnDefault bg-dawnDark-500 bg-opacity-30 font-inter border-dawnDark-400 placeholder-dawnDark-300 xl:text-xl focus:outline-none"
    />
  );
});
interface CustomCountrySelectProps {
  country: CountryCode;
  onChange: Dispatch<SetStateAction<CountryCode | undefined>>;
}
function CustomCountrySelect({ country, onChange }: CustomCountrySelectProps) {
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom',
    strategy: 'fixed',
  });

  const countries = useMemo(() => {
    const countries = getCountries().map((code) => ({
      code,
      name: countryNamesEn[code],
      callingCode: getCountryCallingCode(code),
      flag: getUnicodeFlagIcon(code),
    }));
    return countries.sort((a, b) => (a.name > b.name ? 1 : -1));
  }, []);

  return (
    <Listbox value={country} onChange={onChange}>
      <div className="relative">
        <Listbox.Button
          className="flex items-center space-x-1 text-sm bg-transparent border-none md:text-base font-inter focus:outline-none focus:ring-0"
          ref={setReferenceElement}
        >
          <span>
            {country} +{getCountryCallingCode(country)}
          </span>
          <ChevronDownIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
        </Listbox.Button>
        <div className="z-10" ref={setPopperElement} style={styles.popper} {...attributes.popper}>
          <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
            <Listbox.Options className="py-4 mt-1 overflow-auto rounded-xl max-h-60 font-inter bg-dawnDark-550 focus-ring-0 focus:outline-none">
              {countries.map((country) => (
                <Listbox.Option
                  key={country.code}
                  value={country.code}
                  className={({ active }) => `
                relative block px-4 text-sm py-1 cursor-pointer whitespace-nowrap
                ${active && 'bg-dawnDark-400'}
                `}
                >
                  {({ selected }) => (
                    <div className="relative flex items-center space-x-1">
                      <span className="pl-6">
                        {country.name} +{country.callingCode}
                      </span>
                      {selected && <CheckIcon className="w-4 h-4" aria-hidden="true" />}
                      {/* Placing flag with position absolute here to make search by typing first letter possible. */}
                      <div className="absolute left-0">{country.flag}</div>
                    </div>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </div>
    </Listbox>
  );
}
