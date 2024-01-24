import Head from 'next/head';
import Image from 'next/image';
import { Gradient } from 'components/Gradient';
import Navbar from 'modules/evry-collab/Navbar/Navbar';
import { Testimonials } from 'components/page-sections/Testimonials';
import FrequentlyAskedQuestions from 'modules/evry-collab/FrequentlyAskedQuestions';
import Footer from 'components/Footer/Footer';
import { Aggregates } from 'components/page-sections/Aggregates';
import heroAppScreenshot from 'public/evry-collab/hero-app-screenshot.png';
import DawnFeatures from 'modules/employers/DawnFeatures';
import Link from 'next/link';
import { InThePressLogos } from 'components/page-sections/InThePress';

export default function EveryCollab() {
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
          <header className="flex md:justify-center pt-[72px] px-10">
            <div className="flex flex-col md:flex-row">
              <div>
                <h1 className="text-white font-semibold text-5xl leading-14 md:leading-18 md:text-5.5xl md:pt-16 pr-[72px]">
                  Start Sleeping.
                  <br /> Defeat Insomnia.
                </h1>
                <ul className="mt-4 space-y-4 text-white md:mt-8">
                  <li className="flex content-center space-x-4">
                    <div>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M4 12L10 18L20 6"
                          stroke="#FF8F5B"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span className="text-base md:text-xl font-inter">Covered by Evry Health at no cost to you</span>
                  </li>
                  <li className="flex items-center space-x-4">
                    <div>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M4 12L10 18L20 6"
                          stroke="#FF8F5B"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span className="text-base md:text-xl font-inter">Completely confidental</span>
                  </li>
                </ul>
                <div className="mt-8 md:mt-12">
                  <Link href="/questionnaire/signup-evry-v1">
                    <a className="block px-8 py-4 text-sm font-medium tracking-widest text-center text-white uppercase rounded-full md:py-6 md:inline-block bg-gradient-to-tr from-dawnOrange-500 to-dawnPurple-500 md:text-base md:leading-4">
                      Join Dawn for Free
                    </a>
                  </Link>
                </div>
              </div>
              <div className="mt-14 md:mt-0 overflow-hidden h-[370px] md:h-[590px] md:w-[461px] w-[295px] mx-auto">
                <Image src={heroAppScreenshot} alt="" />
              </div>
            </div>
          </header>
        </div>
        <Aggregates />
        <DawnFeatures
          title={
            <>
              Digital care that starts and ends
              <br className="hidden md:inline-block" /> with you
            </>
          }
        />
        <Testimonials showTitle={true} />
        <div className="mb-12 -mt-16">
          <InThePressLogos />
        </div>
        <FrequentlyAskedQuestions />
        <Footer />
      </div>
    </>
  );
}
