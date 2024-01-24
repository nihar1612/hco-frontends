import { useState, Dispatch, SetStateAction } from 'react';
import Masonry from 'react-masonry-css';
import Link from 'next/link';
import classNames from 'classnames';
import { Gradient } from 'components/Gradient';
import { range } from 'utils/range';

interface AppStoreReviewsData {
  stars: number;
  title: string;
  text: React.ReactNode;
}
const appStoreReviewsData: AppStoreReviewsData[] = [
  {
    stars: 5,
    title: 'No more insomnia',
    text: (
      <>
        I saw a reddit user said he was successful with this app. Thats why I have it a try. Before Sleepedy, I get zero
        sleep a night, continued for days after. After using this for 2 week, i start sleeping 2-4 hour/night. 3 rd week
        it increased to 6 hours. Im on week 4 and sleeping 7.5 hours/night. The coaches are so responsive and easy to
        reach to answer your questions and cheer you up. Takes less than 5 mins to fall as sleep. If you should know, I
        spent almost lots of money on every other methods: hypnosis, psychiatrist, working out...you name it. I spent
        lots of time crying hopelessly and thought I would never sleep again. If you suffer like I do, give it a try. I
        promise, you will sleep.
      </>
    ),
  },
  {
    stars: 5,
    title: 'Major life improvement',
    text: (
      <>
        I came across Sleepedy not knowing about CBT-I before, but was encouraged by all of the science behind it. I am
        a little over 3 weeks in to the program now and my sleep has changed dramatically for the better. I previously
        dreaded bed time because of the trouble I had falling asleep, most nights wasting hours in bed before I was able
        to fall asleep. I now have been keeping a regular sleep schedule and have been falling asleep within 10-15
        mins... something I was never able to do before. I am now also waking up during the night less (before Sleepedy
        I would wake at least 3 times during the night, I’m now down to 0 or 1). The app has made it really easy to
        track my progress and stay accountable to myself. Sleepedy has been a huge improvement to my life and I’m real
        glad I gave it a try.
      </>
    ),
  },

  {
    stars: 5,
    title: 'Sleeping soundly again!',
    text: (
      <>
        I recently started not sleeping almost at all. I was actually using reddit to ask other people for their method
        of fixing their sleep schedule when a kind user recommended this app! It was very helpful for setting sleep
        goals and was especially nice to be able to talk with a sleep coach. Highly recommend!
      </>
    ),
  },
  {
    stars: 5,
    title: 'Great start for a well-needed app!',
    text: (
      <>
        I tried this app when it was first released. The user experience is quite slick and well-crafted, and one can
        see that a lot of effort took place during its implementation.
        <br />
        After adding my sleep information, I was immediately paired with a sleep expert. It’s still early to say whether
        the application will truly help improve my overall sleep, but I can certainly say that I am feeling more
        confident when it comes to finding the right resources for sleep improvement. The simple knowledge base in the
        application has already made me more cognizant of the daily activities that may affect my sleep. Having an
        assigned sleep expert is also very beneficial since one can ask questions and discuss any concerns, and receive
        advice almost immediately.
        <br />
        <br />
        Looking forward to see how this application evolves
      </>
    ),
  },
];

interface AppStoreReviewBoxProps extends AppStoreReviewsData {
  index: number;
  isExpanded: boolean;
  setExpandedIndex: Dispatch<SetStateAction<number>>;
}

function AppStoreReviewBox({ index, isExpanded, setExpandedIndex, stars, title, text }: AppStoreReviewBoxProps) {
  return (
    <div className="mb-8">
      <div className="p-8 text-white bg-white rounded-2xl bg-opacity-5">
        <div className="flex">
          {range({ start: 0, end: stars }).map((n) => (
            <svg key={n} width="24" height="24" viewBox="0 0 24 24" className="fill-current text-dawnOrange-500">
              <path d="M21.947 9.17901C21.8842 8.99388 21.7685 8.83121 21.6142 8.71107C21.46 8.59094 21.2739 8.51861 21.079 8.50301L15.378 8.05001L12.911 2.58901C12.8325 2.41313 12.7047 2.26374 12.5431 2.15887C12.3815 2.05401 12.193 1.99815 12.0004 1.99805C11.8077 1.99794 11.6192 2.05359 11.4575 2.15828C11.2957 2.26296 11.1678 2.41221 11.089 2.58801L8.62203 8.05001L2.92103 8.50301C2.72948 8.51819 2.54636 8.58823 2.39358 8.70475C2.2408 8.82127 2.12482 8.97934 2.05952 9.16004C1.99422 9.34075 1.98236 9.53645 2.02537 9.72372C2.06838 9.91099 2.16443 10.0819 2.30203 10.216L6.51503 14.323L5.02503 20.775C4.97978 20.9703 4.99428 21.1747 5.06665 21.3617C5.13901 21.5486 5.26589 21.7095 5.43083 21.8235C5.59577 21.9374 5.79115 21.9991 5.99161 22.0007C6.19208 22.0022 6.38837 21.9434 6.55503 21.832L12 18.202L17.445 21.832C17.6154 21.9451 17.8162 22.0033 18.0207 21.9988C18.2251 21.9944 18.4232 21.9274 18.5884 21.8069C18.7536 21.6865 18.878 21.5183 18.9448 21.3251C19.0116 21.1318 19.0176 20.9228 18.962 20.726L17.133 14.326L21.669 10.244C21.966 9.97601 22.075 9.55801 21.947 9.17901V9.17901Z" />
            </svg>
          ))}
        </div>
        <div className={classNames('mt-4 text-base md:text-xl md:leading-8 font-bold', { 'md:truncate': !isExpanded })}>
          {title}
        </div>
        <div className={classNames('text-base md:text-xl md:leading-8 font-inter', { 'line-clamp-2': !isExpanded })}>
          {text}
        </div>
        <button
          onClick={() => setExpandedIndex(isExpanded ? -1 : index)}
          className="mt-2 text-base text-dawnDark-200 font-inter"
        >
          {isExpanded ? 'Read less' : 'Read more'}
        </button>
      </div>
    </div>
  );
}

export function AppStoreReviews() {
  const [expandedIndex, setExpandedIndex] = useState(-1);
  return (
    <section className="overflow-hidden bg-dawnDark-700 py-22 md:pt-30 md:pb-30">
      <div className="relative hidden md:block">
        <Gradient color="purple" scale={8} opacity={0.1} left="-63rem" top="-2rem" />
        <Gradient color="orange" scale={6} opacity={0.15} left="-45rem" top="0rem" />
        <Gradient color="purple" scale={7} opacity={0.1} right="-62rem" top="1rem" />
        <Gradient color="orange" scale={8} opacity={0.1} right="-53rem" top="2rem" />
      </div>
      <div className="relative">
        <div className="flex justify-center">
          <div className="max-w-3.5xl mx-6">
            <h2 className="font-semibold text-center text-2.5xl leading-8 text-white md:text-5xl md:leading-14">
              From the App Store
            </h2>
            <Masonry
              breakpointCols={{ default: 2, 768: 1 }}
              className="flex w-auto mt-8 -ml-8"
              columnClassName="pl-8 bg-clip-padding"
            >
              {appStoreReviewsData.map((appStoreReview, index) => (
                <AppStoreReviewBox
                  key={index}
                  index={index}
                  isExpanded={index === expandedIndex}
                  setExpandedIndex={setExpandedIndex}
                  stars={appStoreReview.stars}
                  title={appStoreReview.title}
                  text={appStoreReview.text}
                />
              ))}
            </Masonry>
          </div>
        </div>
        <Link href="https://apps.apple.com/us/app/dawn-health/id1487849164">
          <a className="block mt-8 text-base text-center text-dawnOrange-500 md:mt-10 md:text-xl md:leading-8 font-inter">
            More from the App Store
          </a>
        </Link>
      </div>
    </section>
  );
}
