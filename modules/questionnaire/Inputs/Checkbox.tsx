import cs from 'classnames';
import { useCallback } from 'react';
import { useSharedState } from '../../../utils/context';

interface CheckboxInputProps {
  questionKey: string;
  options: { text: string }[];
}

export const CheckboxInput: React.FC<CheckboxInputProps> = ({ questionKey, options }) => {
  // eslint-disable-next-line no-unused-vars
  const [sharedState, setSharedState] = useSharedState() as [Record<string, any>, (val: unknown) => void];

  const answer = sharedState[questionKey];

  const handleCheckboxChange = useCallback(
    (e) => {
      let currentAnswers = sharedState[questionKey] || ([] as string[]);

      let index = currentAnswers.findIndex((item: string) => item === e.target.value);
      if (index < 0 && e.target.checked === true) {
        // The selected item doesn't exist in array - so Add to array
        currentAnswers.push(e.target.value);
        setSharedState({
          ...sharedState,
          [questionKey]: currentAnswers,
        });
      } else if (index >= 0 && e.target.checked === false) {
        currentAnswers.splice(index, 1);
        setSharedState({
          ...sharedState,
          [questionKey]: currentAnswers,
        });
      }
    },
    [questionKey, setSharedState, sharedState]
  );

  return (
    <>
      {options.map((opt, i) => {
        const checked = Array.isArray(answer) ? answer.includes(opt.text) : false;

        return (
          <label
            key={opt.text}
            htmlFor={`${questionKey}-${i}`}
            className={cs(
              'md:hover:bg-gradient-to-bl from-dawnOrange-500 to-dawnPurple-500 bg-dawnDark-400 p-px rounded-full lg:flex-1 lg:min-w-1/3 min-w-full h-16 leading-14 z-50 block',
              {
                'bg-gradient-to-bl': checked,
                'xl:col-span-2': options.length % 2 === 1 && i === options.length - 1,
              }
            )}
          >
            <div className="flex items-center justify-center w-full h-full p-4 text-center rounded-full bg-dawnDark-700">
              <input
                type="checkbox"
                checked={checked}
                onChange={handleCheckboxChange}
                value={opt.text}
                id={`${questionKey}-${i}`}
                data-testid={`${questionKey}-${i}`}
                className="hidden"
              />
              <span className="w-full text-base md:text-lg font-inter">{opt.text}</span>
            </div>
          </label>
        );
      })}
    </>
  );
};
