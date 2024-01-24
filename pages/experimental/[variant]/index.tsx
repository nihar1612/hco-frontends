import { ExperimentProvider, getCurrentExperiment } from 'lib/experiments';
import * as OriginalIndex from '../../index';

export default function Index({ experiment, variant }: any) {
  return (
    <ExperimentProvider value={{ experiment, variant }}>
      <OriginalIndex.default />
    </ExperimentProvider>
  );
}

export const getStaticPathsForPath = (path: string) => () => {
  const experiment = getCurrentExperiment(path);
  const paths = experiment?.variants.map((v) => v.id);
  return {
    paths: paths?.map((v) => ({
      params: { variant: String(v) },
    })) ?? [],
    fallback: false,
  };
};

export const getStaticPropsForPath =
  (path: string) =>
  ({ params }: any) => {
    const experiment = getCurrentExperiment(path);
    const variantId = params.variant;

    // Here you could fetch any data related only to the variant
    return {
      props: {
        experiment,
        variant: experiment?.variants.find((v) => String(v.id) === variantId),
      },
    };
  };

export const getStaticPaths = getStaticPathsForPath('/');
export const getStaticProps = getStaticPropsForPath('/');
