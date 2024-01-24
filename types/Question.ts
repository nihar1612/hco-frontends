export interface Option {
  text: string;
  _key: string;
  continueUrl?: string;
}

export interface Question {
  _key: string;
  text: string;
  description: string;
  optionType: 'checkbox' | 'radio' | 'text';
  options?: Option[];
}

export interface QuestionLocalStorageAnswer {
  answer: string;
  question: string;
  questionnaireSlug: string;
  questionSlug: string;
}
