import { useState, useEffect } from 'react';
import { withUrqlClient } from 'next-urql';
import { dedupExchange, fetchExchange, useMutation, gql } from 'urql';
import { urqlUrl, cacheExchange } from 'lib/urql/urqlClient';
import { useForm } from 'react-hook-form';
import Navbar from 'components/Navbar/Navbar';
import { Gradient } from 'components/Gradient';
import { Input } from 'components/form-inputs/Input';
import { Button } from 'components/Button';
import { STRIPE_CUSTOMER_PORTAL_SESSION_LOCALSTORAGE_KEY } from 'utils/constants';

export interface SigninFormFields {
  email: string;
  password: string;
}

const STRIPE_CUSTOMER_PORTAL_SESSION_MUTATION = gql`
  mutation ($email: String!, $password: String!) {
    stripeCreateCustomerPortalSession(email: $email, password: $password) {
      session
    }
  }
`;

function AccountPage() {
  const { register, handleSubmit } = useForm<SigninFormFields>();
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [, sessionMutation] = useMutation(STRIPE_CUSTOMER_PORTAL_SESSION_MUTATION);

  // Check for existing session. Delete if expired.
  useEffect(() => {
    const session = JSON.parse(localStorage.getItem(STRIPE_CUSTOMER_PORTAL_SESSION_LOCALSTORAGE_KEY));
    if (session) {
      const sessionCreated = session?.created;
      const now = new Date().getTime() / 1000;
      // Session was created more than 5 minutes ago.
      const sessionHasExpired = Math.floor(now - sessionCreated) >= 300;
      if (sessionHasExpired) {
        localStorage.removeItem(STRIPE_CUSTOMER_PORTAL_SESSION_LOCALSTORAGE_KEY);
      } else {
        window.location.href = session.url;
      }
    }
  }, []);

  async function onSubmit(data: SigninFormFields) {
    const { email, password } = data;
    setIsLoading(true);
    setErrorMessage('');
    const sessionMutationResult = await sessionMutation({ email, password });
    if (sessionMutationResult.error) {
      setErrorMessage(sessionMutationResult.error.message.replace('[GraphQL] ', ''));
    } else {
      const session = sessionMutationResult.data?.stripeCreateCustomerPortalSession?.session;
      if (session) {
        localStorage.setItem(STRIPE_CUSTOMER_PORTAL_SESSION_LOCALSTORAGE_KEY, JSON.stringify(session));
        window.location.href = session.url;
      }
    }
    setIsLoading(false);
  }
  return (
    <div className="overflow-hidden bg-dawnDark-700">
      <div className="relative">
        <Gradient color="purple" scale={7} opacity={0.25} left="-50rem" />
        <Gradient color="orange" scale={8} opacity={0.15} left="-60rem" top="10rem" />
        <Gradient color="purple" scale={7} opacity={0.25} right="-30rem" top="-20rem" />
        <Gradient color="orange" scale={7} opacity={0.1} right="-40rem" top="-2rem" />
      </div>
      <div className="relative">
        <Navbar />
        <div className="flex items-center justify-center h-screen -mt-24">
          <div className="w-full max-w-xl mx-8">
            <h1 className="text-2xl tracking-wide text-center text-white">Sign In</h1>
            <div className="mt-8">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label
                    className="block pl-1 mb-2 text-base font-normal leading-8 text-white xl:text-xl"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <Input type="email" id="email" placeholder="you@example.com" required {...register('email')} />
                </div>
                <div className="mt-6">
                  <label
                    className="block pl-1 mb-2 text-base font-normal leading-8 text-white xl:text-xl"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <Input type="password" id="password" placeholder="your password" required {...register('password')} />
                </div>
                <Button
                  className="w-full px-10 py-5 mt-8 mb-4 text-lg font-medium tracking-widest xl:col-span-2 xl:text-base'"
                  type="submit"
                  disabled={isLoading}
                >
                  <span className="text-sm md:text-base">Sign In</span>
                </Button>
              </form>
              {errorMessage && <div className="w-full p-4 mb-8 text-center text-white">{errorMessage}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withUrqlClient((ssrExchange) => ({
  url: urqlUrl,
  exchanges: [dedupExchange, cacheExchange, ssrExchange, fetchExchange]
  ,fetchOptions: {
    headers: {
      'x-hasura-admin-secret': process.env.NEXT_PUBLIC_HASURA_SECRET,
    },
  },
}))(AccountPage);
