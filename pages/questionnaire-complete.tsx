import { useCallback } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { ContinueButton } from 'modules/questionnaire/ContinueButton';
import { Logo } from 'components/DawnLogo/DawnLogo';
import { Gradient } from 'components/Gradient';

export default function QuestionnaireComplete() {
  const router = useRouter();
  const handleSubmit = () => {
    delete router.query.screen;
    router.push({
      pathname: '/account/signup',
      query: {
        ...router.query,
        coupon: process.env.NEXT_PUBLIC_STRIPE_DEFAULT_COUPON,
      },
    });
  };

  const handleGoBack = useCallback(() => {
    router.back();
  }, [router]);
  return (
    <section className="min-h-screen overflow-hidden text-white">
      <div className="relative z-0 hidden xl:block">
        <Gradient color="purple" scale={7} opacity={0.25} left="-50rem" />
        <Gradient color="orange" scale={8} opacity={0.15} left="-60rem" top="10rem" />
        <Gradient color="purple" scale={7} opacity={0.25} right="-30rem" top="-20rem" />
        <Gradient color="orange" scale={7} opacity={0.1} right="-40rem" top="-2rem" />
      </div>
      <style jsx global>{`
        // This prevents a white background when scrolling on mobile:
        body {
          background-color: rgba(17, 22, 30, 1);
        }
      `}</style>
      <div className="top-0 left-0 z-10 flex items-center justify-center w-full px-20 pt-5 xl:pt-6 xl:pb-8">
        <Logo />
      </div>
      <div className="flex-grow px-6 pt-8 pb-3 mb-32 lg:px-0 md:pt-14 md:pb-8">
        <div className="w-full mx-auto lg:w-3/4">
          <div className="pb-6">
            <div className="hidden md:flex md:align-center md:justify-center">
              <Image src="/complete.svg" height={72} width={72} alt="" />
            </div>
            <div className="flex justify-center md:hidden align-center">
              <Image src="/complete.svg" height={56} width={56} alt="" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-center md:text-4xl">Sleep better in 3 months!</h1>
          </div>
          <div className="pb-6 mt-4 text-lg text-center md:text-xl text-dawnDark-300">
            <p>Create an account and start sleeping better today.</p>
          </div>
        </div>
        <div className="flex items-center justify-center font-inter">
          <div className="items-center w-full p-6 bg-dawnDark-100 rounded-2xl bg-opacity-5 md:p-8 lg:w-1/2 lg:text-xl">
            <ul>
              <li className="flex mb-3 space-x-4">
                <div>
                  <svg className="w-6 h-6 text-dawnOrange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  Access our entire library of lesson plans geared to help you build a better relationship with sleep
                </div>
              </li>
              <li className="flex mb-3 space-x-4">
                <div>
                  <svg className="w-6 h-6 text-dawnOrange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>Get personalized insights about your sleep habits</div>
              </li>
              <li className="flex space-x-4">
                <div>
                  <svg className="w-6 h-6 text-dawnOrange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>Receive 1:1 support from a sleep coach throughout your sleep program</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 z-10 flex justify-center w-full px-6 backdrop-filter backdrop-blur-1.5xl border-t border-dawnDark-500 lg:px-20 lg:mb-13">
        <div className="flex flex-row w-full py-3 lg:w-1/3 lg:py-0 z-5">
          <div className="relative z-10 flex items-center justify-center w-20 mr-4">
            <button onClick={handleGoBack}>
                <div className="flex items-center md:hidden">
                  <Image src="/back.svg" alt="back-icon" className="" height={52} width={52} />
                </div>
                <div className="flex items-center hidden md:block">
                  <Image src="/back.svg" alt="back-icon" className="" height={64} width={64} />
                </div>
            </button>
          </div>
          <div className="w-full">
            <ContinueButton action={handleSubmit} disabled={false} text={'Create an account'} />
          </div>
        </div>
      </div>
    </section>
  );
}
