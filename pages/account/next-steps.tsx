import { useEffect, useState } from 'react';
import { Gradient } from 'components/Gradient';
import { Logo } from 'components/DawnLogo/DawnLogo';
import { InlineWidget } from 'react-calendly';
import { getFromStorage } from 'utils/storage';
import { SIGNUP_USER_DATA_KEY } from 'utils/constants';
import { GetServerSidePropsContext } from 'next';

interface NextStepsProps {
  calendlyUrl: string;
}
export default function NextSteps({ calendlyUrl }: NextStepsProps) {
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
          <div className="flex justify-center ">
            <div>
              <div className="text-2.5xl leading-8 font-semibold md:text-5xl text-center md:leading-14">
                <div>Welcome to Dawn.</div>
                <div>Here’s what’s next.</div>
              </div>
              {/* <p className="max-w-[279px] text-base text-center md:max-w-xl md:text-xl font-inter md:leading-8 mt-2">
                Finish setting up your profile with us by checking the instructions we’ve sent to your number.
              </p> */}
              <p className="max-w-[279px] text-base text-center md:max-w-xl md:text-xl font-inter md:leading-8 mt-2 pb-4">
                One of our enrollment coordinators will reach out to you at the number provided to
                finish setting up your account and schedule your first session.
              </p>
              <div>
                <InlineWidget
                  url={calendlyUrl}
                  prefill={{
                    name: userData.firstName && userData.lastName ? `${userData.firstName} ${userData.lastName}` : '',
                    email: userData.email,
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                  }}
                  pageSettings={{
                    backgroundColor: '11161E',
                    hideEventTypeDetails: true,
                    hideLandingPageDetails: false,
                    primaryColor: 'FF8F5B',
                    textColor: 'ffffff',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const query = Object.entries(context.query);
  const url = new URL('https://calendly.com/dawn-health/dawn-onboarding-call/');
  if (query.length > 0) {
    for (const [key, value] of query) {
      url.searchParams.append(key, value.toString());
    }
  }
  return {
    props: { calendlyUrl: url.href }, // will be passed to the page component as props
  };
}
