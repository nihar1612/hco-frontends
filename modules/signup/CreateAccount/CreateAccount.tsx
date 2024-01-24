/* eslint-disable max-lines */
import { Button } from 'components/Button';
import { loadIntercom } from 'intercom-next';
import { pickBy } from 'lodash';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useMutation } from 'urql';
import { getFromStorage, saveToStorage } from 'utils/storage';
import { QUESTIONNAIRE_LOCALSTORAGE_KEY } from 'utils/constants';
import { MobileOrderSummary, OrderSummary } from './OrderSummary';
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  PaymentRequestButtonElement,
} from '@stripe/react-stripe-js';
import { CanMakePaymentResult, CreatePaymentMethodCardData, PaymentRequest } from '@stripe/stripe-js';
import cs from 'classnames';
import * as Sentry from '@sentry/nextjs';
import { FormItem } from './FormItem';
import { SelectPaymentMethod, PaymentMethod } from './SelectPaymentMethod';
import { ErrorLabel } from './ErrorLabel';
import { FormPhoneNumberInput } from './FormPhoneNumberInput';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { EMAIL_PATTERN, FORM_STYLE, NAME_PATTERN } from './constants';
import type { SignupFormFields } from './types';
import { LegalText } from './LegalText';
import { signupMutation, removeUserMutation } from './mutations';
import { getSignupErrorMessage, validatePassword } from './helpers';

const stripeElementStyles = {
  style: {
    base: {
      color: '#FFF',
      lineHeight: '32px',
      fontSize: '16px',
      fontWeight: 400,
      '::placeholder': {
        color: '#858992', // dawnDark300,
      },
    },
    complete: {
      color: '#fff',
    },
  },
};

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    dataLayer?: {}[];
  }
}

const updateAnalyticsAndIntercom = (userName: string) => {
  window.Intercom?.('update', {
    trial_started: true,
    name: userName,
  });
  // GTM event
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: 'trialStarted' });
};

export function CreateAccount() {
  const router = useRouter();
  let giveFreeTrial = false;

  const [signupResult, signup] = useMutation(signupMutation);
  const [, removeUser] = useMutation(removeUserMutation);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
    control,
  } = useForm<SignupFormFields>({
    defaultValues: { email: typeof window !== 'undefined' ? window.localStorage.getItem('submittedEmail') : '' || '' },
  });
  const [password, firstName, lastName, email] = watch(['password', 'firstName', 'lastName', 'email'] as const);

  const [isValidCardNumber, setIsValidCardNumber] = useState<boolean>(false);
  const [isValidCardExpiry, setIsValidCardExpiry] = useState<boolean>(false);
  const [isValidCardCVC, setIsValidCardCVC] = useState<boolean>(false);

  const stripe = useStripe();
  const elements = useElements();

  const [paymentOptions, setPaymentOptions] = useState<CanMakePaymentResult>(null);
  const [stripePaymentRequest, setStripePaymentRequest] = useState<PaymentRequest>(null);
  const [stripeErrors, setStripeErrors] = useState(null);
  const [processingCheckout, setProcessingCheckout] = useState(false);

  const paymentMethods: PaymentMethod[] = ['card', 'applePay', 'googlePay'];
  const availablePaymentMethods = paymentMethods.filter(
    (method) => method === 'card' || (paymentOptions != null && paymentOptions[method] === true)
  );

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>('card');

  const handleSignup = useCallback(
    async (formData: SignupFormFields) => {
      const utmData = pickBy(router.query, (value, key) => key.startsWith('utm_') && Boolean(value));

      const variables = {
        ...formData,
        giveFreeTrial: giveFreeTrial,
        coupon: router.query?.coupon || '',
        questionnaireAnswers: JSON.stringify(Object.values(getFromStorage(QUESTIONNAIRE_LOCALSTORAGE_KEY))),
        utmData: JSON.stringify(utmData),
      };

      try {
        const result = await signup(variables);

        if (process.env.NODE_ENV === 'production') {
          await loadIntercom({
            appId: 'nzsfepxr',
            email: formData.email,
            name: `${firstName} ${lastName}`,
            phone: formData.phoneNumber,
            ssr: false,
            initWindow: true,
            delay: 0,
            paid_conversion: false,
            trial_started: false,
            manual_onboarding: false,
            in_app_onboarding: false,
            ...utmData,
          });
        }
        saveToStorage('stripeEmail', formData.email);

        return result;
      } catch (e) {
        console.log('Error creating account', e);
        Sentry.captureException(e);
        throw e;
      }
    },
    [firstName, lastName, giveFreeTrial, router.query, signup]
  );

  const saveStripeCard = useCallback(
    async (secret: string, paymentMethod: string | Omit<CreatePaymentMethodCardData, 'type'> = null) => {
      setProcessingCheckout(true);

      try {
        const result = await stripe.confirmCardPayment(secret, {
          payment_method: paymentMethod || {
            card: elements.getElement(CardNumberElement),
            billing_details: { email },
          },
        });

        if (result.error) {
          setProcessingCheckout(false);
          setStripeErrors(result.error.message);
          throw new Error(result.error.message);
        }

        updateAnalyticsAndIntercom(`${firstName} ${lastName}`);
        setProcessingCheckout(false);
        return result;
      } catch (e) {
        setProcessingCheckout(false);
        console.log('Error saving stripe card', e);
        Sentry.captureException(e);
        throw e;
      }
    },
    [elements, stripe, email, firstName, lastName]
  );

  // Validate CC
  useEffect(() => {
    if (!elements) return;

    const cardNumber = elements.getElement(CardNumberElement);
    const cardExpiry = elements.getElement(CardExpiryElement);
    const cardCVC = elements.getElement(CardCvcElement);

    cardNumber?.on('change', ({ complete }) => setIsValidCardNumber(complete));
    cardExpiry?.on('change', ({ complete }) => setIsValidCardExpiry(complete));
    cardCVC?.on('change', ({ complete }) => setIsValidCardCVC(complete));
  }, [stripe, elements]);

  const createAccountAndCheckout = useCallback(
    async (formData: SignupFormFields, paymentMethod?: string) => {
      let signupResult;
      try {
        signupResult = await handleSignup(formData);

        const stripeClientSecret = signupResult?.data?.signUp?.stripeCreateCustomerResult?.stripeClientSecret;
        const idToken = signupResult.data.signUp?.user?.idToken;

        if (idToken && document) {
          document.cookie = `idToken=${idToken}; Path=/; SameSite=None; Secure`;
        }

        if (signupResult.data && Object.keys(formData).length > 0) {
          const result = await saveStripeCard(
            stripeClientSecret,
            selectedPaymentMethod === 'card' ? null : paymentMethod
          );

          if (result.error) {
            throw Error(result.error.message);
          }
        }
      } catch (e) {
        if (signupResult && signupResult.data?.signUp?.user?.id) {
          Sentry.captureEvent({ message: `Removing user with id ${signupResult.data.signUp?.user?.id}` });
          Sentry.captureException(e);
          await removeUser({ userId: signupResult.data.signUp?.user?.id });
        }
        throw e;
      }
    },
    [handleSignup, removeUser, saveStripeCard, selectedPaymentMethod]
  );

  // Setup stripe payment
  useEffect(() => {
    if (!stripe) {
      return () => {};
    }

    // Prevents setState from being called after unmounting this page.
    let finishedRequest = false;

    const preparePayment = async () => {
      const paymentRequest = stripe.paymentRequest({
        country: 'US',
        currency: 'usd',
        total: {
          label: 'Dawn Health',
          amount: 24900,
        },
        requestPayerName: true,
        requestPayerEmail: true,
      });

      const availablePaymentOptions = await paymentRequest.canMakePayment();

      if (availablePaymentOptions && finishedRequest === false) {
        finishedRequest = true;
        setPaymentOptions(availablePaymentOptions);
        setStripePaymentRequest(paymentRequest);
      }

      paymentRequest.on('paymentmethod', ({ paymentMethod, complete }) => {
        handleSubmit(async (formData) => {
          try {
            await createAccountAndCheckout(formData, paymentMethod?.id);
            complete('success');

            router.push({
              pathname: '/checkout-success',
              query: router.query,
            });
          } catch (e) {
            complete('fail');
            setProcessingCheckout(false);
            Sentry.captureException(e);
            setStripeErrors(!e ? 'An error occurred processing your payment method.' : '');
          }
        })();
      });
    };

    preparePayment();

    return () => {
      finishedRequest = true;
    };
  }, [createAccountAndCheckout, router, saveStripeCard, handleSubmit, stripe]);

  return (
    <div className="flex flex-wrap mt-12 md:mt-6">
      <div className="w-full xl:w-1/2">
        <form
          onSubmit={
            selectedPaymentMethod === 'card'
              ? handleSubmit(
                  (formData) =>
                    createAccountAndCheckout(formData)
                      .then(() =>
                        router.push({
                          pathname: '/checkout-success',
                          query: router.query,
                        })
                      )
                      .catch((e) => {
                        console.log('hit an error signing up', e);
                      }),
                  (errors) => console.log(errors)
                )
              : (e) => {
                  e.preventDefault();
                }
          }
          className="grid grid-cols-1 gap-4 xl:grid-cols-2"
        >
          <div className="mb-2 xl:hidden">
            <MobileOrderSummary coupon={router?.query?.coupon as string} />
          </div>
          <div className="text-2xl tracking-wide">Create Account</div>
          <div className="xl:col-span-2">
            <p className="mb-6 text-base font-inter text-dawnDark-300 xl:text-xl">
              This account will be used to log in to the Dawn mobile app
            </p>
          </div>

          <FormItem label="First name">
            <input
              className={FORM_STYLE}
              type="text"
              placeholder="John"
              {...register('firstName', { required: true, pattern: NAME_PATTERN })}
            />
            {errors.firstName && (
              <ErrorLabel text={`First name is ${errors.firstName.type === 'required' ? 'required' : 'invalid'}.`} />
            )}
          </FormItem>
          <FormItem label="Last name">
            <input
              className={FORM_STYLE}
              type="text"
              placeholder="Doe"
              {...register('lastName', { required: true, pattern: NAME_PATTERN })}
            />
            {errors.lastName && (
              <ErrorLabel text={`Last name is ${errors.lastName.type === 'required' ? 'required' : 'invalid'}.`} />
            )}
          </FormItem>
          <FormItem label="Email" className="xl:col-span-2">
            <input
              className={FORM_STYLE}
              type="email"
              placeholder="you@example.com"
              {...register('email', { required: true, pattern: EMAIL_PATTERN })}
            />
            {errors.email && (
              <ErrorLabel text={`Email is ${errors.email.type === 'required' ? 'required' : 'invalid'}.`} />
            )}
          </FormItem>
          <FormItem label="Phone" optional={true} className="xl:col-span-2">
            <Controller
              control={control}
              name="phoneNumber"
              rules={{
                validate: (value) => (value ? isValidPhoneNumber(value ?? '') : true),
              }}
              render={({ field }) => (
                <FormPhoneNumberInput value={field.value ?? ''} inputRef={field.ref} onChange={field.onChange} />
              )}
            />
            {errors.phoneNumber && <ErrorLabel text="Not a valid phone number." />}
          </FormItem>
          <FormItem label="Password" className="xl:col-span-2">
            <input
              className={FORM_STYLE}
              type="password"
              placeholder="At least 8 characters"
              {...register('password', { required: true, validate: validatePassword })}
            />
            {errors.password && (
              <ErrorLabel
                text={errors.password.type === 'required' ? 'Password is required.' : errors.password.message}
              />
            )}
          </FormItem>
          <FormItem label="Confirm password" className="xl:col-span-2">
            <input
              className={FORM_STYLE}
              type="password"
              placeholder="At least 8 characters"
              {...register('confirmPassword', { required: true, validate: (value) => value === password })}
            />
            {errors.confirmPassword && <ErrorLabel text="The provided passwords don't match." />}
          </FormItem>

          <FormItem label="Payment method" className="w-full xl:col-span-2">
            <div className="grid grid-cols-2 xl:mb-2">
              {availablePaymentMethods.length > 1 && (
                <div className="z-50 col-span-2 mb-4">
                  <SelectPaymentMethod
                    paymentMethods={availablePaymentMethods}
                    selectedPaymentMethod={selectedPaymentMethod}
                    setSelectedPaymentMethod={setSelectedPaymentMethod}
                  />
                </div>
              )}
              {selectedPaymentMethod === 'card' && (
                <>
                  <div className="flex col-span-2 pl-6 border placeholder-dawnDark-300 bg-dawnDark-500 bg-opacity-30 border-dawnDark-400 rounded-tl-dawnDefault rounded-tr-dawnDefault">
                    <CardNumberElement
                      className="w-full py-4 text-white placeholder-dawnDark-300"
                      options={{
                        ...stripeElementStyles,
                        placeholder: 'Card Number',
                      }}
                      onChange={(e) => {
                        if (e.complete) {
                          elements?.getElement(CardExpiryElement)?.focus();
                        }
                      }}
                    />
                  </div>
                  <CardExpiryElement
                    className="p-4 pl-6 text-white border border-t-0 placeholder-dawnDark-300 rounded-bl-dawnDefault bg-dawnDark-500 bg-opacity-30 border-dawnDark-400"
                    options={stripeElementStyles}
                    onChange={(e) => {
                      if (e.complete) {
                        elements?.getElement(CardCvcElement)?.focus();
                      }
                    }}
                  />
                  <CardCvcElement
                    className="p-4 text-white border border-t-0 border-l-0 bg-dawnDark-500 bg-opacity-30 border-dawnDark-400 placeholder-dawnDark-300 rounded-br-dawnDefault"
                    options={stripeElementStyles}
                  />
                </>
              )}
            </div>
          </FormItem>
          {signupResult.error && (
            <ErrorLabel className="xl:col-span-2" text={getSignupErrorMessage(signupResult.error)} />
          )}
          {stripeErrors && <ErrorLabel className="xl:col-span-2" text={stripeErrors} />}
          {paymentOptions && stripePaymentRequest && selectedPaymentMethod !== 'card' && (
            <div className="grid grid-cols-1 overflow-x-hidden rounded-full xl:col-span-2">
              {paymentOptions.applePay ? (
                <button
                  onClick={async () => {
                    const isValid = await trigger();
                    if (isValid) {
                      stripePaymentRequest.show();
                    }
                  }}
                  className="flex items-center justify-center w-full h-16 text-center bg-white rounded-full"
                >
                  <img src="/icons/apple-pay.svg" alt="Apple Pay" />
                </button>
              ) : (
                <PaymentRequestButtonElement
                  onClick={async () => {
                    const isValid = await trigger();
                    if (isValid) {
                      stripePaymentRequest.show();
                    }
                  }}
                  options={{
                    paymentRequest: stripePaymentRequest,
                    style: { paymentRequestButton: { theme: 'light', height: '64px' } },
                  }}
                />
              )}
            </div>
          )}
          {selectedPaymentMethod === 'card' && (
            <Button
              className={cs(
                'w-full px-10 py-5 mt-2 mb-4 text-lg font-medium tracking-widest xl:col-span-2 xl:text-base',
                {
                  'cursor-not-allowed': [isValidCardCVC, isValidCardExpiry, isValidCardNumber].includes(false),
                }
              )}
              type="submit"
              disabled={
                signupResult.fetching ||
                (selectedPaymentMethod === 'card' &&
                  [isValidCardCVC, isValidCardExpiry, isValidCardNumber, !processingCheckout].includes(false))
              }
            >
              <span className="text-sm md:text-base">
                {(signupResult.fetching && !signupResult.error) || processingCheckout
                  ? 'Loading...'
                  : giveFreeTrial
                  ? 'Start Free Trial'
                  : 'Start your sleep program'}
              </span>
            </Button>
          )}

          <LegalText className="mt-4" />
          <div className="flex justify-center mb-12 z-2 xl:col-span-2">
            <a className="hidden xl:block" href="https://www.stripe.com">
              <img src="/icons/powered-by-stripe.svg" alt="Powered by Stripe" />{' '}
            </a>
            <a className="xl:hidden" href="https://www.stripe.com">
              <img src="/icons/powered-by-stripe-sm.svg" alt="Powered by Stripe" />{' '}
            </a>
          </div>
        </form>
      </div>
      <div className="w-1/2">
        <div className="hidden xl:block fixed top-26 left-50% w-500 ml-32 2xl:ml-56">
          <OrderSummary coupon={router?.query?.coupon as string} />
        </div>
      </div>
    </div>
  );
}
