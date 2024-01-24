import Head from 'next/head';
import { GetServerSidePropsContext } from 'next';
import { dedupExchange, fetchExchange } from 'urql';
import { withUrqlClient } from 'next-urql';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Logo } from 'components/DawnLogo/DawnLogo';
import { urqlUrl, cacheExchange } from 'lib/urql/urqlClient';
import { Gradient } from 'components/Gradient';
import { CreateAccount, CreateAccountWithoutPayment } from 'modules/signup/CreateAccount';
import { useGetInsuranceData } from 'hooks/useGetInsuranceData';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

interface SignupPageProps {
  insuranceFromQueryParam: string;
}

function SignupPage({ insuranceFromQueryParam }: SignupPageProps) {
  const { isEligibleForInsurance } = useGetInsuranceData();
  return (
    <>
      <Head>
        <title>Signup | Dawn Health</title>
        <meta name="description" content="Signup for a new account | Dawn health" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="px-6 pt-4 overflow-x-hidden text-white md:pt-0 bg-dawnDark-700 md:px-20">
        <div className="relative hidden 2xl:block">
          <Gradient fixed color="purple" data-purple scale={7} opacity={0.25} left="-50rem" />
          <Gradient fixed color="orange" scale={8} opacity={0.15} left="-60rem" top="10rem" />
          <Gradient fixed color="purple" scale={7} opacity={0.25} right="-30rem" top="-20rem" />
          <Gradient fixed color="orange" scale={7} opacity={0.1} right="-40rem" top="-2rem" />
        </div>
        <div className="relative">
          <div className="flex items-center justify-center w-full px-20 pt-2 xl:pt-6 xl:pb-8">
            <Logo />
          </div>
          {isEligibleForInsurance || insuranceFromQueryParam ? <CreateAccountWithoutPayment /> : <CreateAccount />}
        </div>
      </div>
    </>
  );
}

export function Page({ insuranceFromQueryParam }: SignupPageProps) {
  return (
    <Elements stripe={stripePromise}>
      <SignupPage insuranceFromQueryParam={insuranceFromQueryParam} />
    </Elements>
  );
}

export default withUrqlClient((ssrExchange) => ({
  url: urqlUrl,
  exchanges: [dedupExchange, cacheExchange, ssrExchange, fetchExchange],fetchOptions: {
    headers: {
      'x-hasura-admin-secret': process.env.NEXT_PUBLIC_HASURA_SECRET,
    },
  },
}))(Page);

export function getServerSideProps(context: GetServerSidePropsContext) {
  const insuranceFromQueryParam = context.query.insurance;
  return { props: { insuranceFromQueryParam: insuranceFromQueryParam ? insuranceFromQueryParam.toString() : '' } };
}
