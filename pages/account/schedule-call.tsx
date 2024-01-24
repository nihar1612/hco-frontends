/* eslint-disable max-lines */
import { GetServerSidePropsContext } from 'next';
import { dedupExchange, fetchExchange } from 'urql';
import { withUrqlClient } from 'next-urql';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Logo } from 'components/DawnLogo/DawnLogo';
import { urqlUrl, cacheExchange } from 'lib/urql/urqlClient';
import { CreateAccountWithInsuranceInfo } from 'modules/signup/CreateAccount';
import { Progressbar } from 'components/Progressbar/Progressbar';
import { Question } from 'modules/questionnaire/Question';
import { Accordion, AccordionHeading } from 'modules/account/Accordion';
import { useState } from 'react';
import { InlineWidget, useCalendlyEventListener } from 'react-calendly';
import { useRouter } from 'next/router';
import { FORM_STYLE } from 'modules/signup/CreateAccount/constants';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

interface SignupPageProps {
  insuranceState: keyof typeof STATE_TO_CALENDLY;
  sessionId: string | undefined;
  insurancePlan: string;
  userAccountInfo?: { [key: string]: any };
  eventDate?: string;
}

interface UserAccountDefaultProps {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  insuranceMemberId?: string;
  insuranceGroupId?: string;
}

/* const STATE_TO_CALENDLY = {
  Texas: 'https://calendly.com/dawn-health/dawn-therapy-session-texas?hide_gdpr_banner=1',
  Florida: 'https://calendly.com/dawn-health/dawn-therapy-session-florida?hide_gdpr_banner=1',
  Illinois: 'https://calendly.com/dawn-health/dawn-therapy-session-illinois?hide_gdpr_banner=1',
};

function getCalendlyLink(state: keyof typeof STATE_TO_CALENDLY, plan: string) {
  if (['Blue Cross Blue Shield', 'Anthem'].includes(plan) && state === 'Texas') {
    return 'https://calendly.com/dawn-health/dawn-therapy-session-texas-blue-cross?hide_gdpr_banner=1';
  }

  return STATE_TO_CALENDLY[state];
} */

const STATE_TO_CALENDLY = {
  Texas: 'https://calendly.com/admin-pau/dawn-therapy-session-texas?hide_gdpr_banner=1',
  Florida: 'https://calendly.com/admin-pau/dawn-therapy-session-florida?hide_gdpr_banner=1',
  Illinois: 'https://calendly.com/admin-pau/dawn-therapy-session-illinois?hide_gdpr_banner=1',
};


function getCalendlyLink(state: keyof typeof STATE_TO_CALENDLY, plan: string) {
  if (['Blue Cross Blue Shield', 'Anthem'].includes(plan) && state === 'Texas') {
    return 'https://calendly.com/admin-pau/dawn-therapy-session-texas-blue-cross?hide_gdpr_banner=1';
  }

  return STATE_TO_CALENDLY[state];
}

function CreateAccountWithScheduleCall({
  insuranceState,
  sessionId,
  insurancePlan,
  userAccountInfo,
  eventDate,
}: SignupPageProps) {
  // const [selectedCallTime, setSelectedCallTime] = useState<Date>(undefined);
  const [currentSection, setCurrentSection] = useState<'scheduleCall' | 'register'>(
    sessionId ? 'register' : 'scheduleCall'
  );
  const router = useRouter();
  const selectedCallTime = eventDate && new Date(eventDate);

  useCalendlyEventListener({
    onProfilePageViewed: () => console.log('onProfilePageViewed'),
    onDateAndTimeSelected: () => window.dataLayer.push({ event: 'calendly_appointment_selected' }),
    onEventTypeViewed: () => console.log('onEventTypeViewed'),
    onEventScheduled: (event) => {
      router.query.sessionId = event.data.payload.event.uri.split('/').pop();
      router.query.inviteeId = event.data.payload.invitee.uri.split('/').pop();
      router.push(router);
      setCurrentSection('register');
    },
  });

  return (
    <section className="relative h-full min-h-screen overflow-hidden text-white bg-dawnDark-700">
      <style jsx global>{`
        // This prevents a white background when scrolling on mobile:
        body {
          background-color: rgba(17, 22, 30, 1);
          height: 100vh;
        }
      `}</style>
      {/* <div className="relative hidden">
        <Gradient color="purple" scale={7} opacity={0.25} left="-50rem" />
        <Gradient color="orange" scale={8} opacity={0.15} left="-60rem" top="10rem" />
        <Gradient color="purple" scale={7} opacity={0.25} right="-30rem" top="-20rem" />
        <Gradient color="orange" scale={7} opacity={0.1} right="-40rem" top="-2rem" />
      </div> */}
      <div className="flex-grow pb-24 bg-dawnDark-700">
        <div id="top" className="">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {/* <img src="/gradient-ellipsis-1.svg" alt="" className="absolute top-0 z-0 -right-40" /> */}
          <div className="relative z-10 flex items-center justify-center py-5 md:py-6">
            <Logo />
          </div>
          <Progressbar progress={95} />
        </div>
        <div className="flex flex-col items-center w-full px-6 pt-10 whitespace-normal lg:px-20 lg:py-10">
          <div className="flex flex-col items-center justify-center w-full text-center whitespace-normal lg:px-20">
            <div className="w-full pb-6 lg:w-1/2 md:pb-8">
              <Question
                text={`View Therapist Availability`}
                description="Select a day and time, then input your insurance information to book your first call with a therapist."
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col m-auto md:max-w-2xl md:m-auto">
          <div className="px-6 md:px-0">
            <Accordion isOpen={currentSection === 'scheduleCall'}>
              <div
                className={currentSection !== 'scheduleCall' ? 'mb-8' : 'z-10'}
              // onClick={() => setCurrentSection('scheduleCall')}
              >
                <AccordionHeading number={1} headerText="Availability" />
              </div>
              <div className="z-10">
                <div className="text-center text-dawnDark-300 font-inter">
                  Your appointment time will be held for 30 minutes while we confirm your
                  scheduling and insurance details.
                </div>
                <div className='hidden md:block'>
                  {insuranceState && (
                    <InlineWidget
                      url={getCalendlyLink(insuranceState, insurancePlan)}
                      prefill={
                        {
                          // email: userData.email,
                        }
                      }
                      pageSettings={{
                        backgroundColor: '11161E',
                        hideEventTypeDetails: true,
                        hideLandingPageDetails: false,
                        primaryColor: 'FF8F5B',
                        textColor: 'ffffff',
                      }}
                    />
                  )}
                </div>
                <div className='block md:hidden'>
                  {insuranceState && (
                    <InlineWidget
                      url={getCalendlyLink(insuranceState, insurancePlan)}
                      prefill={
                        {
                          // email: userData.email,
                        }
                      }
                      pageSettings={{
                        backgroundColor: '11161E',
                        hideEventTypeDetails: true,
                        hideLandingPageDetails: false,
                        primaryColor: 'FF8F5B',
                        textColor: 'ffffff',
                      }}
                      styles={{
                        height: '1000px'
                      }}
                    />
                  )}
                </div>
              </div>
              {/* <ScheduleCall
                setCallDate={(date) => {
                  setSelectedCallTime(date);
                  setCurrentSection('register');
                }}
              /> */}
            </Accordion>
            {currentSection !== 'scheduleCall' && selectedCallTime && (
              <>
                <input
                  className={FORM_STYLE + ' my-2 md:max-w-2xl md:m-auto'}
                  value={`${selectedCallTime.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })} @ ${selectedCallTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })}`}
                  type="text"
                  placeholder="Doe"
                  readOnly
                // onClick={() => setCurrentSection('scheduleCall')}
                />
              </>
            )}
          </div>
          <Accordion isOpen={currentSection === 'register'}>
            <div className="px-6 md:px-0">
              <AccordionHeading number={2} headerText="Finish Scheduling" />
            </div>
            <div className="block px-6 my-4 text-sm lg:px-0 font-inter text-dawnDark-300">
              Don&apos;t want to enter this info? Call us at{' '}
              <a className="font-bold" href="tel:+19362650766">
                +1 (936)-265-0766
              </a>
              .
            </div>
            <CreateAccountWithInsuranceInfo userAccountDefaultInfo={userAccountInfo} />
          </Accordion>
        </div>
      </div>
    </section>
  );
}

export function Page({ insuranceState, sessionId, insurancePlan, userAccountInfo, eventDate }: SignupPageProps) {
  return (
    <Elements stripe={stripePromise}>
      <CreateAccountWithScheduleCall
        insuranceState={insuranceState}
        sessionId={sessionId}
        insurancePlan={insurancePlan}
        userAccountInfo={userAccountInfo}
        eventDate={eventDate}
      />
    </Elements>
  );
}

console.log(fetchExchange,'-------',dedupExchange,'-----------',cacheExchange,'----------',process.env.NEXT_PUBLIC_HASURA_SECRET);

export default withUrqlClient((ssrExchange) => ({
  url: urqlUrl,
  exchanges: [dedupExchange, cacheExchange, ssrExchange, fetchExchange],fetchOptions: {
    headers: {
      'x-hasura-admin-secret': process.env.NEXT_PUBLIC_HASURA_SECRET,
    },
  },
}))(Page);

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const insuranceState = context.query['insurance-state'];
  const insurancePlan = context.query['insurance-plan'];
  const sessionId = context.query.sessionId ?? '';
  const inviteeId = context.query.inviteeId ?? '';
  let userAccountInfo: UserAccountDefaultProps = null;
  let eventDate = null;

  if (sessionId && inviteeId) {
    const API_KEY = process.env.NEXT_PUBLIC_CALENDLY_API_KEY;
    console.log(API_KEY);
    console.log(context.query.sessionId,'-----------',context.query.inviteeId);
    const eventDetails = await fetch(`https://api.calendly.com/scheduled_events/${context.query.sessionId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });
    const eventData = await eventDetails.json();
    console.log('eventData',eventData);
    eventDate = eventData.resource.start_time;

    const inviteeDetails = await fetch(
      `https://api.calendly.com/scheduled_events/${context.query.sessionId}/invitees/${context.query.inviteeId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    const inviteeDetailsData = (await inviteeDetails.json()).resource;

    userAccountInfo = {
      firstName: inviteeDetailsData.first_name,
      lastName: inviteeDetailsData.last_name,
      email: inviteeDetailsData.email,
      insuranceMemberId: inviteeDetailsData.questions_and_answers.filter((qa: any) => qa.question == 'Insurance Member Id')[0]?.answer ?? null,
      insuranceGroupId: inviteeDetailsData.questions_and_answers.filter((qa: any) => qa.question == 'Insurance Group Number (if it exists)')[0]?.answer ?? null,
      phoneNumber: inviteeDetailsData.questions_and_answers.filter((qa: any) => qa.question == 'Phone Number')[0]?.answer ?? null,
    };
  }

  return {
    props: {
      insurancePlan: insurancePlan ?? '',
      insuranceState: insuranceState ? insuranceState.toString() : '',
      sessionId,
      userAccountInfo,
      eventDate,
    },
  };
}
