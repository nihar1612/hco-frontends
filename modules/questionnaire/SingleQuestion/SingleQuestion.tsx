import classNames from 'classnames';
import { Question } from 'modules/questionnaire/Question';
import { TextInput } from 'modules/questionnaire/Inputs/TextInput';
import { RadioInput } from 'modules/questionnaire/Inputs/RadioInput';
import { CheckboxInput } from 'modules/questionnaire/Inputs/Checkbox';
import { SelectInput } from 'modules/questionnaire/Inputs/SelectInput';

interface SingleQuestionProps {
  id: string;
  question: string;
  description?: string;
  optionType: string;
  options: { text: string }[];
}

export function SingleQuestion({ id, question, description, optionType, options = [] }: SingleQuestionProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full px-6 text-center whitespace-normal lg:px-20">
      <div className="w-full pb-6 lg:w-1/2 md:pb-8">
        <Question
          text={question}
          description={description ? description : optionType === 'checkbox' ? 'Choose as many as you like' : ''}
        />
      </div>
      <div
        className={classNames('flex-grow w-full lg:w-6/12 flex flex-wrap gap-4 pb-18 lg:pb-12', {
          'xl:grid xl:grid-cols-2': options.length > 4 && optionType !== 'select',
        })}
      >
        {optionType === 'text' && <TextInput questionKey={id} />}
        {optionType === 'radio' && <RadioInput questionKey={id} options={options} />}
        {optionType === 'checkbox' && <CheckboxInput questionKey={id} options={options} />}
        {optionType === 'select' && <SelectInput questionKey={id} options={options} />}
      </div>
    </div>
  );
}
