import Head from 'next/head';
import { Intro } from 'components/page-sections/Intro';
import { CallToAction } from 'components/page-sections/CallToAction';
import { Aggregates } from 'components/page-sections/Aggregates';
import { TestimonialVideo } from 'modules/reviews/TestimonialVideo';
import { WhoUsesDawn } from 'components/page-sections/WhoUsesDawn';
import { InThePress } from 'components/page-sections/InThePress';
import { AppStoreReviews } from 'components/page-sections/AppStoreReviews';

export default function Reviews() {
  return (
    <>
      <Head>
        <title>Reviews | Dawn Health</title>
        <meta name="description" content="Reviews." />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main className="text-dawnDark-500">
        <Intro
          title="Dawn has improved sleep for thousands of customers"
          text="Sleeping shouldn’t be hard, so we designed a CBT-I based program that makes it easier. Most customers sleep better after 6 sessions with a Dawn therapist."
          showCallToAction={true}
          callToActionText="Get started"
        />
        <Aggregates />
        <TestimonialVideo />
        <WhoUsesDawn />
        <InThePress />
        <AppStoreReviews />
        <CallToAction
          title="Cure your insomnia today."
          text="Craving good sleep? Talk to a sleep coach and find out more about Dawn’s program for curing sleep problems"
        />
      </main>
    </>
  );
}
