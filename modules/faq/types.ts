import { TeamMember } from 'types/sanity-schema-types';

export interface FrequentlyAskedQuestionsCategory {
  _id: string;
  name: string;
  slug: { current: string };
  description: string;
}

export interface FrequentlyAskedQuestion {
  _id: string;
  question: string;
  metaTitle?: string;
  description?: string;
  answer: { [key: string]: any };
  medicallyReviewedBy?: TeamMember;
  slug: { current: string };
  category: FrequentlyAskedQuestionsCategory;
  relatedQuestions: any;
  publishedAt: string;
}

export interface FrequentlyAskedQuestionsCategorized {
  category: FrequentlyAskedQuestionsCategory;
  questions: FrequentlyAskedQuestion[];
}
