import Head from 'next/head';
import { IntroBase } from 'components/page-sections/Intro';
import { OurValues } from 'modules/company/OurValues';
import { OurTeam } from 'modules/company/OurTeam';
import { CallToAction } from 'components/page-sections/CallToAction';
import { OurInvestors } from 'modules/company/OurInvestors';

export default function Company() {
  return (
    <>
      <Head>
        <title>About us | Dawn Health</title>
        <meta
          name="description"
          content="Dawn health is helping people take charge of their lives through better sleep."
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main className="text-dawnDark-500">
        <IntroBase>
          <div className="mx-6 text-white py-22 md:py-30">
            <h1 className="max-w-3xl mx-auto font-semibold text-center text-2.5xl leading-8 md:text-5xl md:leading-18">
              Helping people take charge of their lives through better sleep
            </h1>
            <p className="mt-4 max-w-1.5xl mx-auto font-inter text-base md:text-xl md:leading-8 text-center">
              Dawn is confident that by building an effective and scalable standard of care for insomnia treatment, we
              can have life-changing results for our patients and make a dent in the ever-increasing healthcare spend in
              the United States.
            </p>
          </div>
        </IntroBase>
        <OurValues />
        <OurTeam />
        <OurInvestors />
        <CallToAction
          title="Cure your insomnia today."
          text="Craving good sleep? Talk to a sleep coach and find out more about Dawn’s program for curing sleep problems"
        />
      </main>
    </>
  );
}
