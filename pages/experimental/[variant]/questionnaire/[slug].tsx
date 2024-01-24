import { ExperimentProvider } from 'lib/experiments';
import * as OriginalPage from '../../../questionnaire/[slug]';
import { sanityClient } from 'lib/sanity';
import { getSanityClient } from 'lib/sanity.server';
import { questionnairePathsQuery, questionnaireQuery } from 'groq-queries/questionnaire';
import { getStaticPathsForPath, getStaticPropsForPath } from '..';

export default function QuestionnairePage({ experiment, variant, ...rest }: any) {
  return (
    <ExperimentProvider value={{ experiment, variant }}>
      <OriginalPage.default {...rest} />
    </ExperimentProvider>
  );
}

export async function getStaticPaths() {
  const testStaticPaths = getStaticPathsForPath('/questionnaire')().paths;

  const questionnaires = await sanityClient.fetch(questionnairePathsQuery, {});

  const paths = testStaticPaths.flatMap(({ params }) =>
    questionnaires.map((questionnaire: any) => ({
      params: { slug: questionnaire.slug.current, ...params },
    }))
  );

  return { paths, fallback: false };
}

export async function getStaticProps({ params, preview = false }: { params: any; preview: boolean }) {
  const questionnaire = await getSanityClient(preview).fetch(questionnaireQuery, { slug: params.slug });
  const variantProps = getStaticPropsForPath('/questionnaire/*')({ params });

  return { props: { preview, data: { questionnaire }, ...variantProps.props } };
}
