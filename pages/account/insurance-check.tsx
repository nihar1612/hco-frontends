import { GetServerSidePropsContext } from 'next';
import { dedupExchange, fetchExchange } from 'urql';
import { withUrqlClient } from 'next-urql';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Logo } from 'components/DawnLogo/DawnLogo';
import { urqlUrl, cacheExchange } from 'lib/urql/urqlClient';
import { Gradient } from 'components/Gradient';
import { CreateAccountWithInsuranceInfo } from 'modules/signup/CreateAccount';
import { Progressbar } from 'components/Progressbar/Progressbar';
import { Question } from 'modules/questionnaire/Question';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

interface SignupPageProps {
  insuranceFromQueryParam: string;
}

function SignupPage({}: SignupPageProps) {
  return (
    <section className="relative h-full min-h-screen overflow-hidden text-white bg-dawnDark-700">
      {/* @ts-ignore */}
      <style jsx global>{`
        // This prevents a white background when scrolling on mobile:
        body {
          background-color: rgba(17, 22, 30, 1);
          height: 100vh;
        }
      `}</style>
      <div className="relative z-0 hidden xl:block">
        <Gradient color="purple" scale={7} opacity={0.25} left="-50rem" />
        <Gradient color="orange" scale={8} opacity={0.15} left="-60rem" top="10rem" />
        <Gradient color="purple" scale={7} opacity={0.25} right="-30rem" top="-20rem" />
        <Gradient color="orange" scale={7} opacity={0.1} right="-40rem" top="-2rem" />
      </div>
      <div className="flex-grow bg-dawnDark-700">
        <div id="top" className="px-6 lg:px-20">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/gradient-ellipsis-1.svg" alt="" className="absolute top-0 z-0 -right-40" />
          <div className="relative z-10 flex items-center justify-center py-5 md:py-6">
            <Logo />
          </div>
          <Progressbar progress={95} />
        </div>
        <div className="flex flex-col items-center w-full px-6 pt-10 whitespace-normal lg:px-20 lg:py-10">
          <div className="flex flex-col items-center justify-center w-full text-center whitespace-normal lg:px-20">
            <div className="w-full pb-6 lg:w-1/2 md:pb-8">
              <Question
                text={`Let's validate your insurance information`}
                description={
                  'Entering insurance information helps us check your insurance eligibility. Everything will remain private and confidential.'
                }
              />
            </div>
          </div>
        </div>
        <CreateAccountWithInsuranceInfo />
      </div>
    </section>
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
