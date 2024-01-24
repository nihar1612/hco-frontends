import Head from 'next/head';
import { sanityClient } from 'lib/sanity';
import { Link } from 'components/Link';
import { PortableText } from 'components/PortableText';
import { IntroBase } from 'components/page-sections/Intro';
import { CallToAction } from 'components/page-sections/CallToAction';
import { FrequentlyAskedQuestion as FrequentlyAskedQuestionType } from 'modules/faq/types';
import { MedicallyReviewedBy } from 'components/page-sections/MedicallyReviewedBy';

interface FrequentlyAskedQuestionProps {
  frequentlyAskedQuestion: FrequentlyAskedQuestionType;
}
export default function FrequentlyAskedQuestion({ frequentlyAskedQuestion }: FrequentlyAskedQuestionProps) {
  return (
    <>
      <Head>
        <title>{frequentlyAskedQuestion.metaTitle || `${frequentlyAskedQuestion.question} | Dawn Health`}</title>
        <meta
          name="description"
          content={frequentlyAskedQuestion.description || 'Frequently asked question we often get about sleep.'}
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main className="text-dawnDark-500">
        <IntroBase>
          <section className="flex justify-center pt-6 text-white pb-22 md:py-30">
            <h1 className="md:text-5xl text-2.5xl leading-8 md:leading-14 font-semibold text-center">
              {frequentlyAskedQuestion.question}
            </h1>
          </section>
        </IntroBase>
        <div className="flex justify-center px-6 py-20 md:py-30">
          <div className="max-w-1.5xl">
            <div className="prose lg:prose-lg xl:prose-xl font-inter">
              <PortableText blocks={frequentlyAskedQuestion.answer} />
            </div>
            {frequentlyAskedQuestion.medicallyReviewedBy && (
              <div>
                <MedicallyReviewedBy teamMember={frequentlyAskedQuestion.medicallyReviewedBy} />
              </div>
            )}
            {frequentlyAskedQuestion.relatedQuestions && (
              <div className="mt-10 md:mt-14 font-inter">
                <div className="text-2xl font-semibold md:text-4xl">Related questions</div>
                <div className="mt-4 space-y-4">
                  {frequentlyAskedQuestion.relatedQuestions.map((question: FrequentlyAskedQuestionType) => (
                    <Link key={question._id} href={`/faq/${question.slug.current}`}>
                      <a className="block md:text-xl md:leading-8">{question.question}</a>
                    </Link>
                  ))}
                  <Link href={`/faq/category/${frequentlyAskedQuestion.category.slug.current}`}>
                    <a className="block md:text-xl md:leading-8 text-dawnPurple-500">View all</a>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
        <CallToAction
          title="Cure your insomnia today."
          text="Craving good sleep? Talk to a sleep coach and find out more about Dawn’s program for curing sleep problems"
        />
      </main>
    </>
  );
}

export async function getStaticPaths() {
  const query = `*[_type == 'frequentlyAskedQuestion' && defined(slug)]{ slug }`;
  const questions = await sanityClient.fetch(query, {});
  const paths = questions.map((question: any) => ({
    params: { slug: question.slug.current },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps(context: any) {
  const query = `*[_type == 'frequentlyAskedQuestion' && slug.current == $slug][0]{ ..., medicallyReviewedBy->, category->,  "relatedQuestions": relatedQuestions[].frequentlyAskedQuestion-> }`;
  const frequentlyAskedQuestion: FrequentlyAskedQuestionType = await sanityClient.fetch(query, {
    slug: context.params.slug,
  });
  return { props: { frequentlyAskedQuestion } };
}
