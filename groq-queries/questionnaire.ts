import { groq } from 'next-sanity';

export const questionnaireQuery = groq`*[_type == 'questionnaire'&& slug.current == $slug][0]`;
export const questionnairePathsQuery = groq`*[_type == 'questionnaire' && defined(slug)]{ slug }`;
