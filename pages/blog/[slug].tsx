import { useRef } from 'react';
import Head from 'next/head';

import { sanityClient, usePreviewSubscription } from 'lib/sanity';
import { getSanityClient } from 'lib/sanity.server';
import sanityImageBuilder from 'lib/sanityImageUrl';
import SanityImage from 'modules/sanity/SanityImage';
import { PortableText } from 'components/PortableText';
import { blogPostQuery, blogPostPathsQuery } from 'groq-queries/blogPost';
import { PreviewExitButton } from 'components/PreviewExitButton';
import Navbar from 'components/Navbar/Navbar';
import { PostProgressbar } from 'modules/blog/PostProgressbar';
import PostTitle from 'modules/blog/PostTitle';
import { PostCitationSources } from 'modules/blog/PostCitationSources';
import PostAuthors from 'modules/blog/PostAuthors';
import PostShareButtons from 'modules/blog/PostShareButtons';
import PostReadMore from 'modules/blog/PostReadMore';
import { CallToAction } from 'components/page-sections/CallToAction';
// import { CallToActionStickyBottom } from 'components/page-sections/CallToActionStickyBottom/CallToActionStickyBottom';

export default function BlogPost({ data, preview }: { preview: any; data: any }) {
 
  const { data: post } = usePreviewSubscription(blogPostQuery, {
    params: { slug: data.post?.slug.current },
    initialData: data.post,
    enabled: preview && data.post?.slug,
  });
  
  const postRef = useRef(null);
  const title = post.metaTitle ? post.metaTitle : `${post.title} | Dawn Health`;

  let postMainImageTwitterSource = 'https://www.dawn.health/images/social_media/share-twitter.jpg';
  let postMainImageOpenGraphSource = 'https://www.dawn.health/images/social_media/share-open-graph.jpg';
  if (post.mainImage) {
    const postMainImageUrl = sanityImageBuilder(post.mainImage);
    postMainImageTwitterSource = postMainImageUrl.width(800).height(418).url();
    postMainImageOpenGraphSource = postMainImageUrl.width(1200).height(627).url();
  }
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={post.description} key="description" />
        {/* TODO:
        - Central place to store: globalBrandName, globalBrandTwitterHandle, */}

        <meta property="og:title" content={title} key="title" />
        <meta name="og:description" content={post.description} />
        <meta name="og:image" content={postMainImageOpenGraphSource} />
        <meta name="og:url" content="https://www.dawn.health" />
        <meta name="og:site_name" content="Dawn Health" />
        <meta name="og:locale" content="en_US" />
        <meta name="og:type" content="website" />

        <meta name="twitter:title" content={title} key="title" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:description" content={post.description} />
        <meta name="twitter:site" content="Dawn Health" />
        <meta name="twitter:creator" content="@dawnhealth" />
        <meta name="twitter:image:src" content={postMainImageTwitterSource} />
      </Head>
      {preview && <PreviewExitButton />}
      <main className="min-h-screen text-dawnDark-500">
        <Navbar className="sticky top-0 z-10 bg-dawnDark-700" ctaInHeader={false} ctaText={'Take your sleep quiz'} />

        <div className="sticky z-10 lg:top-28 top-20">
          <PostProgressbar startingRef={postRef} />
        </div>

        <div className="flex justify-center pt-6 mx-6 md:mx0 md:pt-12">
          <div className="sticky self-start hidden mt-4 mr-16 -ml-48 xl:block top-40">
            <PostShareButtons title={post.title} description={post.description} />
          </div>

          <div className="flex-1 max-w-2xl">
            <PostTitle
              title={post.title}
              publishedAt={post.publishedAt}
              readTime={post.readTime}
              author={post.authors?.length > 0 ? post.authors[0] : null}
            />
            <div className="mt-6 xl:hidden">
              <PostShareButtons title={post.title} description={post.description} isSmallScreen={true} />
            </div>
            {post.mainImage && (
              <div className="relative w-full h-64 mt-6 md:h-96 children:rounded-xl">
                <SanityImage image={post.mainImage} fill={true} className="rounded-xl" />
              </div>
            )}

            <div ref={postRef} className="mt-8 prose md:mt-12 lg:prose-lg xl:prose-xl font-inter max-w-none">
              <PortableText blocks={post.body} />
            </div>
            <div className="my-8 font-inter">
              {post.citationSources && post.citationSources.length > 0 && (
                <PostCitationSources sources={post.citationSources} />
              )}
            </div>
            <hr className="h-px bg-dawnDark-500 opacity-10" />
            <div className="mt-10">{post.authors?.length > 0 && <PostAuthors authors={post.authors} />}</div>
          </div>
        </div>

        <div className="py-24 md:py-38">
          {post.readMorePosts?.length > 0 && <PostReadMore posts={post.readMorePosts} />}
        </div>
        <CallToAction
          title="It’s time to stop blaming the night monsters."
          text="Let’s work together to transform your sleep for the better."
          buttonText="Take your sleep quiz"
        />
        {/* <CallToActionStickyBottom
          callToActionStickyBottomText={post.callToActionStickyBottomText || 'Take our Sleep Quiz'}
        /> */}
      </main>
    </>
  );
}

export async function getStaticPaths() {
  const posts = await sanityClient.fetch(blogPostPathsQuery, {});
  const paths = posts.map((post: any) => ({
    params: { slug: post.slug.current },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params, preview = false }: { params: any; preview: boolean }) {
  console.log('1',params);
  const post = await getSanityClient(preview).fetch(blogPostQuery, { slug: params.slug });
  return { props: { preview, data: { post } } };
}
