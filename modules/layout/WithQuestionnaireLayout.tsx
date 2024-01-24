import Image from 'next/image';
import { Logo } from 'components/DawnLogo/DawnLogo';
import { Progressbar } from 'components/Progressbar/Progressbar';
import { ContinueButton } from 'modules/questionnaire/ContinueButton';
import { Gradient } from 'components/Gradient';

interface WithQuestionnaireLayoutProps {
  children: React.ReactNode;
  progress?: number;
  contentRef?: any;
  showBackButton: boolean;
  handleBack?: () => void;
  continueAction?: () => void;
  isContinueButtonDisabled: boolean;
  continueButtonText?: string;
}

export function WithQuestionnaireLayout({
  children,
  progress,
  contentRef,
  showBackButton,
  handleBack,
  continueAction,
  isContinueButtonDisabled,
  continueButtonText,
}: WithQuestionnaireLayoutProps) {
  return (
    <section className="relative h-full min-h-screen overflow-hidden text-white bg-dawnDark-700">
      {/* @ts-ignore */}
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
          {progress && <Progressbar progress={progress} />}
        </div>
        <div className="relative z-10 h-full pt-10 md:pt-14 pb-22" ref={contentRef}>
          {children}
        </div>
      </div>
      <div className="fixed bottom-0 z-10 flex justify-center w-full px-6 backdrop-filter backdrop-blur-1.5xl border-t border-dawnDark-500 lg:border-t-0 lg:px-20 lg:py-5 lg:mb-0">
        <div className="flex flex-row w-full py-3 lg:w-1/3 lg:py-0 z-5">
          {showBackButton && (
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
          {continueAction && (
            <div className="w-full">
              <ContinueButton action={continueAction} disabled={isContinueButtonDisabled} text={continueButtonText} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
