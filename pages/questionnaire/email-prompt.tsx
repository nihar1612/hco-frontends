import { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { ContinueButton } from 'modules/questionnaire/ContinueButton';
import { Logo } from 'components/DawnLogo/DawnLogo';
import hoursOfSleepOverTimeGraphDesktop from 'public/images/questionnaire/hours_of_sleep_over_time_graph_desktop.png';
import hoursOfSleepOverTimeGraphMobile from 'public/images/questionnaire/hours_of_sleep_over_time_graph_mobile.png';
import { loadIntercom } from 'intercom-next';
import { Input } from 'modules/questionnaire/Inputs/Input';

export default function EmailPrompt() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleSubmit = async () => {
    await loadIntercom({
      appId: 'nzsfepxr',
      email: email,
    });

    window.localStorage.setItem('submittedEmail', email);

    router.push({
      pathname: '/questionnaire/complete',
      query: {
        ...router.query,
      },
    });
  };

  const handleGoBack = useCallback(() => {
    router.back();
  }, [router]);

  const isValidEmail = useMemo(() => {
    if (email === '') return true;
    return new RegExp(
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    ).test(email);
  }, [email]);

  const hasValidInput = useMemo(() => {
    if (email === '') return false;

    if (!isValidEmail) return false;
    return true;
  }, [, isValidEmail, email]);

  return (
    <section className="relative h-screen overflow-x-hidden text-white bg-dawnDark-700 md:pb-22">
      <div className="relative z-10 flex items-center justify-center pt-5">
        <Logo />
      </div>
      <div className="px-6 mt-8 lg:px-0 md:mt-18 pb-22 md:pb-0">
        <div className="pb-6">
          <div className="hidden md:flex md:align-center md:justify-center">
            <Image src="/complete.svg" height={72} width={72} alt="" />
          </div>
          <div className="flex justify-center md:hidden align-center">
            <Image src="/complete.svg" height={56} width={56} alt="" />
          </div>
        </div>
        <div className="w-full mx-auto lg:w-3/4">
          <h1 className="text-2.5xl leading-8 font-semibold text-center md:text-5xl md:leading-14">
            Dawn was made for people just like you!
          </h1>
          <p className="mt-2 text-lg leading-6 text-center md:text-xl text-dawnDark-300">
            Next up, let&apos;s get your personalized program set-up.
          </p>
        </div>
        <div className="flex justify-center mt-6">
          <Input
            className="max-w-1.5xl"
            placeholder="What's the best email for your sleep coach to use?"
            value={email}
            onChange={setEmail}
          />
        </div>
      </div>
      <div className="fixed bottom-0 z-10 flex justify-center w-full px-6 lg:px-20 bg-dawnDark-700 lg:absolute lg:mb-22 lg:bottom-0 mt-36 md:mt-18">
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
            <ContinueButton action={handleSubmit} text={'See My Results'} disabled={!hasValidInput} />
          </div>
        </div>
      </div>
    </section>
  );
}
