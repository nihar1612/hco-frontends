/* eslint-disable max-lines */
import { useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useMeasure } from 'react-use';
import { Logo } from 'components/DawnLogo/DawnLogo';
import { SingleQuestion } from 'modules/questionnaire/SingleQuestion';
import { Progressbar } from 'components/Progressbar/Progressbar';
import { Carousel, CarouselItem } from 'modules/questionnaire/Carousel';
import { getFromStorage, saveToStorage } from 'utils/storage';
import { useSharedState } from 'utils/context';
import { InfoPageComponent } from 'modules/questionnaire/InfoPage/Page';
import { SLUG_KEY, QUESTIONNAIRE_LOCALSTORAGE_KEY } from 'utils/constants';
import { ContinueButton } from 'modules/questionnaire/ContinueButton';
import { Gradient } from 'components/Gradient';
import { Checklist } from 'components/page-sections/Checklist';
import { Title } from '../InfoPage/Title';
import { useGetInsuranceData } from 'hooks/useGetInsuranceData';

interface QuestionOption {
  _key: string;
  _type: 'option';
  text: string;
  continueUrl?: string;
}

interface Question {
  _key: string;
  _type: 'question';
  description: string;
  optionType: 'checkbox' | 'radio';
  text: string;
  options: QuestionOption[];
  slug?: { _type: 'slug'; current: string };
}

interface InfoPage {
  _key: string;
  _type: 'infoPage';
  title: string;
  image: { [key: string]: any };
  imageTitle: string;
  text: { [key: string]: any };
  slug?: { _type: 'slug'; current: string };
}

interface ChecklistProps {
  _key: string;
  _type: 'checklistPageSection';
  title: string;
  gradient: boolean;
  slug?: { _type: 'slug'; current: string };
  text: { [key: string]: any };
  checklists: { [key: string]: any }[];
}

interface QuestionnaireProps {
  questionnaire: {
    _id: string;
    _type: 'questionnaire';
    _createdAt: string;
    _updatedAt: string;
    title: string;
    version: number;
    description: string;
    slug: { current: string };
    completePageSlug?: string;
    content: Array<Question | InfoPage | ChecklistProps>;
  };
}

export function Questionnaire({ questionnaire }: QuestionnaireProps) {
  const [sharedState, setSharedState] = useSharedState();
  const router = useRouter();
  const contentPages = useMemo(() => questionnaire?.content || [], [questionnaire]);
  const currentPage = contentPages.findIndex((page) => page.slug.current === router.query[SLUG_KEY]);
  let currentQuestionObject = contentPages[currentPage];

  const getQuestionKey = useCallback(
    (index) => {
      return contentPages[index]?._key;
    },
    [contentPages]
  );
  const getQuestionType = useCallback(
    (index) => {
      return contentPages[index]?._type;
    },
    [contentPages]
  );

  const sharedStateToAnswers = () => {
    return sharedState.allQuestions?.reduce((all: any, question: any) => {
      all[question._key] = {
        question: question.text,
        answer: sharedState[question._key],
        questionnaireSlug: questionnaire.slug.current,
        questionSlug: question.slug.current,
      };
      return all;
    }, {});
  };

  const currentAnswer = sharedState[getQuestionKey(currentPage)] || '';
  const { isEligibleForInsurance, residesInSupportedState } = useGetInsuranceData(sharedStateToAnswers());

  let isContinueButtonEnabled =
    getQuestionType(currentPage) === 'infoPage' ||
    getQuestionType(currentPage) === 'checklistPageSection' ||
    (currentAnswer && currentAnswer.length > 0 && currentAnswer !== false);

  const prevQuestion = useMemo(() => {
    if (!contentPages) {
      return null;
    }
    const currentPageIndex = contentPages?.findIndex(
      (page: Question | InfoPage | ChecklistProps) => page.slug.current === router.query[SLUG_KEY]
    );
    if (currentPageIndex > 0) {
      return contentPages[currentPageIndex - 1].slug.current;
    }
    return contentPages[0].slug.current;
  }, [contentPages, router.query]);

  const handleBack = useCallback(() => {
    router.push({
      pathname: `/questionnaire/${questionnaire.slug.current}`,
      query: {
        ...router.query,
        [SLUG_KEY]: prevQuestion,
      },
    });
  }, [prevQuestion, router, questionnaire.slug]);

  const [contentRef, contentAxes] = useMeasure();

  useEffect(() => {
    setSharedState({ ...sharedState, contentAxes });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentAxes, setSharedState]);

  useEffect(() => {
    // set the global state
    let answersObj = getFromStorage(QUESTIONNAIRE_LOCALSTORAGE_KEY);

    let ans: { [key: string]: any } = {};
    contentPages.forEach((page) => {
      ans[page._key] = answersObj[page._key]?.answer;
    });

    setSharedState({ ...ans, allQuestions: contentPages });
  }, [contentPages, setSharedState]);

  useEffect(() => {
    if (!router.asPath.includes(`${SLUG_KEY}=`)) {
      // Append first page query param if it doesn't exist.
      // NOTE: We can also redirect the user to last answered question here
      router.replace({
        pathname: window.location.pathname,
        query: {
          ...router.query,
          [SLUG_KEY]: contentPages[0].slug.current,
        },
      });
    }
    // Note: redirecting the user to last answered question is probably useless here as the slug could change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath]);

  function continueAction(event: any) {
    document.getElementById('top').scrollIntoView();
    event.preventDefault();
    let currentState = sharedState[getQuestionKey(currentPage)];
    const currentQuestionType = getQuestionType(currentPage);

    if (currentQuestionType === 'question' && !currentState) return;
    let answer = currentState;
    let answersObj = getFromStorage(QUESTIONNAIRE_LOCALSTORAGE_KEY);
    answersObj[getQuestionKey(currentPage)] = {
      question: currentQuestionObject.text,
      answer,
      questionnaireSlug: questionnaire.slug.current,
      questionSlug: currentQuestionObject.slug.current,
    };
    saveToStorage(QUESTIONNAIRE_LOCALSTORAGE_KEY, answersObj);
    if (currentQuestionObject._type === 'question' && currentQuestionObject.optionType === 'radio') {
      let selectedOption = currentQuestionObject.options.find((opt) => opt.text === answer);
      if (selectedOption && selectedOption.continueUrl && selectedOption.continueUrl !== '') {
        return handleNext({ nextUrl: selectedOption.continueUrl, answersObj });
      }
    }
    handleNext({ answersObj });
  }

  function handleNext({ nextUrl, answersObj }: { nextUrl?: string; answersObj: { [key: string]: any } }) {
    const routerQuery = { ...router.query };
    // Add insurance data to query params.
    for (const value of Object.values(answersObj)) {
      if (value.questionSlug === 'insurance-state' || value.questionSlug === 'insurance-plan-type' || (value.questionSlug === 'insurance-plan' && value.answer)) {
        routerQuery[value.questionSlug] = value.answer.toString();
      }
    }
    if (nextUrl) {
      router.push({
        pathname: nextUrl,
        query: {
          ...routerQuery,
        },
      });
    } else if (!contentPages[currentPage + 1]) {
      // Questionnaire complete
      delete router.query[SLUG_KEY];
      router.push({
        pathname: getCompletePagePathname(questionnaire.completePageSlug, isEligibleForInsurance, residesInSupportedState),
        query: routerQuery,
      });
      return;
    } else {
      delete routerQuery.slug;
      router.push({
        pathname: `/questionnaire/${questionnaire.slug.current}`,
        query: {
          ...routerQuery,
          [SLUG_KEY]: contentPages[currentPage + 1].slug.current,
        },
      });
    }
  }

  const progress = useMemo(() => {
    if (router.query[SLUG_KEY] && contentPages.length) {
      return (+currentPage / contentPages.length) * 100;
    }
    return 1;
  }, [router.query, contentPages, currentPage]);

  const isInvalidScreen = useMemo(() => {
    // This function checks whether the questionnaire is completed by the user
    return router.query[SLUG_KEY] && currentPage < 0;
  }, [router.query, currentPage]);

  const Questions = useMemo(
    () =>
      contentPages.map((page, index) => (
        <CarouselItem key={page._key} index={index}>
          {page._type === 'question' && (
            <SingleQuestion
              id={page._key}
              question={page.text}
              description={page.description}
              optionType={page.optionType}
              options={page.options}
            />
          )}
          {page._type === 'checklistPageSection' && (
            <div className="flex flex-col items-center w-full px-6 whitespace-normal max-w-8xl lg:px-20 lg:py-10">
              <Title>{page.title}</Title>
              <Checklist title="" text={page.text} gradient={page.gradient} checklists={page.checklists} />
            </div>
          )}
          {page._type === 'infoPage' && <InfoPageComponent content={page} />}
        </CarouselItem>
      )),
    [contentPages]
  );

  if (isInvalidScreen) {
    router.replace({
      query: {
        ...router.query,
        [SLUG_KEY]: contentPages[0].slug.current,
      },
    });
  }

  return (
    <section className="relative h-full min-h-screen overflow-hidden text-white bg-dawnDark-700">
      <style jsx global>{`
        // This prevents a white background when scrolling on mobile:
        body {
          background-color: rgba(17, 22, 30, 1);
          height: 100vh;
        }
      `}</style>
      <div className="relative z-0 hidden xl:block">
        <Gradient color="purple" scale={7} opacity={0.25} left="-50rem" />
        <Gradient color="orange" scale={8} opacity={0.15} left="-60rem" top="10rem" />
        <Gradient color="purple" scale={7} opacity={0.25} right="-30rem" top="-20rem" />
        <Gradient color="orange" scale={7} opacity={0.1} right="-40rem" top="-2rem" />
      </div>
      <div className="flex-grow bg-dawnDark-700">
        <div id="top" className="px-6 lg:px-20">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/gradient-ellipsis-1.svg" alt="" className="absolute top-0 z-0 -right-40" />
          <div className="relative z-10 flex items-center justify-center py-5 md:py-6">
            <Logo />
          </div>
          {(currentQuestionObject?._type == 'question' || currentPage > 0) && <Progressbar progress={progress} />}
        </div>
        <div className="relative z-10 h-full pt-10 md:pt-14 pb-22" ref={contentRef}>
          <div className="h-full">
            <Carousel activeIndex={currentPage}>{Questions}</Carousel>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 z-10 flex justify-center w-full px-6 backdrop-filter backdrop-blur-1.5xl border-t border-dawnDark-500 lg:border-t-0 lg:px-20 lg:py-5 lg:mb-0">
        <div className="flex flex-row w-full py-3 lg:w-1/3 lg:py-0 z-5">
          {prevQuestion !== router.query[SLUG_KEY] && (
            <div className="relative z-10 flex items-center justify-center w-20 mr-4">
              <button onClick={handleBack}>
                <div className="flex items-center md:hidden">
                  <Image src="/back.svg" alt="back-icon" height={52} width={52} />
                </div>
                <div className="hidden md:block">
                  <Image src="/back.svg" alt="back-icon" height={64} width={64} />
                </div>
              </button>
            </div>
          )}

          <div className="w-full">
            <ContinueButton action={continueAction} disabled={!isContinueButtonEnabled} />
          </div>
        </div>
      </div>
    </section>
  );
}

function getCompletePagePathname(completePageSlug: string, isEligibleForInsurance: boolean, residesInEligibleState: boolean) {
  if (isEligibleForInsurance) {
    return '/account/schedule-call';
  }
  if (!residesInEligibleState) {
    return '/unsupported-state';
  }
  if (!completePageSlug) {
    return '/questionnaire/email-prompt';
  }
  if (completePageSlug.startsWith('/')) {
    return completePageSlug;
  }
  return `/questionnaire/${completePageSlug}`;
}
