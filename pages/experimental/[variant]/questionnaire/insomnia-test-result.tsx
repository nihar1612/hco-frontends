import { ExperimentProvider } from 'lib/experiments';
import * as OriginalPage from '../../../questionnaire/insomnia-test-result';

export default function InsomniaTestResult({ experiment, variant }: any) {
  return (
    <ExperimentProvider value={{ experiment, variant }}>
      <OriginalPage.default />
    </ExperimentProvider>
  );
}

import { getStaticPathsForPath, getStaticPropsForPath } from '../index';

export const getStaticPaths = getStaticPathsForPath('/questionnaire');
export const getStaticProps = getStaticPropsForPath('/questionnaire');
