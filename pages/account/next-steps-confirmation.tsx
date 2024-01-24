import { useEffect, useState } from 'react';
import { Gradient } from 'components/Gradient';
import { Logo } from 'components/DawnLogo/DawnLogo';
import { InlineWidget } from 'react-calendly';
import { getFromStorage } from 'utils/storage';
import { SIGNUP_USER_DATA_KEY } from 'utils/constants';

export default function NextSteps() {
  const [userData, setUserData] = useState({ firstName: '', lastName: '', email: '' });
  useEffect(() => {
    const userDataFromLocalStorage = getFromStorage(SIGNUP_USER_DATA_KEY);
    if (userDataFromLocalStorage) {
      setUserData(userDataFromLocalStorage);
    }
  }, []);
  return (
    <section className="overflow-hidden text-white bg-dawnDark-700">
      <div className="relative hidden xl:block">
        <Gradient color="purple" scale={7} opacity={0.25} left="-50rem" />
        <Gradient color="orange" scale={8} opacity={0.15} left="-60rem" top="10rem" />
        <Gradient color="purple" scale={7} opacity={0.25} right="-30rem" top="-20rem" />
        <Gradient color="orange" scale={7} opacity={0.1} right="-40rem" top="-2rem" />
      </div>
      <div className="bg-dawnDark-700">
        <div className="relative px-6 lg:px-20">
          <div className="flex justify-center py-5 md:py-6">
            <Logo />
          </div>
          <div className="flex justify-center h-screen mt-20">
            <div>
              <h1 className="text-2.5xl leading-8 font-semibold md:text-5xl text-center md:leading-14">
                You’re all set.
              </h1>
              <p className="max-w-[279px] text-base text-center md:max-w-xl md:text-xl font-inter md:leading-8 mt-2 pb-4">
                You will receive a call from an enrollment agent. You are one step closer to sleeping better!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
