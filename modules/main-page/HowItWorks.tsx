import Image from 'next/image';
import classNames from 'classnames';
import imageGetPersonalizedInsights from 'public/images/index_page/get_personalized_insights.png';
import imageAccessDailyLessonPlans from 'public/images/index_page/access_daily_lesson_plans.png';
import imageWorkWithASleepCoach from 'public/images/index_page/work_with_a_sleep_coach.png';
import checkmarkIcon from 'public/icons/checkmark.svg';
interface HowItWorksSectionProps {
  title: React.ReactNode;
  text: string;
  image: React.ReactNode;
  features?: string[];
  isReversed?: boolean;
}
function HowItWorksSection({ title, text, image, features, isReversed = false }: HowItWorksSectionProps) {
  return (
    <div className="flex justify-center">
      <div
        className={classNames(
          'flex justify-between w-full items-center flex-col-reverse',
          `${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'}`
        )}
      >
        <div
          className={classNames(
            'flex flex-col justify-between mt-6 text-white md:mt-0',
            `${isReversed ? 'md:ml-8' : 'md:mr-8'}`
          )}
        >
          <div className="max-w-[501px]">
            <h2 className="text-2.5xl leading-8 font-semibold md:text-5xl md:leading-14">{title}</h2>
            <p className="mt-4 max-w-[395px] text-base md:text-xl md:leading-8 font-inter">{text}</p>
          </div>
          <ul className="pt-8 md:pt-20 font-inter">
            {features?.map((featureText) => (
              <li className="md:text-xl flex content-center" style={{ listStyle: 'none' }} key={featureText}>
                <div className="mb-1">
                  <Image alt="checkmark" src={checkmarkIcon} />
                </div>
                <span className="pl-4 pt-2 md:pt-1">{featureText}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>{image}</div>
      </div>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <div className="mx-10 space-y-22 md:space-y-48">
      <HowItWorksSection
        title={
          <>
            Support from <br className="hidden md:inline-block" /> the <br className="md:hidden inline-block" /> get-go.
          </>
        }
        text="Build a strong, understanding relationship with your therapist from the very first call."
        features={[
          'Covered by most major insurances',
          'Chat access to your therapist',
          'Weekly 1-1 video therapy sessions',
        ]}
        image={<Image src={imageWorkWithASleepCoach} width="499" height="448" alt="" />}
      />
      <HowItWorksSection
        title={
          <>
            Clarity through
            <br className="hidden md:inline-block" /> understanding
          </>
        }
        text="Learn about your sleep patterns that make sleeping easier."
        image={<Image src={imageGetPersonalizedInsights} width="499" height="448" alt="" />}
        features={[
          'Live sleep performance insights',
          'Weekly sleep progress reports',
          'Compatible with many sleep trackers',
        ]}
        isReversed
      />
      <HowItWorksSection
        title={<>Confidence through education</>}
        text="Unlearn misconceptions about sleep that deter your relationship with it."
        image={<Image src={imageAccessDailyLessonPlans} width="499" height="448" alt="" />}
        features={['Daily 5-7 minute sleep lessons', 'Discover FAQs per sleep topic']}
      />
    </div>
  );
}
