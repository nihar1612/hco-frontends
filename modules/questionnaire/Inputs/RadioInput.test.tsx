import { act, fireEvent, render } from '@testing-library/react';
import { SharedStateProvider } from '../../../utils/context';
import { RadioInput } from './RadioInput';

const defaultStoreValue = {
  0: 'answeredVal',
};

const defaultOptions = [{ text: 'opt1' }, { text: 'opt2' }, { text: 'opt3' }];

describe('RadioInput', () => {
  it('should render', () => {
    const { getByText } = render(
      <SharedStateProvider initialValue={defaultStoreValue}>
        <RadioInput options={defaultOptions} questionKey="question-0" />
      </SharedStateProvider>
    );

    expect(getByText('opt1')).toBeInTheDocument();
    expect(getByText('opt2')).toBeInTheDocument();
    expect(getByText('opt3')).toBeInTheDocument();
  });
  it('should trigger the check event', () => {
    const { getByTestId } = render(
      <SharedStateProvider initialValue={defaultStoreValue}>
        <RadioInput options={defaultOptions} questionKey="question-0" />
      </SharedStateProvider>
    );

    const radio0 = getByTestId('radio-question-0-0') as HTMLInputElement;
    const radio1 = getByTestId('radio-question-0-1') as HTMLInputElement;

    expect(radio0.checked).toBe(false);
    expect(radio1.checked).toBe(false);

    act(() => {
      fireEvent.click(radio0);
    });

    expect(radio0.checked).toBe(true);
    expect(radio1.checked).toBe(false);

    act(() => {
      fireEvent.click(radio0);
      fireEvent.click(radio1);
    });

    expect(radio0.checked).toBe(false);
    expect(radio1.checked).toBe(true);
  });
});
