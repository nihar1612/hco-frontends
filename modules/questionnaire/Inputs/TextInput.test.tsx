import { act, fireEvent, render } from '@testing-library/react';
import { SharedStateProvider } from '../../../utils/context';
import { TextInput } from './TextInput';

const defaultStoreValue = {
  'question-0': 'answeredVal',
};

describe('TextInput', () => {
  it('should render', () => {
    const { getByPlaceholderText } = render(
      <SharedStateProvider initialValue={defaultStoreValue}>
        <TextInput questionKey="question-0" />
      </SharedStateProvider>
    );
    const input = getByPlaceholderText('Enter your answer') as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toEqual('answeredVal');
  });
  it('should trigger events', () => {
    const { getByPlaceholderText } = render(
      <SharedStateProvider initialValue={defaultStoreValue}>
        <TextInput questionKey="question-0" />
      </SharedStateProvider>
    );
    const input = getByPlaceholderText('Enter your answer') as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toEqual('answeredVal');

    act(() => {
      fireEvent.change(input, { target: { value: 'newval' } });
    });

    expect(input.value).toEqual('newval');
  });
});
