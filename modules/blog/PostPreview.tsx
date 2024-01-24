import { Link } from 'components/Link';
import SanityImage from 'modules/sanity/SanityImage';
import PostPublishedAtReadTime from 'modules/blog/PostPublishedAtReadTime';

interface Post {
  title: string;
  slug: { current: string };
  publishedAt: string;
  mainImage: { [key: string]: any };
  excerpt: string;
  readTime: number;
}

interface PostPreviewWrapperProps {
  children: React.ReactNode;
  post: Post;
  className?: string;
}
function PostPreviewWrapper({ children, post, className }: PostPreviewWrapperProps) {
  return (
    <Link href={`/blog/${post.slug.current}`} passHref={true}>
      <a className={`flex cursor-pointer w-full max-w-sm group ${className}`}>{children}</a>
    </Link>
  );
}
export function PostPreviewListItem({ post }: { post: Post }) {
  if (!post) return null;
  return (
    <PostPreviewWrapper
      post={post}
      className="flex flex-col w-full max-w-sm cursor-pointer md:flex-row md:items-center md:max-w-2xl xl:max-w-3xl md:space-x-6 group"
    >
      {post.mainImage && (
        <div className="relative w-full overflow-hidden rounded-xl md:w-1/3 h-44 xl:h-52">
          <SanityImage
            image={post.mainImage}
            fill={true}
            className="transition duration-300 ease-in-out group-hover:transform group-hover:scale-110"
          />
          <div className="absolute hidden w-full h-full bg-white group-hover:block opacity-20"></div>
        </div>
      )}
      <div className="flex-1 mt-6 md:mt-0">
        <PostPublishedAtReadTime publishedAt={post.publishedAt} readTime={post.readTime} />
        <div className="mt-2 text-xl font-semibold md:mt-2 xl:text-2xl xl:leading-8 group-hover:text-dawnPurple-500">
          {post.title}
        </div>
        <div className="mt-2 text-base xl:text-xl xl:leading-8 font-inter max-h-24">
          {post.excerpt || 'Missing excerpt'}
        </div>
      </div>
    </PostPreviewWrapper>
  );
}
export function PostPreviewFeatured({ post }: { post: Post }) {
  if (!post) return null;
  return (
    <PostPreviewWrapper
      post={post}
      className="flex flex-col w-full max-w-sm cursor-pointer md:flex-row md:items-center md:max-w-3xl xl:max-w-5xl md:space-x-12 group"
    >
      {post.mainImage && (
        <div className="relative w-full overflow-hidden rounded-xl md:w-1/2 h-80 xl:h-100">
          <SanityImage
            image={post.mainImage}
            fill={true}
            className="transition duration-300 ease-in-out group-hover:transform group-hover:scale-110"
          />
          <div className="absolute hidden w-full h-full bg-white group-hover:block opacity-20"></div>
        </div>
      )}
      <div className="flex-1 mt-8 md:mt-0">
        <PostPublishedAtReadTime publishedAt={post.publishedAt} readTime={post.readTime} />
        <div className="mt-2 text-3xl font-semibold text-white xl:text-4xl xl:leading-12 group-hover:text-dawnPurple-500">
          {post.title}
        </div>
        <div className="mt-2 text-white font-inter xl:text-xl xl:leading-8">{post.excerpt || 'Missing excerpt'}</div>
      </div>
    </PostPreviewWrapper>
  );
}
export function PostPreviewReadMore({ post }: { post: Post }) {
  if (!post) return null;
  return (
    <PostPreviewWrapper post={post} className="flex flex-col max-w-xs group">
      {post.mainImage && (
        <div className="relative w-full overflow-hidden h-62 rounded-xl">
          <SanityImage
            image={post.mainImage}
            fill={true}
            className="transition duration-300 ease-in-out group-hover:transform group-hover:scale-110"
          />
          <div className="absolute hidden w-full h-full bg-white group-hover:block opacity-20"></div>
        </div>
      )}
      <div className="flex-1 mt-6">
        <PostPublishedAtReadTime publishedAt={post.publishedAt} readTime={post.readTime} />
        <div className="mt-4 text-xl font-semibold md:text-2xl group-hover:text-dawnPurple-500">{post.title}</div>
        <div className="mt-4 text-base tracking-wide md:leading-8 md:text-lg font-inter">{post.excerpt || ''}</div>
      </div>
    </PostPreviewWrapper>
  );
}
