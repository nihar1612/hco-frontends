/* eslint-disable max-lines */
import { useMutation } from 'urql';
import { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import classNames from 'classnames';
import { EMAIL_PATTERN, FORM_STYLE, DATE_PICKER_STYLE, NAME_PATTERN, MEMBER_ID_PATTERN, STATES } from './constants';
import { ErrorLabel } from './ErrorLabel';
import { FormItem } from './FormItem';
import { FormPhoneNumberInput } from './FormPhoneNumberInput';
import { isValidPhoneNumber } from 'react-phone-number-input';
import type { SignupFormFields } from './types';
import { useRouter } from 'next/router';
import { getFromStorage, saveToStorage } from 'utils/storage';
import { QUESTIONNAIRE_LOCALSTORAGE_KEY, SIGNUP_USER_DATA_KEY } from 'utils/constants';
import { pickBy } from 'lodash';
import { insuranceMutation } from './mutations';
import { loadIntercom } from 'intercom-next';
import { useGetInsuranceData } from 'hooks/useGetInsuranceData';
import { getSignupErrorMessage } from './helpers';
import Image from 'next/image';
import { ContinueButton } from 'modules/questionnaire/ContinueButton';
import { ConsentModal } from './ConsentModal';

import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { createTheme, ThemeProvider } from '@mui/material';

const customTheme = createTheme({
  typography: {
    fontFamily: 'Epilogue',
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#858992',
    },
    secondary: {
      main: '#19212C',
    },
    background: {
      default: '#11161E',
      paper: '#11161E',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'unset',
          borderRadius: '1.5rem',
        },
      },
    },
  },
});

export function CreateAccountWithInsuranceInfo({ userAccountDefaultInfo }: { [key: string]: any }) {
  const router = useRouter();
  const insuranceFromQueryParam = router.query.insurance as string;
  const sessionId = router.query.sessionId as string;
  const {
    state: stateFromQuestionnaire,
    insurance: insuranceFromQuestionnaire,
    insurancePlans,
  } = useGetInsuranceData();
  const [signupResult, submitInsurance] = useMutation(insuranceMutation);
  const [showConsentModal, setShowConsentModal] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    watch,
    trigger,
    setValue,
  } = useForm<SignupFormFields>({
    mode: 'onChange',
    defaultValues: {
      firstName: userAccountDefaultInfo?.firstName,
      lastName: userAccountDefaultInfo?.lastName,
      email: userAccountDefaultInfo?.email,
      insuranceMemberId: userAccountDefaultInfo?.insuranceMemberId,
      insuranceGroupId: userAccountDefaultInfo?.insuranceGroupId,
      phoneNumber: userAccountDefaultInfo?.phoneNumber,
      state: '',
      insurance: '',
    },
  });
  const [firstName, lastName, state, insurance, dateOfBirth] = watch([
    'firstName',
    'lastName',
    'state',
    'insurance',
    'dateOfBirth',
  ] as const);

  useEffect(() => {
    if (insuranceFromQuestionnaire || insuranceFromQueryParam) {
      setValue('insurance', insuranceFromQuestionnaire ?? insuranceFromQueryParam);
    }
  }, [insuranceFromQuestionnaire, insuranceFromQueryParam, setValue]);

  useEffect(() => {
    if (stateFromQuestionnaire) {
      setValue('state', stateFromQuestionnaire);
    }
  }, [stateFromQuestionnaire, setValue]);

  useEffect(() => {
    if (userAccountDefaultInfo) {
      Object.entries(userAccountDefaultInfo).map(([key, val]) =>
        setValue(key as keyof SignupFormFields, val as string)
      );
    }
  }, [userAccountDefaultInfo, setValue]);

  async function onSubmit(formData: SignupFormFields) {
    const utmData = pickBy(router.query, (value, key) => key.startsWith('utm_') && Boolean(value));
    const variables = {
      ...formData,
      questionnaireAnswers: JSON.stringify(Object.values(getFromStorage(QUESTIONNAIRE_LOCALSTORAGE_KEY))),
      utmData: JSON.stringify(utmData),
      giveFreeSubscription: true,
      sessionId: sessionId,
    };
    try {
      await submitInsurance(variables);
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
          insurance_submitted: true,
          ...utmData,
        });
      }
      saveToStorage(SIGNUP_USER_DATA_KEY, formData);
      router.push({
        pathname: '/account/schedule-call-complete',
        query: router.query,
      });
    } catch (error) {
      console.log(error);
    }
  }
  const handleGoBack = useCallback(() => {
    router.back();
  }, [router]);

  const validateAndShowConsentModal = useCallback(async () => {
    const valid = await trigger();
    setShowConsentModal(valid);
  }, [trigger]);
  return (
    <div>
      <div className="relative h-full">
        <div className="h-full pb-12">
          <div className="flex justify-center h-max">
            <div className="w-full max-w-2xl px-6 lg:px-0">
              <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                <ConsentModal
                  name={`${firstName} ${lastName}`}
                  dateOfBirth={new Date(dateOfBirth)}
                  state={state}
                  isOpen={showConsentModal}
                  onClose={() => setShowConsentModal(false)}
                  onAcknowledge={handleSubmit(onSubmit)}
                  loading={isSubmitting}
                />
                <FormItem label="First name">
                  <input
                    className={FORM_STYLE}
                    type="text"
                    placeholder="John"
                    {...register('firstName', { required: true, pattern: NAME_PATTERN })}
                  />
                  {errors.firstName && (
                    <ErrorLabel
                      text={`First name is ${errors.firstName.type === 'required' ? 'required' : 'invalid'}.`}
                    />
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
                    <ErrorLabel
                      text={`Last name is ${errors.lastName.type === 'required' ? 'required' : 'invalid'}.`}
                    />
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
                <FormItem
                  label="State"
                  className={classNames('xl:col-span-2', {
                    hidden: stateFromQuestionnaire,
                  })}
                >
                  <select
                    className={classNames(FORM_STYLE, { 'text-dawnDark-300': !state })}
                    {...register('state', { required: true })}
                  >
                    <option value="" disabled hidden>
                      State
                    </option>
                    {STATES.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                  {errors.state && (
                    <ErrorLabel text={`State is ${errors.state.type === 'required' ? 'required' : 'invalid'}.`} />
                  )}
                </FormItem>
                <FormItem
                  label="Insurance Plan"
                  className={classNames('xl:col-span-2', {
                    hidden: insuranceFromQuestionnaire || insuranceFromQueryParam,
                  })}
                >
                  <select
                    className={classNames(FORM_STYLE, { 'text-dawnDark-300': !insurance })}
                    {...register('insurance', { required: true })}
                  >
                    <option value="" disabled hidden>
                      Insurance Plan
                    </option>
                    {insurancePlans.map((plan) => (
                      <option key={plan} value={plan}>
                        {plan}
                      </option>
                    ))}
                  </select>
                  {errors.insurance && (
                    <ErrorLabel
                      text={`Insurance plan is ${errors.insurance.type === 'required' ? 'required' : 'invalid'}.`}
                    />
                  )}
                </FormItem>
                <FormItem label="Member ID" className="xl:col-span-2">
                  <input
                    className={FORM_STYLE}
                    type="text"
                    placeholder="Member ID"
                    {...register('insuranceMemberId', { required: true, pattern: MEMBER_ID_PATTERN })}
                  />
                  {errors.insuranceMemberId && (
                    <ErrorLabel
                      text={`Member ID is ${errors.insuranceMemberId.type === 'required' ? 'required' : 'invalid'}.`}
                    />
                  )}
                </FormItem>
                <FormItem label="Group Number" className="xl:col-span-2">
                  <input
                    className={FORM_STYLE}
                    type="text"
                    placeholder="Group Number"
                    {...register('insuranceGroupId')}
                  />
                </FormItem>
                <FormItem label="Date of Birth" className="xl:col-span-2">
                  {/* @ts-ignore */}
                  <style jsx global>{`
                    ::-webkit-calendar-picker-indicator {
                      background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 24 24"><path fill="%234F555F" d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z"/></svg>');
                    }
                  `}</style>

                  <Controller
                    control={control}
                    name="dateOfBirth"
                    rules={{ required: true }}
                    render={({ field }) => (
                      <ThemeProvider theme={customTheme}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            className={DATE_PICKER_STYLE}
                            OpenPickerButtonProps={{}}
                            openTo="year"
                            views={['year', 'month', 'day']}
                            value={field.value}
                            onChange={(newValue) => {
                              field.onChange(newValue);
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...{
                                  ...params,
                                  inputProps: {
                                    ...params.inputProps,
                                    placeholder: 'mm/dd/yyyy',
                                    sx: {},
                                    className:
                                      'rounded-dawnDefault font-inter px-6 py-5 text-base bg-dawnDark-500 bg-opacity-30 text-white hover:outline-none hover:shadow-none hover:border-none focus:outline-none focus:shadow-none focus:border-none xl:text-xl p-0 focus:ring-0',
                                  },
                                  InputProps: {
                                    ...params.InputProps,
                                    className:
                                      'rounded-dawnDefault bg-dawnDark-500 bg-opacity-30 focus:ring-0 focus:outline-none focus:shadow-none focus:border-none w-full',
                                  },
                                }}
                              />
                            )}
                          />
                        </LocalizationProvider>
                      </ThemeProvider>
                    )}
                  />

                  {errors.dateOfBirth && (
                    <ErrorLabel
                      text={`Date Of Birth is ${errors.dateOfBirth.type === 'required' ? 'required' : 'invalid'}.`}
                    />
                  )}
                </FormItem>
                {signupResult.error && (
                  <ErrorLabel className="xl:col-span-2" text={getSignupErrorMessage(signupResult.error)} />
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden w-full mb-24 md:block">
        <ContinueButton action={validateAndShowConsentModal} disabled={false} text={'Meet your Clinician'} />
        <span className="block mt-4 text-sm font-inter text-dawnDark-300">
          By clicking <span className="font-bold">Meet your clinician</span>, you consent to being contacted by this
          provider or Dawn via email, phone, voicemail or text. Please note that email is not a secure means of
          communication.
        </span>
      </div>
      <div className="md:hidden absolute left-0  bottom-0 flex justify-center w-full px-6 backdrop-filter backdrop-blur-1.5xl border-t border-dawnDark-500 lg:px-20">
        <div className="flex flex-row w-full py-3 lg:w-1/3 lg:py-4">
          <div className="relative flex items-center justify-center w-20 mr-4">
            <button onClick={handleGoBack}>
              <div className="flex items-center md:hidden">
                <Image src="/back.svg" alt="back-icon" className="" height={52} width={52} />
              </div>
              <div className="hidden md:block">
                <Image src="/back.svg" alt="back-icon" className="" height={64} width={64} />
              </div>
            </button>
          </div>
          <div className="w-full">
            <ContinueButton action={validateAndShowConsentModal} disabled={false} text={'Meet your Clinician'} />
          </div>
        </div>
      </div>
    </div>
  );
}
