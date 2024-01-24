import Head from 'next/head';
import { Intro } from 'components/page-sections/Intro';
import { CallToAction } from 'components/page-sections/CallToAction';
import { sanityClient } from 'lib/sanity';
import {
  FrequentlyAskedQuestionsCategory,
  FrequentlyAskedQuestion,
  FrequentlyAskedQuestionsCategorized,
} from 'modules/faq/types';
import { CategoryQuestionsList } from 'modules/faq/CategoryQuestionsList';

export default function FrequentlyAskedQuestions({
  frequentlyAskedQuestionsCategorized,
}: {
  frequentlyAskedQuestionsCategorized: FrequentlyAskedQuestionsCategorized[];
}) {
  return (
    <>
      <Head>
        <title>Frequently Asked Questions | Dawn Health</title>
        <meta name="description" content="Frequently asked questions we often get about sleep." />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main className="text-dawnDark-500">
        <Intro
          title="Frequently Asked Questions"
          text="Look through our FAQs to find the most commonly asked questions about Dawn and how we use the science of sleep to get you sleeping better, sooner."
          showCallToAction={false}
        />
        <div className="flex justify-center px-6 py-22 md:py-30">
          <div className="max-w-[822px] w-full">
            <div className="space-y-10 md:space-y-18">
              {frequentlyAskedQuestionsCategorized.map((faq) => (
                <CategoryQuestionsList key={faq.category._id} category={faq.category} questions={faq.questions} />
              ))}
            </div>
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

export async function getStaticProps() {
  const query = `*[_type == 'frequentlyAskedQuestion' && defined(slug)]{ ..., category->,  "relatedQuestions": relatedQuestions[].frequentlyAskedQuestion-> }`;
  const frequentlyAskedQuestions: FrequentlyAskedQuestion[] = await sanityClient.fetch(query, {});
  const frequentlyAskedQuestionsCategorized: {
    category: FrequentlyAskedQuestionsCategory;
    questions: FrequentlyAskedQuestion[];
  }[] = frequentlyAskedQuestions.reduce((acc, question) => {
    if (question.category?._id) {
      const categoryIndex = acc.findIndex(({ category }) => category._id === question.category._id);
      if (categoryIndex < 0) {
        acc.push({ category: question.category, questions: [question] });
      } else {
        acc[categoryIndex].questions.push(question);
      }
    }
    return acc;
  }, []);
  return { props: { frequentlyAskedQuestionsCategorized } };
}
