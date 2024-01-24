import QuestionnaireCTA from 'components/QuestionnaireCTA/QuestionnaireCTA';
import { useVariant } from 'lib/experiments';

export default function HomeHero() {
  const heroVariant = useVariant();

  return (
    <header className="px-6 text-white md:px-12 pt-26 md:pt-44">
      <div className="mx-auto max-w-s md:max-w-3xl">
        <h1 className="text-5xl md:text-5.5xl leading-14 text-center md:leading-18 font-bold">
          {heroVariant?.name || 'Say Goodbye to Tossing and Turning'}{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-dawnOrange-500 to-dawnPurple-500">
            {heroVariant?.metadata?.gradientText || 'With Dawn.'}
          </span>
        </h1>
      </div>
      <div className="flex justify-center mt-6">
        <div className="max-w-4xl">
          <p className="text-lg leading-6 text-center md:text-2xl md:leading-10">
            {heroVariant?.metadata?.subtitle ||
              'Getting good sleep is more than taking sleep medication. We offer everything you need to quit sleep medications for good.'}
          </p>
          <div className="flex justify-center mt-4 md:mt-8">
            <QuestionnaireCTA />
          </div>
        </div>
      </div>
    </header>
  );
}
