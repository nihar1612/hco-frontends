import { render } from '@testing-library/react';
import { Question } from './Question';

describe('Question', () => {
  it('should render a question and description', () => {
    const { getByText } = render(<Question text="question text" description="sample description" />);
    expect(getByText('question text')).toBeInTheDocument();
    expect(getByText('sample description')).toBeInTheDocument();
  });
  it('should render a question without description', () => {
    const { getByText } = render(<Question text="question 2" />);
    expect(getByText('question 2')).toBeInTheDocument();
  });
});
