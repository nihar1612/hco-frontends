import { ExperimentProvider } from 'lib/experiments';
import { Page } from '../../../account/signup';
import { withUrqlClient } from 'next-urql';
import { urqlUrl, cacheExchange } from 'lib/urql/urqlClient';
import { dedupExchange, fetchExchange } from 'urql';
import { getStaticPathsForPath, getStaticPropsForPath } from '..';

export function Index({ experiment, variant }: any) {
  return (
    <ExperimentProvider value={{ experiment, variant }}>
      <Page />
    </ExperimentProvider>
  );
}

export const getStaticPaths = getStaticPathsForPath('/account/signup');
export const getStaticProps = getStaticPropsForPath('/account/signup');

export default withUrqlClient((ssrExchange) => ({
  url: urqlUrl,
  exchanges: [dedupExchange, cacheExchange, ssrExchange, fetchExchange],fetchOptions: {
    headers: {
      'x-hasura-admin-secret': process.env.NEXT_PUBLIC_HASURA_SECRET,
    },
  },
}))(Index);
