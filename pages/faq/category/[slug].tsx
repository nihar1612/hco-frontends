import Head from 'next/head';
import { groq } from 'next-sanity';
import { sanityClient } from 'lib/sanity';
import { CategoryQuestionsList } from 'modules/faq/CategoryQuestionsList';
import { Link } from 'components/Link';
import Navbar from 'components/Navbar/Navbar';
import { CallToAction } from 'components/page-sections/CallToAction';
import { FrequentlyAskedQuestion, FrequentlyAskedQuestionsCategory } from 'modules/faq/types';

interface FrequentlyAskedQuestionsCategoryProps {
  category: FrequentlyAskedQuestionsCategory;
  otherCategories: FrequentlyAskedQuestionsCategory[];
  questions: FrequentlyAskedQuestion[];
}

export default function frequentlyAskedQuestionsCategory({
  category,
  otherCategories,
  questions,
}: FrequentlyAskedQuestionsCategoryProps) {
  return (
    <>
      <Head>
        <title>{category.name} | Dawn Health</title>
        <meta name="description" content="Frequently asked question we often get about sleep." />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main className="text-dawnDark-500">
        <Navbar className="bg-dawnDark-700" />
        <div className="flex justify-center">
          <div className="flex flex-col justify-between flex-1 max-w-4xl px-6 md:flex-row py-22 md:py-30">
            <div>
              <CategoryQuestionsList category={category} questions={questions} isCategoryPage={true} />
            </div>

            {/* Categories */}
            <div>
              <div className="mt-10 md:border-l border-dawnDark-700 border-opacity-10 md:p-8 md:mt-0">
                <div className="text-xl font-semibold leading-6 md:text-2xl">Search by topic</div>
                <div className="mt-4 space-y-2">
                  {otherCategories.map((category) => (
                    <Link key={category._id} href={`/faq/category/${category.slug.current}`}>
                      <a className="block text-base font-inter md:text-xl md:leading-8 text-dawnPurple-500">
                        {category.name}
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
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

export async function getStaticPaths() {
  const query = `*[_type == 'frequentlyAskedQuestionsCategory' && defined(slug)]{ slug, 'questions': *[ _type == 'frequentlyAskedQuestion' && category._ref == ^._id ] }[ count(questions) > 0 ]`;
  const questions = await sanityClient.fetch(query, {});
  const paths = questions.map((question: any) => ({
    params: { slug: question.slug.current },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps(context: any) {
  const query = groq`
  {
    'category': *[_type == 'frequentlyAskedQuestionsCategory' && slug.current == $slug][0] {
      ...,
      'questions': *[ _type == 'frequentlyAskedQuestion' && category._ref == ^._id ]
    },
    'otherCategories': *[_type == 'frequentlyAskedQuestionsCategory' && slug.current != $slug && count(*[_type == 'frequentlyAskedQuestion' && category._ref == ^._id]) > 0]
  }
  `;
  const result = await sanityClient.fetch(query, {
    slug: context.params.slug,
  });
  const { category, otherCategories } = result;
  return { props: { category, otherCategories, questions: category.questions } };
}
