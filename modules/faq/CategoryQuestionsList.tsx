import classNames from 'classnames';
import { FrequentlyAskedQuestion, FrequentlyAskedQuestionsCategory } from 'modules/faq/types';
import { Link } from 'components/Link';

interface CategoryQuestionsListProps {
  category: FrequentlyAskedQuestionsCategory;
  questions: FrequentlyAskedQuestion[];
  isCategoryPage?: boolean;
}
export function CategoryQuestionsList({ category, questions, isCategoryPage = false }: CategoryQuestionsListProps) {
  return (
    <div>
      <h1
        className={classNames(
          'font-semibold',
          `${isCategoryPage ? 'text-2.5xl leading-8 md:text-5xl md:leading-14' : 'text-2xl md:text-4xl'}`
        )}
      >
        {category.name}
      </h1>
      <div className="mt-6 space-y-4">
        {questions.map((question) => (
          <Link key={question._id} href={`/faq/${question.slug.current}`}>
            <a className="block text-base font-inter text-dawnDark-700 hover:text-dawnPurple-500 md:text-xl md:leading-8">
              {question.question}
            </a>
          </Link>
        ))}
        {!isCategoryPage && (
          <Link href={`/faq/category/${category.slug.current}`}>
            <a className="block text-base font-inter text-dawnPurple-500 md:text-xl md:leading-8">View all</a>
          </Link>
        )}
      </div>
    </div>
  );
}
