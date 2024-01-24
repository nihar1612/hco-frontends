import React from 'react';
import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react';
import { theme } from 'utils/tailwindConfig';
import cs from 'classnames';

const tailwindScreenBreakpoins = theme?.screens || {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

function DotIndicator({ isSelected }: { isSelected: boolean }) {
  return (
    <div
      aria-label="carousel position indicator"
      className={`w-2 h-2 rounded-full ${
        isSelected ? 'bg-gradient-to-tr from-dawnOrange-500 to-dawnPurple-500' : 'bg-white bg-opacity-5'
      }`}
    ></div>
  );
}

function getActiveBreakpoints(breakpoints: any) {
  return typeof window != 'undefined'
    ? Object.keys(breakpoints).filter(
        (breakpoint) => window.matchMedia(`(min-width: ${breakpoints[breakpoint]})`).matches
      )
    : [];
}

function createEmblaCarouselConfig(): EmblaOptionsType {
  const activeBreakpoints = getActiveBreakpoints(tailwindScreenBreakpoins);
  const slidesToScroll = activeBreakpoints.includes('xl') ? 3 : 1;
  return {
    slidesToScroll,
    draggable: slidesToScroll <= 2,
    align: 'center',
    startIndex: 0,
    loop: false,
  };
}

interface CarouselProps {
  children: React.ReactNode;
  initialCard?: number;
  className?: string;
  loop?: boolean;
  automatic?: boolean;
}

export function Carousel({ children, initialCard, className, loop }: CarouselProps) {
  const [emblaCarouselRef, emblaCarousel] = useEmblaCarousel({
    ...createEmblaCarouselConfig(),
    startIndex: initialCard,
    loop,
  });
  const [scrollSnaps, setScrollSnaps] = React.useState([]);
  const [selectedIndex, setSelectedIndex] = React.useState(initialCard ?? 0);

  const onSelect = React.useCallback(() => {
    if (!emblaCarousel) {
      return;
    }
    setSelectedIndex(emblaCarousel.selectedScrollSnap());
  }, [emblaCarousel, setSelectedIndex]);

  React.useEffect(() => {
    if (!emblaCarousel) {
      return;
    }

    setScrollSnaps(emblaCarousel.scrollSnapList());
    emblaCarousel.reInit({
      ...createEmblaCarouselConfig(),
      startIndex: initialCard,
      loop,
    });
    emblaCarousel.on('select', onSelect);
    emblaCarousel.on('resize', () => {
      emblaCarousel.reInit({
        ...createEmblaCarouselConfig(),
        startIndex: initialCard,
        loop,
      });
    });
  }, [emblaCarousel, setScrollSnaps, onSelect, initialCard, loop]);

  return (
    <div>
      <div className="flex justify-center">
        <div ref={emblaCarouselRef} className={cs('embla overflow-hidden', className)}>
          <div className="flex"> {children} </div>
        </div>
      </div>
      <div className="flex justify-center mt-4 xl:hidden pb-9 md:pb-28 xl:pb-52">
        <div className="flex space-x-2">
          {scrollSnaps.map((_, index) => (
            <DotIndicator key={index} isSelected={selectedIndex === index} />
          ))}
        </div>
      </div>
    </div>
  );
}
