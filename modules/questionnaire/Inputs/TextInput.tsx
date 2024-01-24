import { useCallback } from 'react';
import { useSharedState } from '../../../utils/context';

interface TextInputProps {
  questionKey: string;
}

export const TextInput: React.FC<TextInputProps> = ({ questionKey }) => {
  // eslint-disable-next-line no-unused-vars
  const [sharedState, setSharedState] = useSharedState() as [Record<string, any>, (val: unknown) => void];
  const answer = sharedState[questionKey] || '';

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
    <input
      className="w-full p-4 mb-4 text-sm text-white border rounded-full bg-dawnDark-700 border-dawnDark-400 placeholder-dawnDark-300 focus:outline-none"
      placeholder="Enter your answer"
      value={answer}
      onChange={handleChange}
    />
  );
};
