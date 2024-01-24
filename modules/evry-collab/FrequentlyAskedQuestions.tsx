import { useState, Dispatch, SetStateAction } from 'react';
import classNames from 'classnames';

const frequentlyAskedQuestionsAndAnwesData = [
  {
    question: 'How does sleep coaching work?',
    answer: (
      <>
        <p>
          Dawn pairs you with a sleep coach that is available over chat within the app. Your coach will answer any
          questions you have and personalize the program for you based on your needs. Our coaches are trained in CBT-I
          and have helped patients adhere to a program and improve their sleep.
        </p>
        <p>
          Having a coach also ensures accountability which is the most important part of a behavioral change program.
          Our coaches will motivate, hold you accountable and ensure that you have success and meet your goals.
        </p>
        <p>
          You will have 30 minute weekly video sessions and 24x7 text access to your coach!
        </p>
      </>
    ),
  },
  {
    question: 'What kind of time commitment does Dawn require?',
    answer: (
      <>
        <p>Most of our patients use Dawn 5 minutes a day and stick to the program for 3 months.</p>
        <p>
          Dawn requires that you are able to keep a consistent wake-up time for at least 4 weeks. If you are planning
          any international travel, we recommend trying Dawn after you are over jet lag.
        </p>
      </>
    ),
  },
  {
    question: 'How much does Dawn cost?',
    answer: (
      <>
        <p>Dawn is free for Evry Health members!</p>
      </>
    ),
  },
  {
    question: 'Can I use Dawn even if I already have a therapist?',
    answer: (
      <>
        <p>
          Yes! Please tell your therapist that you plan to try a CBT-I program. Many of them are extremely supportive of
          behavioral change programs.
        </p>
      </>
    ),
  },
  {
    question: 'Do I need a smartphone to use Dawn?',
    answer: (
      <>
        <p>Dawn is currently available on Android and iOS devices. This includes iPads and Android tablets.</p>
      </>
    ),
  },
];

interface FrequentlyAskedQuestionAndAnswerProps {
  index: number;
  isExpanded: boolean;
  setExpandedIndex?: Dispatch<SetStateAction<number>>;
  question: string;
  answer: React.ReactNode;
}
const FrequentlyAskedQuestionAndAnswer = ({
  index,
  isExpanded,
  setExpandedIndex,
  question,
  answer,
}: FrequentlyAskedQuestionAndAnswerProps) => {
  return (
    <button
      onClick={() => setExpandedIndex(isExpanded ? -1 : index)}
      className="py-6 text-left text-white border-b border-white md:py-8 border-opacity-10 last:border-none"
    >
      <div className={classNames('flex items-center justify-between w-full space-x-4', { 'mb-4': isExpanded })}>
        <div className="text-xl font-medium leading-6 text-left font-inter md:text-2xl">{question}</div>
        <div>
          <svg width="17" height="10" viewBox="0 0 17 10" fill="none">
            {isExpanded ? (
              <path d="M16.5 9L8.5 0.999998L0.5 9" stroke="url(#paint0_linear)" strokeMiterlimit="10" />
            ) : (
              <path d="M0.5 1L8.5 9L16.5 1" stroke="url(#paint0_linear)" strokeMiterlimit="10" />
            )}
            <defs>
              <linearGradient
                id="paint0_linear"
                x1="0.499999"
                y1="9"
                x2="4.68789"
                y2="-3.09122"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#FF8F5B" />
                <stop offset="1" stopColor="#536DE2" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {isExpanded && (
        <div className="mr-6 overflow-hidden text-base md:text-xl">
          <div className="flex flex-col space-y-8 font-inter">{answer}</div>
        </div>
      )}
    </button>
  );
};

export default function FrequentlyAskedQuestions() {
  const [expandedIndex, setExpandedIndex] = useState(-1);
  return (
    <section className="flex justify-center py-12 mx-8 md:py-24">
      <div className="flex-1 max-w-3.5xl">
        <h2 className="text-3xl font-semibold text-left md:text-center text-white md:text-5xl">
          Frequently Asked Questions
        </h2>
        <div className="flex flex-col mt-14">
          {frequentlyAskedQuestionsAndAnwesData.map((data, index) => (
            <FrequentlyAskedQuestionAndAnswer
              key={index}
              index={index}
              isExpanded={index === expandedIndex}
              setExpandedIndex={setExpandedIndex}
              question={data.question}
              answer={data.answer}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
