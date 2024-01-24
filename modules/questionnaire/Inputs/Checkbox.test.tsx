import { act, fireEvent, render } from '@testing-library/react';
import { SharedStateProvider } from '../../../utils/context';
import { CheckboxInput } from './Checkbox';

const defaultStoreValue = {
  0: 'answeredVal',
};

const defaultOptions = [{ text: 'opt1' }, { text: 'opt2' }, { text: 'opt3' }];

describe('Checkbox', () => {
  it('should render', () => {
    const { getByText } = render(
      <SharedStateProvider initialValue={defaultStoreValue}>
        <CheckboxInput options={defaultOptions} questionKey="question-0" />
      </SharedStateProvider>
    );

    expect(getByText('opt1')).toBeInTheDocument();
    expect(getByText('opt2')).toBeInTheDocument();
    expect(getByText('opt3')).toBeInTheDocument();
  });
  it('should trigger the check event', () => {
    const { getByTestId } = render(
      <SharedStateProvider initialValue={defaultStoreValue}>
        <CheckboxInput options={defaultOptions} questionKey="question-0" />
      </SharedStateProvider>
    );

    const checkbox0 = getByTestId('question-0-0') as HTMLInputElement;
    const checkbox1 = getByTestId('question-0-1') as HTMLInputElement;

    expect(checkbox0.checked).toBe(false);
    expect(checkbox1.checked).toBe(false);

    act(() => {
      fireEvent.click(checkbox0); // check
    });

    expect(checkbox0.checked).toBe(true);
    expect(checkbox1.checked).toBe(false);

    act(() => {
      fireEvent.click(checkbox0); // un-check
      fireEvent.click(checkbox1); // check
    });

    expect(checkbox0.checked).toBe(false);
    expect(checkbox1.checked).toBe(true);
  });
});
