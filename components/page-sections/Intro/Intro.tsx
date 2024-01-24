import { Link } from 'components/Link';
import SanityImage from 'modules/sanity/SanityImage';
import classNames from 'classnames';
import Navbar from 'components/Navbar/Navbar';
import { Gradient } from 'components/Gradient';
import { TestimonialCarousel } from 'components/page-sections/Testimonials';
import { InThePressLogos } from 'components/page-sections/InThePress';

interface IntroProps {
  title: string;
  text: string;
  showCallToAction?: boolean;
  callToActionText?: string;
  showTestimonials?: boolean;
  showInThePressLogos?: boolean;
  showHeaderMedia?: 'none' | 'image' | 'youtubeEmbed';
  image?: { [key: string]: any };
  youtubeVideoId?: string;
  internalLinkCallToAction?: InternalLinkCallToAction;
}

interface InternalLinkCallToAction {
  _id: string;
  _createdAt: string;
  _type: 'page' | 'post' | 'questionnaire';
  slug: {
    current: string;
  };
}

export function Intro({
  title,
  text,
  showCallToAction = true,
  callToActionText = 'Get Started',
  showTestimonials = false,
  showInThePressLogos = false,
  showHeaderMedia,
  image,
  youtubeVideoId,
  internalLinkCallToAction,
}: IntroProps) {
  const hasHeaderMedia = showHeaderMedia && showHeaderMedia !== 'none' && (image || youtubeVideoId);

  function buildCallToActionUrl(internalLinkCallToAction: InternalLinkCallToAction | null): string {
    if (internalLinkCallToAction) {
      switch (internalLinkCallToAction._type) {
        case 'questionnaire':
          return `/questionnaire/${internalLinkCallToAction.slug.current}`;
        case 'page':
          return `/${internalLinkCallToAction.slug.current}`;
        case 'post':
          return `/blog/${internalLinkCallToAction.slug.current}`;
      }
    }
    return '/questionnaire';
  }
  return (
    <IntroBase>
      <section className="py-22 xl:pt-30 xl:pb-30">
        <div className="flex justify-center text-white">
          <div
            className={classNames('flex justify-between flex-1 max-w-7xl md:px-7 mx-6', {
              'xl:flex-row xl:items-center': hasHeaderMedia,
              'flex-col-reverse': hasHeaderMedia && showHeaderMedia === 'image',
              'flex-col': hasHeaderMedia && showHeaderMedia === 'youtubeEmbed',
            })}
          >
            <div
              className={classNames('w-full', {
                'xl:w-7/12 xl:pr-8 xl:mt-0': hasHeaderMedia,
              })}
            >
              <h1
                className={classNames(
                  'xl:text-5.5xl text-5xl leading-12  xl:leading-18 font-semibold text-center xl:text-left',
                  { 'xl:text-center max-w-3xl mx-auto': !hasHeaderMedia }
                )}
              >
                {title}
              </h1>
              <p
                className={classNames('font-inter mt-4 text-base text-center xl:leading-8 xl:text-xl xl:text-left', {
                  'xl:text-center max-w-1.5xl mx-auto': !hasHeaderMedia,
                  'xl:max-w-lg': hasHeaderMedia,
                })}
              >
                {text}
              </p>
              {showCallToAction && (
                <div
                  className={classNames('flex justify-center mt-10 xl:justify-start xl:mt-6', {
                    'xl:justify-center': !hasHeaderMedia,
                  })}
                >
                  <Link href={buildCallToActionUrl(internalLinkCallToAction)}>
                    <a className="flex items-center justify-center flex-1 max-w-md px-8 py-4 text-sm font-medium tracking-widest text-white uppercase rounded-full xl:flex-none bg-gradient-to-tr from-dawnOrange-500 to-dawnPurple-500 xl:py-6 md:text-base">
                      {callToActionText}
                    </a>
                  </Link>
                </div>
              )}
            </div>
            {showHeaderMedia === 'image' && image && (
              <div className="relative mb-10 overflow-hidden xl:flex-1 rounded-xl h-80">
                <SanityImage image={image} fill={true} width={400} />
              </div>
            )}
            {showHeaderMedia === 'youtubeEmbed' && youtubeVideoId && (
              <div className="relative xl:pt-[28.5%] pt-[56.2%] w-full xl:w-[60%] overflow-hidden mt-10 xl:mt-0">
                <iframe
                  className="absolute inset-0 w-full h-full rounded-xl"
                  src={`https://www.youtube.com/embed/${youtubeVideoId}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allowFullScreen
                />
              </div>
            )}
          </div>
        </div>
        {showInThePressLogos && (
          <div>
            <InThePressLogos />
          </div>
        )}
        {showTestimonials && (
          <div className="xl:mt-30 mt-22">
            <TestimonialCarousel />
          </div>
        )}
      </section>
    </IntroBase>
  );
}

export function IntroBase({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden bg-dawnDark-700">
      <div className="relative">
        <Gradient color="purple" scale={7} opacity={0.25} left="-50rem" />
        <Gradient color="orange" scale={8} opacity={0.15} left="-60rem" top="10rem" />
        <Gradient color="purple" scale={7} opacity={0.25} right="-30rem" top="-20rem" />
        <Gradient color="orange" scale={7} opacity={0.1} right="-40rem" top="-2rem" />
      </div>
      <div className="relative">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
