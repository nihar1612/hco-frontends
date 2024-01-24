import { ExperimentProvider } from 'lib/experiments';
import * as OriginalPage from '../../pricing';

export default function Pricing({ experiment, variant }: any) {
  return (
    <ExperimentProvider value={{ experiment, variant }}>
      <OriginalPage.default />
    </ExperimentProvider>
  );
}

import { getStaticPathsForPath, getStaticPropsForPath } from './index';

export const getStaticPaths = getStaticPathsForPath('/pricing');
export const getStaticProps = getStaticPropsForPath('/pricing');
