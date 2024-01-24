import { PostLibrary, PostLibraryProps, sharedGetStaticProps } from 'modules/blog/PostLibrary';

export default function BlogLibraryPage({ posts, pageNumber, numberOfPages }: PostLibraryProps) {
  return (
    <>
      <PostLibrary posts={posts} pageNumber={pageNumber} numberOfPages={numberOfPages} />
    </>
  );
}

export async function getStaticProps() {
  // Set the index page as the first page of the pagination.
  const params = { pageNumber: 1 };
  return sharedGetStaticProps({ params });
}
