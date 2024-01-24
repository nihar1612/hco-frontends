import { render } from '@testing-library/react';
import { SingleQuestion } from './SingleQuestion';
import { SharedStateProvider } from '../../../utils/context';

describe('SingleQuestion', () => {
  it('should render the text component', () => {
    const screen = render(
      <SharedStateProvider>
        <SingleQuestion id="1" question="question title" description="description" optionType="text" options={[]} />
      </SharedStateProvider>
    );

    expect(screen.getByText('question title')).toBeInTheDocument();
    expect(screen.getByText('description')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your answer')).toBeInTheDocument();
  });
  it('should render the checkbox component', () => {
    const screen = render(
      <SharedStateProvider>
        <SingleQuestion
          id="1"
          question="question title"
          optionType="checkbox"
          options={[{ text: 'option 1' }, { text: 'option 2' }]}
        />
      </SharedStateProvider>
    );

    expect(screen.getByText('question title')).toBeInTheDocument();
    expect(screen.getByText('option 1')).toBeInTheDocument();
    expect(screen.getByText('option 2')).toBeInTheDocument();
  });
  it('should render the radio component', () => {
    const screen = render(
      <SharedStateProvider>
        <SingleQuestion
          id="question1"
          question="question title"
          description="description"
          optionType="radio"
          options={[{ text: 'radio 1' }, { text: 'radio 2' }]}
        />
      </SharedStateProvider>
    );

    expect(screen.getByText('question title')).toBeInTheDocument();
    expect(screen.getByText('description')).toBeInTheDocument();
    expect(screen.getByText('radio 1')).toBeInTheDocument();
    expect(screen.getByText('radio 2')).toBeInTheDocument();
    expect(screen.getByTestId('radio-question1-0')).toBeInTheDocument();
    expect(screen.getByTestId('radio-question1-1')).toBeInTheDocument();
  });
});
