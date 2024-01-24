import cs from 'classnames';
import { useCallback } from 'react';
import { useSharedState } from '../../../utils/context';

interface RadioInputProps {
  questionKey: string;
  options: { text: string }[];
}

export const RadioInput: React.FC<RadioInputProps> = ({ options, questionKey }) => {
  // eslint-disable-next-line no-unused-vars
  const [sharedState, setSharedState] = useSharedState() as [Record<string, any>, (val: unknown) => void];
  const answer = sharedState[questionKey] || false;

  const handleChange = useCallback(
    (e) => {
      setSharedState({
        ...sharedState,
        [questionKey]: e.target.value,
      });
    },
    [questionKey, setSharedState, sharedState]
  );

  return (
    <>
      {options.map((opt, i) => {
        const checked = answer === opt.text;

        return (
          <label
            key={opt.text}
            htmlFor={`${questionKey}-${i}`}
            className={cs(
              'hover:bg-gradient-to-bl from-dawnOrange-500 to-dawnPurple-500 bg-dawnDark-400 p-px rounded-full lg:flex-1 lg:min-w-1/2 min-w-full h-16 leading-14 z-50 block',
              {
                'bg-gradient-to-bl': checked,
                'xl:col-span-2': options.length % 2 === 1 && i === options.length - 1,
              }
            )}
          >
            <div className="flex items-center w-full h-full py-3 text-sm text-left rounded-full bg-dawnDark-700">
              <input
                type="radio"
                value={opt.text}
                id={`${questionKey}-${i}`}
                data-testid={`radio-${questionKey}-${i}`}
                className="hidden"
                name={questionKey}
                onChange={handleChange}
              />
              <div className="mx-4 mb-1">
                <div
                  className={cs(
                    'h-4 w-4  from-dawnOrange-500 to-dawnPurple-500 flex items-center justify-center rounded-full',
                    {
                      'border border-dawnDark-300 ': !checked,
                      'bg-gradient-to-bl ': checked,
                    }
                  )}
                >
                  <div className="bg-dawnDark-700 h-1.5 w-1.5 rounded-full"></div>
                </div>
              </div>
              <span className="w-full text-base md:text-lg font-inter">{opt.text}</span>
            </div>
          </label>
        );
      })}
    </>
  );
};
