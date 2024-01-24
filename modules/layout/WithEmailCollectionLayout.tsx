import { WithAccountLayout } from 'modules/layout/WithAccountLayout';
import { Input } from 'modules/questionnaire/Inputs/Input';
import { loadIntercom } from 'intercom-next';
import { useMemo, useState } from 'react';
import { Button } from 'components/Button/Button';
import { useRouter } from 'next/router';

interface WithEmailCollectionLayoutProps {
  title: string | React.ReactNode;
  subtitle: string;
  forwardingUrl: string;
  unsupportedState: boolean;
  lowIntent: boolean;
}

export default function WithEmailCollectionLayout({
  title,
  subtitle,
  forwardingUrl,
  unsupportedState,
  lowIntent,
}: WithEmailCollectionLayoutProps) {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const utmKeys = Object.entries(router.query).filter((k) => k[0].startsWith('utm_'));
  const utmSource = utmKeys.filter((k) => k[0] == 'utm_source');
  const utmMedium = utmKeys.filter((k) => k[0] == 'utm_medium');
  const utmCampaign = utmKeys.filter((k) => k[0] == 'utm_campaign');
  const utmTerm = utmKeys.filter((k) => k[0] == 'utm_term');

  const handleSubmit = () => {
    var intercomProps: { [key: string]: any } = {
      appId: 'nzsfepxr',
      email: email,
      ssr: false,
      initWindow: true,
      delay: 0,
      trial_started: false,
      paid_conversion: false,
      manual_onboarding: false,
      in_app_onboarding: false,
      utm_source: utmSource != null ? utmSource[1] : null,
      utm_campaign: utmCampaign != null ? utmCampaign[1] : null,
      utm_medium: utmMedium != null ? utmMedium[1] : null,
      utm_term: utmTerm != null ? utmTerm[1] : null,
    };

    if (unsupportedState) {
      intercomProps['unsupported_state'] = true;
    }
    if (lowIntent) {
      intercomProps['low_intent'] = true;
    }

    loadIntercom(intercomProps);

    delete router.query.screen;
    router.push({
      pathname: forwardingUrl,
      query: {
        ...router.query,
        coupon: process.env.NEXT_PUBLIC_STRIPE_DEFAULT_COUPON,
      },
    });
  };

  const isValidEmail = useMemo(() => {
    if (email === '') return true;
    return new RegExp(
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    ).test(email);
  }, [email]);

  const hasValidInput = useMemo(() => {
    if (email === '') return false;

    if (!isValidEmail) return false;
    return true;
  }, [, isValidEmail, email]);

  return (
    <WithAccountLayout title="Signup | Dawn Health">
      <div className="w-full max-w-screen-sm mx-auto text-center pt-18 xl:pt-30">
        <h1 className="pb-2 text-3xl font-semibold leading-10 text-white md:text-4xl">{title}</h1>
        <p className="text-lg md:text-xl text-dawnDark-300">{subtitle}</p>
        <Input className="mt-8" value={email} onChange={setEmail} placeholder="you@example.com" />
        <Button
          className="flex items-center justify-center w-full h-full px-8 py-4 mt-8 text-xs font-medium tracking-widest text-white uppercase rounded-full bg-gradient-to-bl from-dawnOrange-500 to-dawnPurple-500"
          onClick={() => {
            handleSubmit();
          }}
          disabled={!hasValidInput}
        >
          <span className="text-sm md:text-base">SUBMIT</span>
        </Button>
      </div>
    </WithAccountLayout>
  );
}
