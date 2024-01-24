import SanityImage from 'modules/sanity/SanityImage';
import SanityPortableText from 'modules/sanity/SanityPortableText';
import { TeamMember } from 'types/sanity-schema-types';

export default function PostAuthors({ authors }: { authors: TeamMember[] }) {
  return (
    <div>
      {authors.map((author) => (
        <div key={author._id} className="flex flex-col md:space-x-4 md:flex-row">
          <div className="w-20 h-20 overflow-hidden rounded-full md:rounded-none md:w-40 md:h-40">
            <SanityImage image={author.image} width={200} />
          </div>
          <div className="mt-4 md:mt-0">
            <div className="text-base font-semibold">{author.nameWithCredentials || author.name}</div>
            <div className="mt-1 text-base md:text-lg md:leading-8 md:mt-2 font-inter">
              <SanityPortableText
                blocks={author.bio}
                serializers={{
                  types: {
                    block: (props: any) => {
                      const { style } = props.node;
                      if (style === 'normal') {
                        return <p className="mb-2">{props.children}</p>;
                      }
                      // @ts-expect-error
                      return BlockContent.defaultSerializers.types.block(props);
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
