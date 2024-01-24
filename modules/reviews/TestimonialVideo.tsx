/* eslint-disable react/display-name */
import { StaticImageData } from 'next/image';
import jocelynProfile from 'public/images/people/jocelyn-profile.jpg';

interface TestimonialVideoProps {
  name: string;
  quote: string | (() => JSX.Element);
  reviewText: string;
  videoUrl: string;
  title: string;
  profileImg: StaticImageData;
  reverse?: boolean;
}

const reviews: TestimonialVideoProps[] = [
  {
    name: 'Dina',
    quote: () => <>“I was waking up feeling like I got 1-2 hours of sleep.”</>,
    reviewText:
      '“I was up all night thinking and stressing about all the things I had to do…and it was so difficult to actually fall asleep”.',
    videoUrl: 'https://youtube.com/embed/1JBReY44Ky4',
    title: 'Feminine Embodiment Coach',
    profileImg: jocelynProfile,
  },
  {
    name: 'Jocelyn',
    quote: () => <>“You will sleep soon. I swear.”</>,
    reviewText:
      '“I had a really great experience with Dawn because I’m now sleeping through the night...I really like the structure of how it [Dawn] works and the lessons were really helpful in understanding that I’m normal.”',
    videoUrl: 'https://www.youtube.com/embed/KUIs1O3jQvo',
    title: 'Feminine Embodiment Coach',
    profileImg: jocelynProfile,
  },
  {
    name: 'Feb',
    quote: '"Moms struggle with Insomnia"',
    reviewText:
      '"How do you survive raising 3 boys under 3 years old? Well the answer is sleep. Dawn has therapists that make sure you\'re getting the appropriate amount of sleep.”',
    videoUrl: 'https://youtube.com/embed/A2Tiwxkox-s',
    title: 'Feminine Embodiment Coach',
    profileImg: jocelynProfile,
  },
];

function Testimonial({ videoUrl, quote, name, reviewText, reverse }: TestimonialVideoProps) {
  return (
    <div
      className={`flex flex-col justify-center flex-1 max-w-5xl space-y-10 md:${
        reverse ? 'flex-row' : 'flex-row-reverse'
      }`}
    >
      <div
        className={`relative md:pt-[48.5%] pt-[134%] w-full md:w-[40.5%] ${
          reverse ? 'md:mr-[25%]' : 'md:ml-[25%]'
        } overflow-hidden`}
      >
        <iframe
          className="absolute inset-0 w-full h-full rounded-xl"
          src={videoUrl}
          title="YouTube video player"
          frameBorder="0"
          allowFullScreen
        />
      </div>

      <div className="flex items-center flex-1">
        <div className="max-w-6xl">
          <div className="md:text-5xl text-2.5xl leading-8 font-semibold md:leading-14">
            {typeof quote === 'function' ? quote() : quote}
          </div>
          <p className="mt-4 text-base md:leading-8 md:text-xl font-inter">{reviewText}</p>
          <div className="flex items-center mt-6">
            <div className="ml-3">
              <span className="text-base font-semibold md:text-xl">– {name}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TestimonialVideo() {
  return (
    <div className="flex flex-col items-center gap-16 px-6 py-22 md:py-30">
      {reviews.map((x, index) => (
        <Testimonial key={`${x.name}_testimonial`} {...x} reverse={index % 2 === 0} />
      ))}
    </div>
  );
}
