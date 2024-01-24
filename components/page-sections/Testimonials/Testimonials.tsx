import { useEffect, useCallback, useState } from 'react';
import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react';
import { theme } from 'utils/tailwindConfig';
import classNames from 'classnames';

const tailwindScreenBreakpoins = theme?.screens || {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

function DotButton({ isSelected, onClick }: { isSelected: boolean; onClick: () => void }) {
  return (
    <button
      aria-label="Toggle testimonial"
      onClick={onClick}
      className={`w-2 h-2 rounded-full ${
        isSelected ? 'bg-gradient-to-tr from-dawnOrange-500 to-dawnPurple-500' : 'bg-white bg-opacity-5'
      }`}
    ></button>
  );
}

interface TestimonialBoxProps {
  text: string;
  source: string;
  isActive?: boolean;
}
function TestimonialBox({ text, source, isActive = false }: TestimonialBoxProps) {
  return (
    <div
      className={classNames(
        'relative flex-grow-0 flex-shrink-0 w-10/12 px-2 md:px-4 md:w-4/6 xl:w-1/3 md:pr-4 xl:pr-8',
        { 'opacity-40 xl:opacity-100': !isActive }
      )}
    >
      <div className="flex flex-col justify-between h-full p-8 bg-white bg-opacity-5 rounded-2xl">
        <div>
          <p className="text-lg leading-8 text-white md:text-2xl md:leading-10 font-inter">“{text}”</p>
        </div>
        <div className="flex items-center mt-4 space-x-3">
          <div className="text-white">
            <div className="font-medium">- {source}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getActiveBreakpoints(breakpoints: any) {
  return Object.keys(breakpoints).filter(
    (breakpoint) => window.matchMedia(`(min-width: ${breakpoints[breakpoint]})`).matches
  );
}

function createEmblaCarouselConfig(): EmblaOptionsType {
  const activeBreakpoints = getActiveBreakpoints(tailwindScreenBreakpoins);
  const slidesToScroll = activeBreakpoints.includes('xl') ? 3 : 1;
  return {
    slidesToScroll,
    draggable: slidesToScroll <= 2,
    align: 'center',
    startIndex: 1,
    loop: true,
  };
}

interface TestimonialsProps {
  showTitle?: boolean;
}

export function Testimonials({ showTitle = true }: TestimonialsProps) {
  return (
    <section className="py-16 bg-dawnDark-700 md:py-30">
      {showTitle && (
        <div className="flex justify-center mb-12">
          <h2 className="mx-8 text-3xl font-semibold text-center text-white md:text-5xl md:text-left">
            More Sleep.
            <br className="md:hidden" /> Less Worries.
          </h2>
        </div>
      )}
      <TestimonialCarousel />
    </section>
  );
}

export function TestimonialCarousel() {
  const [emblaCarouselRef, emblaCarousel] = useEmblaCarousel();
  const [scrollSnaps, setScrollSnaps] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(1);

  const onSelect = useCallback(() => {
    if (!emblaCarousel) {
      return;
    }
    setSelectedIndex(emblaCarousel.selectedScrollSnap());
  }, [emblaCarousel, setSelectedIndex]);

  const scrollTo = useCallback((index) => emblaCarousel && emblaCarousel.scrollTo(index), [emblaCarousel]);

  useEffect(() => {
    if (!emblaCarousel) {
      return;
    }
    setScrollSnaps(emblaCarousel.scrollSnapList());
    emblaCarousel.reInit(createEmblaCarouselConfig());
    emblaCarousel.on('select', onSelect);
    emblaCarousel.on('resize', () => {
      emblaCarousel.reInit(createEmblaCarouselConfig());
    });
  }, [emblaCarousel, setScrollSnaps, onSelect]);

  return (
    <div>
      <div className="flex justify-center">
        <div ref={emblaCarouselRef} className="overflow-hidden max-w-7xl">
          <div className="flex">
            <TestimonialBox
              text="The only approach that has tangibly improved my mental health in the long run. It is simple, long-lasting and sustainable."
              source="Ilya V."
              isActive={selectedIndex === 0}
            />
            <TestimonialBox
              text="I've spent a lot of money trying different things for my mental health. Dawn's CBT program was the only thing that made a difference."
              source="Kevin L."
              isActive={selectedIndex === 1}
            />
            <TestimonialBox
              text="I have been falling asleep within 10-15 mins. Dawn has been a huge improvement to my life and I’m really glad I gave it a try."
              source="Andrew K."
              isActive={selectedIndex === 2}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-4 xl:hidden pb-9 md:pb-28 xl:pb-52">
        <div className="flex space-x-2">
          {scrollSnaps.map((_, index) => (
            <DotButton key={index} onClick={() => scrollTo(index)} isSelected={selectedIndex === index} />
          ))}
        </div>
      </div>
    </div>
  );
}
