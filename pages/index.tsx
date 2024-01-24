import Head from 'next/head';
import Navbar from 'components/Navbar/Navbar';
import HowItWorks from 'modules/main-page/HowItWorks';
import { InsuranceLogos } from 'components/page-sections/Insurance';
import OurScience from 'modules/main-page/OurScience';
import SleepIssues from 'modules/main-page/SleepIssues';
import { Testimonials } from 'components/page-sections/Testimonials';
import FrequentlyAskedQuestions from 'modules/main-page/FrequentlyAskedQuestions';
import { Gradient } from 'components/Gradient';
import Footer from 'components/Footer/Footer';
import { SleepMetrics } from 'components/page-sections/SleepMetrics/SleepMetrics';
import HomeHero from 'components/page-sections/Heros/HomeHero';

export default function Index() {
  return (
    <>
      <Head>
        <title>Overcome Insomnia With CBT-I &amp; Sleep Coaching — Sleep App | Dawn Health</title>
        <meta
          name="description"
          content="Struggling with insomnia? Ditch the pills and cure your insomnia for good with Dawn's proven online CBT-I app. Let our sleep experts get you back to sleep."
        />
        <meta name="facebook-domain-verification" content="lypvevgg0c2g46jzbubi2frb5kd96o" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="overflow-x-hidden bg-dawnDark-700">
        <div className="relative">
          <Gradient color="purple" scale={7} opacity={0.25} left="-50rem" />
          <Gradient color="orange" scale={8} opacity={0.15} left="-60rem" top="10rem" />
          <Gradient color="purple" scale={7} opacity={0.25} right="-30rem" top="-20rem" />
          <Gradient color="orange" scale={7} opacity={0.1} right="-40rem" top="-2rem" />
        </div>
        <div className="relative">
          <Navbar />
          <HomeHero />
        </div>
        <div className="pt-28 md:pt-40">
          <InsuranceLogos />
        </div>
        <div className="pt-12 md:pt-18">
          <SleepMetrics />
        </div>
        <section className="flex justify-center pt-26 pb-28 bg-dawnDark-700 md:py-48">
          <HowItWorks />
        </section>

        <section className="bg-white pt-26 pb-26 xl:pb-0 xl:pt-48">
          <OurScience />
          <div className="mt-26 xl:mt-48">
            <SleepIssues />
          </div>
        </section>
        <Testimonials showTitle={true} />
        <FrequentlyAskedQuestions />
        <Footer />
      </div>
    </>
  );
}
