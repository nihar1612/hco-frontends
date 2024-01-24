import { useCallback } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { ContinueButton } from 'modules/questionnaire/ContinueButton';
import { Logo } from 'components/DawnLogo/DawnLogo';
import hoursOfSleepOverTimeGraphDesktop from 'public/images/questionnaire/hours_of_sleep_over_time_graph_desktop.png';
import hoursOfSleepOverTimeGraphMobile from 'public/images/questionnaire/hours_of_sleep_over_time_graph_mobile.png';

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
    <section className="relative h-screen overflow-x-hidden text-white bg-dawnDark-700 md:pb-0">
      <div className="relative z-10 flex items-center justify-center pt-5">
        <Logo />
      </div>
      <div className="px-6 mt-8 lg:px-0 md:mt-8 pb-22 md:pb-0">
        <div className="w-full mx-auto lg:w-3/4">
          <h1 className="text-2.5xl leading-8 font-semibold text-center md:text-5xl md:leading-14">
            Sleep better in 3 months!
          </h1>
          <p className="mt-2 text-lg leading-6 text-center md:text-xl text-dawnDark-300">
            Create an account and start sleeping better today.
          </p>
        </div>
        <div className="flex justify-center mt-6">
          <div className="hidden md:block">
            <Image src={hoursOfSleepOverTimeGraphDesktop} height={414} width={601} alt="" />
          </div>
          <div className="md:hidden">
            <Image src={hoursOfSleepOverTimeGraphMobile} height={367} width={327} alt="" />
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 z-10 flex justify-center w-full px-6 lg:px-20 bg-dawnDark-700 lg:static lg:bottom-auto mt-36 md:mt-12">
        <div className="flex flex-row w-full py-3 lg:w-1/3 lg:py-0 bg-dawnDark-700 z-5">
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
          <div className="w-full h-full">
            <ContinueButton action={handleSubmit} disabled={false} text={'Create an account'} />
          </div>
        </div>
      </div>
    </section>
  );
}
