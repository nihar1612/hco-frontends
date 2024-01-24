import { act, fireEvent, render } from '@testing-library/react';
import { ContinueButton } from './ContinueButton';

describe('ContinueButton', () => {
  it('should render default value', () => {
    const { getByText } = render(<ContinueButton action={() => {}} disabled={false} />);
    expect(getByText('Continue')).toBeInTheDocument();
    expect(getByText('Continue').parentElement).not.toBeDisabled();
  });
  it('should render disabled button', () => {
    const { getByText } = render(<ContinueButton action={() => {}} disabled text="Next" />);
    expect(getByText('Next')).toBeInTheDocument();
    expect(getByText('Next').parentElement).toBeDisabled();
  });
  it('should render click event', () => {
    const handleClick = jest.fn();
    const { getByText } = render(<ContinueButton action={handleClick} disabled={false} text="Next" />);

    const btn = getByText('Next');
    expect(btn).toBeInTheDocument();

    act(() => {
      fireEvent.click(btn);
    });

    expect(handleClick).toBeCalledTimes(1);
  });
});
