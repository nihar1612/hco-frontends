import { GetServerSidePropsContext } from 'next';
import { dedupExchange, fetchExchange, gql, ssrExchange } from 'urql';
import { makeOperation, Operation } from 'urql/core';
import { initUrqlClient } from 'next-urql';
import { authExchange } from '@urql/exchange-auth';
import { urqlUrl, cacheExchange } from 'lib/urql/urqlClient';
import { WithAccountLayout } from 'modules/layout/WithAccountLayout';
import { AppBadges } from 'components/AppBadges/AppBadges';

interface SleepCoach {
  id: string;
  firstName: string;
  introVideoUrl: string;
  scheduleCallUrl: string;
}

function DisplayCoach({ sleepCoach }: { sleepCoach: SleepCoach }) {
  return (
    <>
      <div className="text-center text-white">
        <h1 className="font-semibold md:text-5xl md:leading-14 text-2.5xl leading-8">Welcome to Dawn</h1>
        <p className="mt-2 text-lg leading-6 md:text-2xl md:leading-10 text-dawnDark-200">
          You’ve been paired with Coach {sleepCoach.firstName}! Download the app to start your journey to better sleep!
        </p>
      </div>
      <div className="mt-8">
        <div className="relative md:pt-[75%] pt-[120%] w-full overflow-hidden">
          <iframe
            className="absolute inset-0 w-full h-full rounded-xl"
            src={sleepCoach.introVideoUrl}
            title="YouTube video player"
            frameBorder="0"
            allowFullScreen
          />
        </div>
      </div>
    </>
  );
}

interface CheckoutSuccessProps {
  sleepCoach: SleepCoach | null;
}

export default function CheckoutSuccess({ sleepCoach }: CheckoutSuccessProps) {
  return (
    <WithAccountLayout title="Signup | Dawn Health">
      <div>
        <div className="flex justify-center mt-5">
          <div className="max-w-[610px]">
            {sleepCoach?.firstName && sleepCoach?.introVideoUrl ? (
              <DisplayCoach sleepCoach={sleepCoach} />
            ) : (
              <div className="mt-20">
                <h1 className="font-semibold md:text-5xl md:leading-14 text-2.5xl leading-8 text-center">
                  Welcome to Dawn
                </h1>
                <p className="mt-12 text-xl text-center font-inter">Now it’s time to download the app.</p>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <AppBadges />
        </div>
      </div>
    </WithAccountLayout>
  );
}

const findSleepCoachMutation = gql`
  mutation {
    findSleepCoach(assignToUser: true) {
      sleepCoach
    }
  }
`;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const insuranceFromQueryParam = context.query.insurance;
  if (insuranceFromQueryParam) {
    return { props: {} };
  }
  const ssrCache = ssrExchange({ isClient: false });
  const auth = authExchange({
    addAuthToOperation: ({ authState, operation }: { authState: any; operation: Operation }) => {
      // the token isn't in the auth state, return the operation without changes
      if (!authState || !authState.idToken) {
        return operation;
      }

      const fetchOptions =
        typeof operation.context.fetchOptions === 'function'
          ? operation.context.fetchOptions()
          : operation.context.fetchOptions || {};

      return makeOperation(operation.kind, operation, {
        ...operation.context,
        fetchOptions: {
          ...fetchOptions,
          headers: {
            ...fetchOptions.headers,
            Authorization: `Bearer ${authState.idToken}`,
            'x-hasura-role': 'user',
          },
        },
      });
    },
    willAuthError: ({ authState }: { authState: any }) => {
      if (!authState || !authState?.idToken) {
        return true;
      }
      return false;
    },
    didAuthError: ({ error }: { error: any }) => {
      return error.graphQLErrors.some((e: any) => e.extensions?.code === 'FORBIDDEN');
    },
    getAuth: async () => {
      let idToken;
      try {
        idToken = context.req.cookies.idToken;
      } catch (error) {
        console.log('error from auth exchange', error);
      }
      if (idToken) {
        return { idToken };
      }
      return null;
    },
  });
  const client = initUrqlClient(
    { url: urqlUrl, exchanges: [dedupExchange, cacheExchange, ssrCache, auth, fetchExchange],fetchOptions: {
      headers: {
        'x-hasura-admin-secret': process.env.NEXT_PUBLIC_HASURA_SECRET,
      },
    } },
    false
  );
  const result = await client.mutation(findSleepCoachMutation).toPromise();
  const sleepCoach = result?.data?.findSleepCoach?.sleepCoach;
  return {
    props: { sleepCoach: sleepCoach || null },
  };
}
