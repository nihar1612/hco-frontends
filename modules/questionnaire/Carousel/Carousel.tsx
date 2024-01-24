import React from 'react';
import styles from './carousel.module.css';

interface CarouselItemProps {
  children: React.ReactNode;
  width?: string;
  index: number;
  activeIndex?: number;
}

export function CarouselItem({ children, width = '100vw', index, activeIndex }: CarouselItemProps) {
  return (
    <div className={styles.carouselItem} style={{ width: width, height: index == activeIndex ? 'auto' : 0 }}>
      {children}
    </div>
  );
}

interface CarouselProps {
  children: React.ReactNode;
  activeIndex?: number;
}

export function Carousel({ children, activeIndex = 0 }: CarouselProps) {
  return (
    <div className={styles.carousel}>
      <div className={styles.inner} style={{ transform: `translateX(-${activeIndex * 100}vw)` }}>
        {React.Children.map(children, (child) => {
          // @ts-ignore
          return <child.type {...child.props} activeIndex={activeIndex} />;
        })}
      </div>
    </div>
  );
}

export default Carousel;
