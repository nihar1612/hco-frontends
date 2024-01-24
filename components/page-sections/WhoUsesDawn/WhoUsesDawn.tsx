import { Gradient } from 'components/Gradient';
import { TestimonialCarousel } from 'components/page-sections/Testimonials';

export function WhoUsesDawn() {
  return (
    <section className="overflow-hidden bg-dawnDark-700 py-22 md:pt-30 md:pb-30">
      <div className="relative hidden md:block">
        <Gradient color="purple" scale={7} opacity={0.15} left="-40rem" top="-15rem" />
        <Gradient color="orange" scale={8} opacity={0.15} left="-60rem" top="-10rem" />
        <Gradient color="purple" scale={7} opacity={0.15} right="-30rem" top="-10rem" />
        <Gradient color="orange" scale={7} opacity={0.1} right="-40rem" top="-10rem" />
      </div>
      <div className="relative space-y-22 md:space-y-30">
        <div className="flex justify-center mx-8">
          <div className="flex flex-col md:flex-row max-w-3.5xl md:mx-auto text-white space-y-4 md:space-y-0 md:space-x-8">
            <div className="flex-1 text-2.5xl leading-8 md:text-5xl md:leading-14 font-semibold">Who uses Dawn?</div>
            <p className="max-w-[502px] text-base md:text-xl md:leading-8 font-inter">
              Our patients range from new parents who struggled with insomnia to office workers who could not stop
              stressing as they tried to sleep. We have helped patients ages 18, to 70, with some just recently
              beginning to struggle with sleep and others who have been fighting to sleep for years before consulting
              with Dawn.
            </p>
          </div>
        </div>
        <TestimonialCarousel />
      </div>
    </section>
  );
}
