import { TestimonialCarousel } from 'components/page-sections/Testimonials';
import { useMemo } from 'react';
import { useSharedState } from 'utils/context';
import { Description } from './Description';
import { InfoImage } from './InfoImage';
import { DescriptionImage } from './DescriptionImage';
import { Title } from './Title';

export const InfoPageComponent = ({ content }) => {
  const [sharedState] = useSharedState();
  const getStyles = () => {
    if (content.infoPageType !== 'testimonial' && sharedState['contentAxes']) {
      return {
        height: sharedState['contentAxes'].height - 80,
        justifyContent: 'md:center',
      }
    }
    return {}
  }
  
  return (
    <div className="flex flex-col items-center w-full max-w-8xl text-center whitespace-normal lg:px-20" style={getStyles()}>
        {content.infoPageType === 'testimonial' && (
          <>
            <div className='px-6'><Title>{content.title}</Title></div>
            <div className='relative w-full text-left pt-4 lg:pt-8'>
              <TestimonialCarousel />
            </div>
          </>
        )}
        {content.infoPageType !== 'testimonial' && (
          <div className='max-w-4xl px-6 '>
            <Title>{content.title}</Title>
            {content.image != null && <div>
              <InfoImage image={content.image} />
            </div>}
            <div className='pt-2'>
              <Description>{content.text[0].children[0].text}</Description>
            </div>
            <div className='grid grid-cols-2 w-full md:grid-cols-4 gap-y-6 place-items-center pt-10'>
              {content.text.filter(item => item.children == null).map((item) => (
                <div className='justify-center'>
                  <DescriptionImage key={item._key} image={item} />
                </div>
              ))}
            </div>
          </div>
        )}
    </div>
  );
};
