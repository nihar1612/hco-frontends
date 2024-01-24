import Masonry from 'react-masonry-css';

interface SuccessStory {
  _key: string;
  text: string;
  name: string;
}

function SuccessStory({ story }: { story: SuccessStory }) {
  return (
    <div className="p-8 mb-6 bg-white md:mb-8 rounded-xl bg-opacity-5">
      <p className="text-base leading-6 font-inter md:leading-8 md:text-xl">{story.text}</p>
      <div className="mt-4 text-base font-bold leading-6 md:leading-8 md:text-xl">{story.name}</div>
    </div>
  );
}

interface SuccessStoriesSectionProps {
  title: string;
  stories: SuccessStory[];
}

export function SuccessStories({ title, stories }: SuccessStoriesSectionProps) {
  return (
    <section className="flex justify-center text-white bg-dawnDark-700 py-22 md:py-30">
      <div className="max-w-4xl mx-6">
        <h2 className="text-2.5xl leading-8 md:text-5xl md:leading-14 font-semibold text-center">{title}</h2>
        <div className="mt-10">
          <Masonry
            breakpointCols={{ default: 2, 768: 1 }}
            className="flex w-auto -ml-8"
            columnClassName="pl-8 bg-clip-padding"
          >
            {stories && stories.map((story) => <SuccessStory key={story._key} story={story} />)}
          </Masonry>
        </div>
      </div>
    </section>
  );
}
