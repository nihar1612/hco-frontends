import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getFromStorage } from 'utils/storage';
import { QUESTIONNAIRE_LOCALSTORAGE_KEY } from 'utils/constants';
import { WithQuestionnaireLayout } from 'modules/layout/WithQuestionnaireLayout';
import type { QuestionLocalStorageAnswer } from 'types/Question';

export default function InsomniaTestResult() {
  const router = useRouter();

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  function continueAction() {
    router.push({
      pathname: '/account/signup',
      query: {
        ...router.query,
      },
    });
  }

  const [score, setScore] = useState(0);
  const [scoreText, setScoreText] = useState({ text: 'Calculating...', description: 'Loading' });

  function getInsomniaTestScoreText(score: number): { text: string; description: string } {
    if (score >= 22) {
      return {
        text: 'Clinical insomnia (severe)',
        description:
          'Your answers indicates that you struggle a great deal with sleep and could benefit from getting help.',
      };
    }
    if (score >= 15) {
      return {
        text: '= Clinical insomnia (moderate severity)',
        description: 'Your answers indicates that you struggle with sleep and could benefit from getting help.',
      };
    }
    if (score >= 8) {
      return {
        text: 'Subthreshold insomnia',
        description:
          'Your answers indicates that you have some sleep difficulties but you might not fulfill the criteria for clinical insomnia.',
      };
    }
    return {
      text: 'No clinically significant insomnia',
      description: 'Based on your answers you are likely below the threshold for insomnia.',
    };
  }
  useEffect(() => {
    const allAnswers: { [key: string]: QuestionLocalStorageAnswer } = getFromStorage(QUESTIONNAIRE_LOCALSTORAGE_KEY);

    const insomniaTestAnswers = Object.values(allAnswers).filter(
      (answer) => answer.questionnaireSlug === 'insomnia-test' && answer.questionSlug.startsWith('question')
    );
    const answerValues = [
      {
        answers: ['None', 'Very Satisfied', 'Not At All Interfering', 'Not at all Noticeable', 'Not at all'],
        value: 0,
      },
      { answers: ['Mild', 'Satisfied', 'A Little', 'Barely'], value: 1 },
      { answers: ['Moderate', 'Somewhat Satisfied', 'Somewhat'], value: 2 },
      { answers: ['Severe', 'Dissatisfied', 'Much'], value: 3 },
      {
        answers: ['Very Severe', 'Very Dissatisfied', 'Very Much Interfering', 'Very Much Noticeable', 'Very Much'],
        value: 4,
      },
    ];
    const insomniaTestScore = insomniaTestAnswers.reduce((score, answerObj) => {
      for (let i = 0; i < answerValues.length; i++) {
        const answerValueObj = answerValues[i];
        if (answerValueObj.answers.includes(answerObj.answer.trim())) {
          return score + answerValueObj.value;
        }
      }
      return score;
    }, 0);
    setScore(insomniaTestScore);
    setScoreText(getInsomniaTestScoreText(insomniaTestScore));
  }, []);

  return (
    <WithQuestionnaireLayout
      progress={100}
      handleBack={handleBack}
      showBackButton={true}
      continueAction={continueAction}
      isContinueButtonDisabled={false}
      continueButtonText="Get Help Now"
    >
      <div className="px-6 mt-8 lg:px-0 md:mt-18 pb-22 md:pb-0">
        <div className="w-full mx-auto lg:w-3/4">
          <h1 className="text-2.5xl leading-8 font-semibold text-center md:text-5xl md:leading-14">
            Insomnia Test Result
          </h1>
          <div className="flex justify-center">
            <div className="max-w-md p-6 mt-6 rounded-xl bg-dawnDark-500">
              <p className="text-2xl leading-6 text-center text-white">Score: {score}</p>
              <p className="mt-6 text-xl text-center">{scoreText.text}</p>
              <p className="mt-2 text-center text-dawnDark-100">{scoreText.description}</p>
            </div>
          </div>
        </div>
      </div>
    </WithQuestionnaireLayout>
  );
}
