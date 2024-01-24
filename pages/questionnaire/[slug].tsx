import Head from 'next/head';
import { SharedStateProvider } from 'utils/context';
import { sanityClient, usePreviewSubscription } from 'lib/sanity';
import { getSanityClient } from 'lib/sanity.server';
import { questionnairePathsQuery, questionnaireQuery } from 'groq-queries/questionnaire';
import { Questionnaire } from 'modules/questionnaire/Questionnaire';

export default function QuestionnairePage({ data, preview }: { preview: any; data: any }) {
  //console.log('123');
  const { data: questionnaire } = usePreviewSubscription(questionnaireQuery, {
    params: { slug: data.questionnaire?.slug.current },
    initialData: data.questionnaire,
    enabled: preview && data.questionnaire?.slug,
  });

 // console.log('data',data);

  return (
    <>
      <Head>
        <title>{questionnaire.title} | Dawn Health</title>
        <meta name="description" content={`Dawn health ${questionnaire.title.toLowerCase()}`} />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <SharedStateProvider>
        <Questionnaire questionnaire={questionnaire} />
      </SharedStateProvider>
    </>
  );
}

export async function getStaticPaths() {
  const questionnaires = await sanityClient.fetch(questionnairePathsQuery, {});
  const paths = questionnaires.map((questionnaire: any) => ({
    params: { slug: questionnaire.slug.current },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params, preview = false }: { params: any; preview: boolean }) {
  const questionnaire = await getSanityClient(preview).fetch(questionnaireQuery, { slug: params.slug });
  return { props: { preview, data: { questionnaire } } };
}
