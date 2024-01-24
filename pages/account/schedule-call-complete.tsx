import { WithQuestionnaireLayout } from 'modules/layout/WithQuestionnaireLayout';
import { GetServerSidePropsContext } from 'next';

interface ScheduledCallCompleteProps {
  clinicianDetails: {
    avatar_url: string | null;
    created_at: string;
    current_organization: string;
    email: string;
    name: string;
    scheduling_url: string;
    timezone: string;
    updated_at: string;
    uri: string;
  };
  session: {
    calendar_event: string | null;
    created_at: string;
    end_time: string;
    event_guests: string;
    event_memberships: string;
    event_type: string;
    invitees_counter: string;
    location: string;
    name: string;
    start_time: string;
    status: string;
    updated_at: string;
    uri: string;
  };
}

export default function ScheduleCallComplete({ clinicianDetails, session }: ScheduledCallCompleteProps) {
  const eventTime = new Date(session.start_time);

  return (
    <WithQuestionnaireLayout showBackButton={false} isContinueButtonDisabled={false}>
      <div className="flex flex-col justify-center gap-4 mx-6">
        <div>
          <div className="max-w-[608px] mx-auto text-center">
            <h1 className="max-w-md mx-auto text-2xl font-semibold leading-8 text-center md:text-5xl md:leading-14">
              You&apos;re scheduled, but we need to confirm some insurance details
            </h1>
            <a
              href="tel:+19362650766"
              className="md:hidden flex items-center justify-center flex-1 w-full max-w-[608px] my-2 py-4 mx-auto text-sm font-medium tracking-widest text-white uppercase text-center getStartedNavBar bg-gradient-to-tr from-dawnOrange-500 to-dawnPurple-500 rounded-3xl"
            >
              Call or Text Now to Secure Your Time
            </a>
            <div className="hidden md:block text-center w-full max-w-[608px] py-4 mx-auto text-sm font-medium tracking-widest text-white uppercase whitespace-nowrap ">
              Call or Text{' '}
              <a href="sms:+19362650766" className="underline cursor-pointer">
                +1 (936) 265 0766
              </a>{' '}
              Now to Secure Your Time
            </div>
            <div className="p-6 mt-4 text-white bg-white bg-opacity-6 rounded-2xl">
              <div className="mb-4">Booking held temporarily with: </div>
              {clinicianDetails.avatar_url && (
                <div className="w-16 h-16 mx-auto mb-4 overflow-hidden rounded-full">
                  <img src={clinicianDetails.avatar_url} alt={clinicianDetails.name} />
                </div>)}
              <div className="text-xl">{clinicianDetails.name}, LPC</div>
              {session.status != 'canceled' && (
                <div>
                  {eventTime.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}{' '}
                  @ {eventTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })}
                </div>
              )}
              <div className="my-6 border border-white border-opacity-10"></div>
              <div className="font-inter">
                We need to validate your insurance information and payment plan before we can confirm the call with your
                clinician. We&apos;ll reach out to you shortly with instructions on how to do so.
              </div>
            </div>
          </div>
        </div>

        <div className="hidden md:block text-center w-full max-w-[608px] py-4 mx-auto text-sm tracking-widest text-white whitespace-nowrap ">
          <a href="mailto:team@dawn.health">team@dawn.health</a>
        </div>
      </div>
    </WithQuestionnaireLayout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const API_KEY = process.env.NEXT_PUBLIC_CALENDLY_API_KEY;

  const eventDetails = await fetch(`https://api.calendly.com/scheduled_events/${context.query.sessionId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  const data = await eventDetails.json();
  const userEndpoint = data.resource.event_memberships[0].user;
  const clinicianDetails = await fetch(userEndpoint, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  const clinicianDetailsData = await clinicianDetails.json();

  return { props: { session: data.resource, clinicianDetails: clinicianDetailsData.resource } };
}
