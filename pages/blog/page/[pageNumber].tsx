import { PostLibrary, PostLibraryProps, sharedGetStaticPaths, sharedGetStaticProps } from 'modules/blog/PostLibrary';

export default function BlogLibraryPage({ posts, pageNumber, numberOfPages }: PostLibraryProps) {
  return (
    <PostLibrary
      posts={posts}
      pageNumber={pageNumber}
      numberOfPages={numberOfPages}
      metaTitle={`Sleep Blog: Insomnia Tips and Resources - Page ${pageNumber} | Dawn Health`}
    />
  );
}

export async function getStaticPaths() {
  return sharedGetStaticPaths();
}

export async function getStaticProps({ params }: { params: any }) {
  return sharedGetStaticProps({ params });
}
