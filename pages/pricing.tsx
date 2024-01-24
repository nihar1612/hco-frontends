import Head from 'next/head';
import { IntroBase } from 'components/page-sections/Intro';
import { CallToAction } from 'components/page-sections/CallToAction';
import { PricingFeatureComparison } from 'modules/pricing/PricingFeatureComparison';
import { WhyDawn } from 'components/page-sections/WhyDawn';
import { Quote } from 'components/page-sections/Quote';
import jocelynProfile from 'public/images/people/jocelyn-profile.jpg';
import { InsuranceLogos } from 'components/page-sections/Insurance';
import Link from 'next/link';
import { GettingStartedIsSimple } from 'modules/pricing/GettingStartedIsSimple';
import { WeAcceptMajorInsuranceProviders } from 'modules/pricing/WeAcceptMajorInsuranceProviders';

export default function Pricing() {
  return (
    <>
      <Head>
        <title>Pricing | Dawn Health</title>
        <meta name="description" content="How much our program costs." />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main className="text-dawnDark-500">
        <IntroBase>
          <div className="max-w-[608px] md:pt-28 pt-22 mx-auto">
            <h1 className="xl:text-5.5xl text-5xl leading-12 xl:leading-18 font-bold text-center text-white">
              Pricing
            </h1>
            <p className="mx-6 mt-6 text-base text-center text-white md:mx-0 font-inter xl:leading-8 xl:text-xl">
              We deliver affordable, evidence-based sleep therapy and help you overcome sleep troubles from the
              convenience of your home. We’re in-network with many insurance providers!
            </p>
            <div className="flex justify-center mx-6 mt-6">
              <Link href="/questionnaire">
                <a className="flex items-center justify-center w-full max-w-md px-8 py-4 text-sm font-medium leading-none tracking-widest text-white uppercase rounded-full md:w-auto bg-gradient-to-tr from-dawnOrange-500 to-dawnPurple-500 xl:py-6 md:text-base">
                  Get Started
                </a>
              </Link>
            </div>
          </div>
          <div className="pb-12 md:pt-32 md:pb-22 pt-26 ">
            <InsuranceLogos />
          </div>
        </IntroBase>
        <WeAcceptMajorInsuranceProviders />
        <GettingStartedIsSimple />
        <div className="flex flex-col items-center justify-center px-6 pt-22 md:pt-30">
          <div className="text-dawnDark-700">
            <h2 className="mx-auto font-semibold text-2.5xl leading-8 mt-4 text-center md:text-5xl md:leading-14">
              Dawn is more affordable than alternatives
            </h2>
          </div>
          <div className="mt-12 md:mt-16">
            <PricingFeatureComparison />
            <div className="pt-24 pb-6 italic text-center justify-self-end md:text-base text-dawnDark-400">
              {`* Cost depends on insurance coverage`}
            </div>
          </div>
        </div>
        <WhyDawn />
        <Quote
          text="I was ready to pay hundreds of dollars [for] a sleep therapist...I found [Dawn] online and I’m so glad I did because I saved money and I was able to sleep...it really reduced my stress and was very supportive for me."
          source="Jocelyn Diles"
          sourceTitle="Feminine Embodiment Coach"
          sourceImageStatic={jocelynProfile}
        />
        <CallToAction
          title="Cure your insomnia today."
          text="Craving good sleep? Talk to a sleep coach and find out more about Dawn’s program for curing sleep problems"
        />
      </main>
    </>
  );
}
