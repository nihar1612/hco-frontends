import { useMutation } from 'urql';
import { Controller, useForm } from 'react-hook-form';
import { isValidPhoneNumber } from 'react-phone-number-input';
import classNames from 'classnames';
import { Button } from 'components/Button';
import { EMAIL_PATTERN, FORM_STYLE, NAME_PATTERN } from './constants';
import { ErrorLabel } from './ErrorLabel';
import { FormItem } from './FormItem';
import { FormPhoneNumberInput } from './FormPhoneNumberInput';
import type { SignupFormFields } from './types';
import { LegalText } from './LegalText';
import { useRouter } from 'next/router';
import { getFromStorage, saveToStorage } from 'utils/storage';
import { QUESTIONNAIRE_LOCALSTORAGE_KEY, SIGNUP_USER_DATA_KEY } from 'utils/constants';
import { pickBy } from 'lodash';
import { signupMutation } from './mutations';
import { loadIntercom } from 'intercom-next';
import { useGetInsuranceData } from 'hooks/useGetInsuranceData';
import { validatePassword, getSignupErrorMessage } from './helpers';

export function CreateAccountWithoutPayment() {
  const router = useRouter();
  const insuranceFromQueryParam = router.query.insurance;
  const { state, insurance, insuranceMemberId } = useGetInsuranceData();
  const [signupResult, signup] = useMutation(signupMutation);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
  } = useForm<SignupFormFields>({
    defaultValues: { email: typeof window !== 'undefined' ? window.localStorage.getItem('submittedEmail') : '' || '' },
  });
  const [password, firstName, lastName] = watch(['password', 'firstName', 'lastName', 'email'] as const);

  async function onSubmit(formData: SignupFormFields) {
    const utmData = pickBy(router.query, (value, key) => key.startsWith('utm_') && Boolean(value));
    const variables = {
      ...formData,
      giveFreeTrial: false,
      coupon: router.query?.coupon || '',
      questionnaireAnswers: JSON.stringify(Object.values(getFromStorage(QUESTIONNAIRE_LOCALSTORAGE_KEY))),
      utmData: JSON.stringify(utmData),
      state,
      insurance: insurance ?? insuranceFromQueryParam,
      insuranceMemberId,
      giveFreeSubscription: true,
    };
    try {
      const signupResult = await signup(variables);
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
      saveToStorage(SIGNUP_USER_DATA_KEY, formData);

      const idToken = signupResult.data.signUp?.user?.idToken;
      if (idToken && document) {
        document.cookie = `idToken=${idToken}; Path=/; SameSite=None; Secure`;
      }
      router.push({
        pathname: insurance === 'Evry' || insuranceFromQueryParam ? '/checkout-success' : '/account/next-steps',
        query: router.query,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex justify-center h-screen mt-12 md:mt-6">
      <div className="max-w-2xl">
        <div className="text-2xl tracking-wide">Create Account</div>
        <div className="xl:col-span-2">
          <p className="mb-6 text-base font-inter text-dawnDark-300 xl:text-xl">
            This account will be used to log in to the Dawn mobile app
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4 xl:grid-cols-2">
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
          {!insuranceFromQueryParam && (
            <FormItem label="Phone" className="xl:col-span-2">
              <Controller
                control={control}
                name="phoneNumber"
                rules={{
                  required: true,
                  validate: (value) => (value ? isValidPhoneNumber(value ?? '') : true),
                }}
                render={({ field }) => (
                  <FormPhoneNumberInput value={field.value ?? ''} inputRef={field.ref} onChange={field.onChange} />
                )}
              />
              {errors.phoneNumber && (
                <ErrorLabel
                  text={`Phone number is ${errors.phoneNumber.type === 'required' ? 'required' : 'invalid'}.`}
                />
              )}
            </FormItem>
          )}
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
          {signupResult.error && (
            <ErrorLabel className="xl:col-span-2" text={getSignupErrorMessage(signupResult.error)} />
          )}
          <Button
            className={classNames(
              'w-full px-10 py-5 mt-6 text-lg font-medium tracking-widest xl:col-span-2 xl:text-base'
            )}
            type="submit"
            disabled={signupResult.fetching}
          >
            <span className="text-sm md:text-base">
              {signupResult.fetching && !signupResult.error ? 'Loading...' : 'Create Account'}
            </span>
          </Button>
          <LegalText />
        </form>
      </div>
    </div>
  );
}
