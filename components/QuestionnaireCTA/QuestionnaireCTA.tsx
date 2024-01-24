import Link from 'next/link';
import cs from 'classnames';

interface QuestionnaireCTAProps {
  buttonText?: string;
  className?: string;
}

export default function QuestionnaireCTA({ buttonText, className }: QuestionnaireCTAProps) {
  return (
    <Link href="/questionnaire" passHref>
      <a
        className={cs(
          className,
          'flex items-center justify-center flex-1 max-w-md font-medium md:flex-none  px-10 py-4 text-sm tracking-widest text-center text-white uppercase rounded-full getStartedSleepIssues md:py-5 md:self-start bg-gradient-to-tr from-dawnOrange-500 to-dawnPurple-500 md:text-base'
        )}
      >
        {buttonText || 'Get Started'}
      </a>
    </Link>
  );
}
