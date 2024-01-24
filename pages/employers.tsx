import Head from 'next/head';
import Navbar from 'components/Navbar/Navbar';
import { Gradient } from 'components/Gradient';
import Footer from 'components/Footer/Footer';
import CostOfInsomnia from 'modules/employers/CostOfInsomnia';
import EmployersFormSection from 'modules/employers/EmployersForm';
import DawnFeatures from 'modules/employers/DawnFeatures';
import { Button } from 'components/Button';

export default function Employers() {
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
        <div className="relative hidden md:block">
          <Gradient color="purple" scale={7} opacity={0.25} left="-50rem" />
          <Gradient color="orange" scale={8} opacity={0.15} left="-60rem" top="10rem" />
          <Gradient color="purple" scale={7} opacity={0.25} right="-30rem" top="-20rem" />
          <Gradient color="orange" scale={7} opacity={0.1} right="-40rem" top="-2rem" />
        </div>
        <div className="relative">
          <Navbar />
          <header className="px-6 text-white md:px-12 pt-22 pb-22 md:py-30">
            <div className="mx-auto max-w-s md:max-w-3xl">
              <h1 className="text-5xl md:text-5.5xl leading-14 text-center md:leading-18 font-bold">
                Dawn for Enterprise
              </h1>
            </div>
            <div className="flex justify-center mt-6">
              <div className="max-w-2xl">
                <p className="text-lg leading-6 text-center font-inter md:text-2xl md:leading-10">
                  Your employees feel their best with better rest. Dawn is designed to serve everyone’s sleep needs.{' '}
                </p>
                <div className="flex justify-center mt-6">
                  <Button
                    onClick={() =>
                      document
                        .getElementById('book-a-demo-form')
                        ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                    }
                    className="md:py-6 w-full md:w-[261px] px-8 md:px-8 py-4 xl:text-base font-medium tracking-widest"
                  >
                    <span className="text-sm md:text-base">Book a demo</span>
                  </Button>
                </div>
              </div>
            </div>
          </header>
        </div>
        <div className="relative z-10 bg-white py-22 md:py-30">
          <CostOfInsomnia />
        </div>
        <div className="">
          <div className="relative hidden md:block">
            <Gradient color="purple" scale={7} opacity={0.25} left="-50rem" />
            <Gradient color="orange" scale={8} opacity={0.15} left="-60rem" top="10rem" />
            <Gradient color="purple" scale={7} opacity={0.25} right="-30rem" top="-20rem" />
            <Gradient color="orange" scale={7} opacity={0.1} right="-40rem" top="-2rem" />
          </div>
          <DawnFeatures />
        </div>
        <div className="flex flex-col items-center pb-22 md:py-36">
          <EmployersFormSection />
        </div>

        <Footer />
      </div>
    </>
  );
}
