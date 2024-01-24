import { useState } from 'react';
import { Menu } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';
import { useMeasure } from 'react-use';
import { Gradient } from 'components/Gradient';

interface OtherOption {
  buttonTitle: React.ReactNode;
  dropdownTitle: string;
  text: React.ReactNode;
}
const options: OtherOption[] = [
  {
    buttonTitle: <>Meditation</>,
    dropdownTitle: 'Meditation',
    text: (
      <>
        <p>
          Meditation can give you a sense of calm, peace and balance. It can also quickly become a sleep effort -
          something that you try to do with the expectation that it will improve your sleep. Sleep is counter-intuitive,
          the less effort you spend trying to sleep, the more it comes naturally.
        </p>
        <p className="mt-4">
          While meditation in itself isn’t harmful, doing it every night with the expectation that it should help you
          sleep can be. Everytime you try it and it doesn’t work constantly reinforces the notion that sleep is
          something that can be controlled. Dawn’s program helps you identify such sleep efforts and negative thinking
          patterns and helps you sleep better naturally.
        </p>
      </>
    ),
  },
  {
    buttonTitle: (
      <>
        Sleep <br className="hidden md:inline-block" /> Hygiene
      </>
    ),
    dropdownTitle: 'Sleep Hygiene',
    text: (
      <>
        <p>
          Sleep hygiene is very effective in treating short-term sleep problems. If you&apos;ve tried some of the common
          sleep hygiene recommendations and are still having issues with your sleep, it might be time to stop doing
          them.
        </p>
        <p className="mt-4">
          Sleep hygiene can become a sleep effort - something that you try to do with the expectation that it will
          improve your sleep. Sleep is counter-intuitive, the less effort you spend trying to sleep, the more it comes
          naturally. On the other hand when you try sleep hygiene and don&apos;t see any improvements, you are
          reinforcing that sleep is something that you can control. Dawn&apos;s program helps you identify such sleep
          efforts and negative thinking patterns and helps you sleep better naturally.
        </p>
      </>
    ),
  },
  {
    buttonTitle: <>Medication</>,
    dropdownTitle: 'Medication',
    text: (
      <>
        <p>
          Medication can help with short-term sleeping problems. However, many of them can disrupt sleep and will lose
          effectiveness as you build tolerance in the long run.
        </p>
        <p className="mt-4">
          Long-term medication use can also create a psychological dependency which can make you lose trust in your own
          body&apos;s ability to sleep on its own. If you are taking medications to sleep, talk to your physician and
          ask them if you can try Cognitive Behavioral Therapy for Insomnia (CBT-I). Many patients successfully wean off
          medication after going through a CBT-I program with supervision from their physicians.
        </p>
      </>
    ),
  },
];

interface OtherOptionsDropdownProps {
  selectedOption: OtherOption;
  setSelectedOptionIndex: (index: number) => void;
}
function OtherOptionsDropdown({ selectedOption, setSelectedOptionIndex }: OtherOptionsDropdownProps) {
  const [widthRef, { width }] = useMeasure();
  return (
    <Menu as="div" className="relative">
      {({ open }) => (
        <>
          <Menu.Button className="flex items-center top-4 focus:outline-none">
            <div className="font-bold leading-normal underline md:text-left" ref={widthRef}>
              {selectedOption.buttonTitle}
            </div>
            <div className="w-4 ml-2 md:w-6 md:ml-4">{open ? <ChevronUpIcon /> : <ChevronDownIcon />}</div>
          </Menu.Button>
          <Menu.Items as="div" className="absolute left-0 p-4 -mt-1 rounded-b-lg bg-dawnDark-550 focus:outline-none">
            {options.map((option, index) => (
              <Menu.Item key={index}>
                <button
                  style={{ width: Math.max(width - 30, 125) }}
                  className="block w-full px-2 py-2 text-base text-left text-white rounded md:px-4 md:text-lg hover:bg-dawnDark-400 font-inter"
                  onClick={() => setSelectedOptionIndex(index)}
                >
                  {option.dropdownTitle}
                </button>
              </Menu.Item>
            ))}
          </Menu.Items>
        </>
      )}
    </Menu>
  );
}

export function OtherOptions() {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  const selectedOption = options[selectedOptionIndex];
  return (
    <div className="overflow-hidden bg-dawnDark-700">
      <div className="relative hidden md:block">
        <Gradient color="purple" scale={7} opacity={0.15} left="-40rem" top="-20rem" />
        <Gradient color="orange" scale={7} opacity={0.15} left="-50rem" top="-10rem" />
        <Gradient color="purple" scale={7} opacity={0.15} right="-50rem" top="0" />
        <Gradient color="orange" scale={7} opacity={0.1} right="-40rem" top="-2rem" />
      </div>
      <div className="relative block md:hidden">
        <Gradient color="purple" scale={7} opacity={0.15} left="-38rem" top="-10rem" />
        <Gradient color="orange" scale={7} opacity={0.15} left="-40rem" top="10rem" />
      </div>
      <section className="relative flex justify-center overflow-hidden md:mx-8 py-22 md:py-30">
        <div className="flex flex-col items-center space-y-10 md:flex-row md:space-x-8 md:space-y-0">
          <div className="flex justify-center w-96">
            <div className="md:pt-12 text-2.5xl leading-8 md:text-5.5xl md:leading-18 font-bold text-white text-center md:text-left w-full">
              <div>Why does</div>
              <div className="flex justify-center w-full mt-4 md:block">
                <OtherOptionsDropdown selectedOption={selectedOption} setSelectedOptionIndex={setSelectedOptionIndex} />
              </div>
              <div className="inline-block mt-4 md:block">not work</div>
              <div className="inline-block md:hidden">&nbsp;</div>
              <div className="inline-block md:mt-4 md:block">for me?</div>
            </div>
          </div>
          <div className="bg-white rounded-xl bg-opacity-5 text-white p-6 md:p-8 max-w-1.5xl text-base md:text-xl md:leading-8 font-inter mx-6 md:mx-0">
            {selectedOption.text}
          </div>
        </div>
      </section>
    </div>
  );
}
