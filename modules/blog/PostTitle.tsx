import PostPublishedAtReadTime from './PostPublishedAtReadTime';
import SanityImage from 'modules/sanity/SanityImage';
import { TeamMember } from 'types/sanity-schema-types';

interface PostTitleProps {
  title?: string;
  publishedAt?: string;
  readTime?: number;
  author?: TeamMember;
}

export default function PostTitle({ title, publishedAt, readTime, author }: PostTitleProps) {
  return (
    <div>
      <h1 className="mt-4 text-3.5xl font-semibold leading-10 lg:text-4xl xl:text-5xl lg:leading-14 xl:leading-14">
        {title || 'untitled'}
      </h1>
      <div className="flex items-center mt-4 space-x-4">
        <div className="w-12 h-12 ">
          {author?.image && <SanityImage image={author.image} width={100} className="rounded-full" />}
        </div>
        <div>
          <div className="md:text-xl">{author?.nameWithCredentials || author?.name || ''}</div>
          <div className="mt-1">
            <PostPublishedAtReadTime publishedAt={publishedAt} readTime={readTime} />
          </div>
        </div>
      </div>
    </div>
  );
}
