import { useCallback } from 'react';
import { useSharedState } from '../../../utils/context';

interface SelectInputProps {
  questionKey: string;
  options: { text: string }[];
}

export function SelectInput({ questionKey, options }: SelectInputProps) {
  // eslint-disable-next-line no-unused-vars
  const [sharedState, setSharedState] = useSharedState() as [Record<string, any>, (val: unknown) => void];
  const answer = sharedState[questionKey] || '';

  const onChange = useCallback(
    (event) => {
      setSharedState({
        ...sharedState,
        [questionKey]: event.target.value,
      });
    },
    [questionKey, setSharedState, sharedState]
  );
  return (
    <div className="w-full">
      <select
        onChange={onChange}
        value={answer}
        className="w-full max-w-xl px-6 py-4 border rounded-full bg-dawnDark-700 border-dawnDark-400 focus:outline-none placeholder-dawnDark-300"
      >
        <option value="" disabled selected hidden>
          Please select
        </option>
        {options.map((option, index) => (
          <option key={index}>{option.text}</option>
        ))}
      </select>
    </div>
  );
}
