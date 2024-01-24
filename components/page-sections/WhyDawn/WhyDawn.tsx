import { Gradient } from 'components/Gradient';

export function WhyDawn() {
  return (
    <section className="overflow-hidden bg-dawnDark-700 py-22 md:pt-30 md:pb-30">
      <div className="relative hidden md:block">
        <Gradient color="purple" scale={6} opacity={0.15} left="-40rem" top="-15rem" />
        <Gradient color="orange" scale={7} opacity={0.15} left="-60rem" top="-10rem" />
        <Gradient color="purple" scale={5} opacity={0.15} right="-30rem" top="-10rem" />
        <Gradient color="orange" scale={5} opacity={0.1} right="-40rem" top="-10rem" />
      </div>
      <div className="relative flex justify-center space-y-22 md:space-y-30">
        <div className="max-w-[1034px] text-white mx-8">
          <h2 className="md:text-5xl md:leading-14 font-semibold text-2.5xl leading-8">Why Dawn?</h2>
          <div className="flex flex-col mt-4 space-y-6 text-base md:flex-row md:space-y-0 md:space-x-6 md:mt-8 md:text-xl md:leading-8 font-inter">
            <div className="flex-1">
              Dawn’s CBT-I treatment is proven to have long-lasting effects, without the unpleasant side effects. Can
              you say the same about over-the-counter treatments, like melatonin, or sleeping pills, like Ambien?
            </div>
            <div className="flex-1">
              Unlike in-person sleep clinics and sleep therapists, Dawn’s sleep program is completely on your terms. You
              can reach out to your dedicated sleep coach 24/7 from the comfort of your own home, and only for $89 a
              month for an average of three months!
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
