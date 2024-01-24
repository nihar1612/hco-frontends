import { PostPreviewReadMore } from 'modules/blog/PostPreview';

export default function PostReadMore({ posts }: { posts: any }) {
  return (
    <div className="flex justify-center">
      <div>
        <div className="ml-6 text-3.5xl leading-10 md:text-5xl md:leading-12 font-semibold">Read more</div>
        <div className="flex flex-col mx-6 mt-2 space-y-8 md:space-y-0 md:flex-row md:space-x-8 md:mt-8">
          {posts.map((post: any) => (
            <PostPreviewReadMore key={post._id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
