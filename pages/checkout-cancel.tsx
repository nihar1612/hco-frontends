import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { WithAccountLayout } from 'modules/layout/WithAccountLayout';
import getStripe from '../lib/stripe';

export default function CheckoutCancel() {
  const router = useRouter();
  const [sessionId, setSessionId] = useState('');

  useEffect(() => {
    setSessionId(localStorage.getItem('sessionId'));
  }, []);

  const redirectToStripe = async () => {
    const stripe = await getStripe();
    await stripe.redirectToCheckout({
      sessionId,
    });
  };

  const redirectToSignup = () => {
    router.push({
      pathname: '/account/signup',
      query: router.query,
    });
  };
  return (
    <WithAccountLayout title="Signup | Dawn Health">
      <div className="w-full max-w-screen-sm mx-auto xl:pt-12">
        <div className="w-full max-w-md mt-12">
          <h1 className="text-2xl">Problems?</h1>
          <div className="mt-8">
            Are you running into problems with the payment? Please don&apos;t hesitate to contact us:{' '}
            <a href="mailto:team@dawn.health" className="underline text-dawnOrange-400">
              team@dawn.health
            </a>
            <div className="flex mt-12 space-x-4">
              {sessionId && (
                <button className="underline text-dawnOrange-400" onClick={redirectToStripe}>
                  Back to payment
                </button>
              )}
              <button onClick={redirectToSignup} className="underline text-dawnOrange-400">
                Back to sign up
              </button>
            </div>
          </div>
        </div>
      </div>
    </WithAccountLayout>
  );
}
