import React from 'react';
import Personalized from 'public/images/employers/personalized_and_self_paced.png';
import Education from 'public/images/employers/education_and_productivity.png';
import ReduceStress from 'public/images/employers/reduce_stress.png';
import Image from 'next/image';
import cs from 'classnames';
import { Carousel } from 'components/Carousel/Carousel';

type FeatureListItemProps = {
  active?: boolean;
  index: number;
  title: string;
  description: string;
} & React.HTMLAttributes<HTMLDivElement>;

function FeatureListItem({ index, title, description, active, ...rest }: FeatureListItemProps) {
  return (
    <div
      className={cs('text-left md:text-center cursor-pointer flex md:flex-row flex-col text-white p-4 mb-4', {
        'md:rounded-2xl md:bg-white md:bg-opacity-6': active,
      })}
      {...rest}
    >
      {active ? (
        <div className="bg-gradient-to-bl from-dawnOrange-500 to-dawnPurple-500 mb-4 md:mb-0 md:flex mr-4 p-0.5 min-w-[32px] w-[32px] min-h-[32px] h-[32px] rounded-full flex flex-col md:flex-row justify-center items-center">
          <div className={cs('h-full w-full rounded-full', { 'md:bg-dawnDark-700': !active })}>
            <span className={cs('rounded-full flex justify-center place-items-center pt-1')}>{index}</span>
          </div>
        </div>
      ) : (
        <div className="mb-4 md:mb-0 md:flex mr-4 min-w-[32px] w-[32px] min-h-[32px] h-[32px] rounded-full border border-transparent border-gradient-bl-orange-purple-white">
          <div className="flex items-center justify-center w-full h-full pt-1 rounded-full md:bg-none md:bg-dawnDark-700 bg-gradient-to-bl from-dawnOrange-500 to-dawnPurple-500">
            {index}
          </div>
        </div>
      )}
      <div className="text-left">
        <span className="block mb-2 text-xl font-semibold leading-10 md:text-2xl">{title}</span>
        <span className="text-base font-inter md:text-xl">{description}</span>
      </div>
    </div>
  );
}

interface DawnFeaturesProps {
  title?: React.ReactNode;
}
export default function DawnFeatures({ title }: DawnFeaturesProps) {
  const [activeItem, setActiveItem] = React.useState<1 | 2 | 3>(1);
  const [previouslyActiveItem, setPreviouslyActiveItem] = React.useState<1 | 2 | 3 | null>(null);
  const activeImage = { 1: Personalized, 2: ReduceStress, 3: Education };
  const FeatureItems = [
    <FeatureListItem
      index={1}
      title="Personalized and self-paced"
      description="We’ll always meet and support each person wherever they are in their sleep journey."
      onClick={() => setActiveItem(1)}
      onMouseEnter={() => {
        setPreviouslyActiveItem(activeItem);
        setActiveItem(1);
      }}
      onMouseLeave={() => {
        if (previouslyActiveItem === 1) {
          setActiveItem(previouslyActiveItem);
        }
        setPreviouslyActiveItem(null);
      }}
      active={activeItem === 1}
      key={1}
    />,
    <FeatureListItem
      index={2}
      title="Reduce stress and anxiety"
      description="Everyone can talk to their own personal sleep coach about any sleep difficulties."
      onClick={() => setActiveItem(2)}
      active={activeItem === 2}
      onMouseEnter={() => {
        setPreviouslyActiveItem(activeItem);
        setActiveItem(2);
      }}
      onMouseLeave={() => {
        if (previouslyActiveItem === 2) {
          setActiveItem(previouslyActiveItem);
        }
        setPreviouslyActiveItem(null);
      }}
      key={2}
    />,
    <FeatureListItem
      index={3}
      title="Education and productivity"
      description="We provide sleep lessons that debunk myths and teach healthier sleep practices."
      onClick={() => setActiveItem(3)}
      active={activeItem === 3}
      onMouseEnter={() => {
        setPreviouslyActiveItem(activeItem);
        setActiveItem(3);
      }}
      onMouseLeave={() => {
        if (previouslyActiveItem === 3) {
          setActiveItem(previouslyActiveItem);
        }
        setPreviouslyActiveItem(null);
      }}
      key={3}
    />,
  ];

  return (
    <div className="flex flex-row justify-center">
      <div className="flex flex-col items-center w-full px-8 text-left md:flex-row max-w-9xl md:justify-between py-22 md:px-24 xl:px-48 md:py-24">
        <h1 className="md:hidden text-2.5xl text-center font-semibold text-white mb-12">
          {title ? title : 'Created to build a healthier, happier environment'}
        </h1>
        <div className="hidden md:block max-w-[400px] md:mr-16 ">
          <Image src={activeImage[activeItem]} alt="Image highlighting the selected feature" />
        </div>
        <div className="md:block hidden max-w-[502px] z-10">
          <h1 className="mb-16 text-5xl font-semibold text-center text-white leading-14 md:text-left">
            {title ? title : 'Created to build a healthier, happier environment'}
          </h1>
          {FeatureItems}
        </div>
        <span className="md:hidden">
          <Carousel initialCard={0}>
            {FeatureItems.map((item, index) => (
              <div key={`${index}_feature_item`} className="w-screen px-8">
                <div className="flex flex-col justify-center gap-8">
                  <Image
                    src={activeImage[(index + 1) as keyof typeof activeImage]}
                    alt="Image highlighting the selected feature"
                    className="w-screen h-auto"
                  />{' '}
                  {item}
                </div>
              </div>
            ))}
          </Carousel>
        </span>
      </div>
    </div>
  );
}
