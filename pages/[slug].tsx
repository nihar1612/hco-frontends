import Head from 'next/head';
import { sanityClient, usePreviewSubscription } from 'lib/sanity';
import { getSanityClient } from 'lib/sanity.server';
import { pageQuery, pagePathsQuery } from 'groq-queries/page';
import { PreviewExitButton } from 'components/PreviewExitButton';

// Sections
import { Intro } from 'components/page-sections/Intro';
import { Content } from 'components/page-sections/Content';
import { Checklist } from 'components/page-sections/Checklist';
import { Quote } from 'components/page-sections/Quote/Quote';
import { ResearchBackedBy } from 'components/page-sections/ResearchBackedBy/ResearchBackedBy';
import { MedicallyReviewedBy } from 'components/page-sections/MedicallyReviewedBy/MedicallyReviewedBy';
import { SuccessStories } from 'components/page-sections/SuccessStories/SuccessStories';
import { HowDawnWorks } from 'components/page-sections/HowDawnWorks';
import { CallToAction } from 'components/page-sections/CallToAction';
import { Aggregates } from 'components/page-sections/Aggregates';
import { Testimonials } from 'components/page-sections/Testimonials';
import { OtherOptions } from 'components/page-sections/OtherOptions';
import { InThePress } from 'components/page-sections/InThePress';
import { InThePressLogos } from 'components/page-sections/InThePress/InThePressLogos';

export default function Page({ data, preview }: { data: any; preview: any }) {
  const { data: page } = usePreviewSubscription(pageQuery, {
    params: { slug: data.page?.slug.current },
    initialData: data.page,
    enabled: preview && data.page?.slug,
  });

  return (
    <>
      <Head>
        <title>{page.metaTitle || page.title || 'Dawn Health'}</title>
        <meta name="description" content={page.description} key="description" />
      </Head>
      {preview && <PreviewExitButton />}
      {page?.sections &&
        page.sections.map((section: any) => {
          switch (section._type) {
            case 'introPageSection':
              return <Intro key={section._key} {...section} />;
            case 'contentPageSection':
              return <Content key={section._key} {...section} />;
            case 'checklistPageSection':
              return <Checklist key={section._key} {...section} />;
            case 'quotePageSection':
              return <Quote key={section._key} {...section} />;
            case 'howDawnWorksPageSection':
              return <HowDawnWorks key={section._key} {...section} />;
            case 'medicallyReviewedByPageSection':
              return <MedicallyReviewedBy key={section._key} {...section} />;
            case 'successStoriesPageSection':
              return <SuccessStories key={section._key} {...section} />;
            case 'callToActionPageSection':
              return <CallToAction key={section._key} {...section} />;
            case 'researchBackedByPageSection':
              return <ResearchBackedBy key={section._key} {...section} />;
            case 'aggregatesPageSection':
              return <Aggregates key={section._key} {...section} />;
            case 'testimonialsPageSection':
              return <Testimonials key={section._key} {...section} />;
            case 'otherOptionsPageSection':
              return <OtherOptions key={section._key} />;
            case 'inThePressPageSection':
              return <InThePress key={section._key} {...section} />;
            case 'inThePressLogosPageSection':
              return <InThePressLogos key={section._key} {...section} />;
            default:
              return null;
          }
        })}
    </>
  );
}

export async function getStaticPaths() {
  const pages = await sanityClient.fetch(pagePathsQuery, {});
  const paths = pages.map((page: any) => ({
    params: { slug: page.slug.current },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params, preview = false }: { params: any; preview: boolean }) {
  const page = await getSanityClient(preview).fetch(pageQuery, { slug: params.slug });
  return { props: { preview, data: { page } } };
}
