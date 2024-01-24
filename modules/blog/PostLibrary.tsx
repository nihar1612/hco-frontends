import { sanityClient } from 'lib/sanity';
import Navbar from 'components/Navbar/Navbar';
import Footer from 'components/Footer/Footer';
import { PostPreviewFeatured, PostPreviewListItem } from 'modules/blog/PostPreview';
import Head from 'next/head';
import PostPagination from 'modules/blog/PostPagination';
import { Gradient } from 'components/Gradient';

const POSTS_PER_PAGE = 7;

export interface PostLibraryProps {
  posts: { [key: string]: any };
  pageNumber: number;
  numberOfPages: number;
  metaTitle?: string;
}
export function PostLibrary({ posts, pageNumber, numberOfPages, metaTitle }: PostLibraryProps) {
  return (
    <>
      <Head>
        <title>{metaTitle || 'Sleep Blog: Insomnia Tips and Resources | Dawn Health'}</title>
        <meta
          name="description"
          content="Your sleep is vital to us. Read about different insomnia types, tips for better sleep, and resources to learn about sleep treatments on Dawn Health’s blog."
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main>
        <div className="overflow-hidden bg-dawnDark-700">
          <div className="relative">
            <Gradient color="purple" scale={7} opacity={0.25} left="-50rem" />
            <Gradient color="orange" scale={8} opacity={0.1} left="-50rem" top="5rem" />
            <Gradient color="purple" scale={7} opacity={0.25} right="-30rem" top="-20rem" />
            <Gradient color="orange" scale={7} opacity={0.1} right="-40rem" top="-2rem" />
          </div>
          <div className="relative">
            <Navbar />
            <div className="flex justify-center px-6 py-24">
              <PostPreviewFeatured post={posts[0]} />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center mx-6 mt-14 md:mt-20">
          <div className="flex flex-col pb-28 space-y-14 md:space-y-16 xl:space-y-20">
            {posts.slice(1, posts.length).map((post: any) => (
              <PostPreviewListItem key={post._id} post={post} />
            ))}
          </div>
        </div>
        <div className="flex justify-center pb-20">
          <PostPagination pageNumber={pageNumber} numberOfPages={numberOfPages} />
        </div>
        <Footer className="bg-dawnDark-700" />
      </main>
    </>
  );
}

async function fetchNumberOfPosts() {
  const countQuery = `count(*[_type == 'post' && defined(slug) && publishedAt < now()])`;
  const numberOfPosts = await sanityClient.fetch(countQuery);
  const numberOfPages = Math.trunc(numberOfPosts / POSTS_PER_PAGE);
  return { numberOfPosts, numberOfPages };
}

export async function sharedGetStaticPaths() {
  const { numberOfPages } = await fetchNumberOfPosts();

  const paths = Array.from({ length: Math.trunc(numberOfPages) }, (_, index) => ({
    params: { pageNumber: (index + 1).toString() },
  }));
  return { paths, fallback: false };
}

export async function sharedGetStaticProps({ params }: { params: any }) {
  const { numberOfPosts, numberOfPages } = await fetchNumberOfPosts();

  const pageNumber = Number(params.pageNumber - 1);
  const postSliceStart = pageNumber * POSTS_PER_PAGE;
  let postSliceEnd = postSliceStart + POSTS_PER_PAGE;

  // If it's the last page, we add last chunk of posts that weren't enough for a full POSTS_PER_PAGE.
  if (pageNumber + 1 === numberOfPages) {
    postSliceEnd = postSliceEnd + numberOfPosts;
  }
  const query = `*[_type == 'post' && defined(slug) && publishedAt < now()] | order(publishedAt desc)[${postSliceStart}...${postSliceEnd}]{ ... }`;
  const posts = await sanityClient.fetch(query, {});
  return { props: { posts, pageNumber: params.pageNumber, numberOfPages } };
}
