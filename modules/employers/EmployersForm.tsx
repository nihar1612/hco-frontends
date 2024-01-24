import { Button } from 'components/Button';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { loadIntercom } from 'intercom-next';
import React from 'react';

const FORM_STYLE =
  'rounded-dawnDefault bg-dawnDark-500 bg-opacity-30 w-full px-6 py-4 font-inter border border-dawnDark-400 placeholder-dawnDark-300 text-white text-base xl:text-xl leading-8 focus:outline-none';

const EMAIL_PATTERN =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

function FormItem({ label, className, children }: { label: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={className}>
      <label className="block pl-1 mb-2 text-base font-normal leading-8 xl:text-xl">{label}</label>
      {children}
    </div>
  );
}

function ErrorLabel({ text, className }: { text: string; className?: string }) {
  return <div className={`mt-2 text-sm font-inter text-dawnRed-500 ${className}`}>{text}</div>;
}

export interface SignupFormFields {
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  numEmployees?: string;
}

function EmployersForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignupFormFields>();
  const [signupResult, setSignupResult] = React.useState('Submit');

  async function submitIntercom(formData: SignupFormFields) {
    await loadIntercom({
      appId: 'nzsfepxr',
      email: formData.email,
      name: `${formData.firstName} ${formData.lastName}`,
      numEmployees: formData.numEmployees,
      companyName: formData.companyName,
      isEmployer: true,
    });
    setSignupResult('Submitted');
  }

  return signupResult === 'Submitted' ? (
    <div
      id="book-a-demo-form"
      className="md:w-1/2 text-xl text-white bg-white bg-opacity-0.06 p-8 rounded-xl"
      style={{ height: 'fit-content' }}
    >
      <span className="block mb-2 text-2xl font-semibold md:text-4xl md:text-center font-inter md:mb-4">
        Thank You!
      </span>
      <span className="block mb-10 text-base font-inter md:text-xl md:text-center">
        Your form has been submitted! Keep an eye on your inbox for a message from us!
      </span>
      <Button
        onClick={() => {
          reset();
          setSignupResult('Submit');
        }}
        className="w-full px-8 py-4 text-lg font-medium tracking-widest xl:text-base"
      >
        <span className="text-sm md:text-base">Back to Form</span>
      </Button>
    </div>
  ) : (
    <form
      id="book-a-demo-form"
      onSubmit={handleSubmit(submitIntercom, (errors) => console.log(errors))}
      className="md:min-w-[400px] z-10 grid grid-cols-1 gap-4 xl:grid-cols-1 text-white bg-white bg-opacity-6 p-8 rounded-2xl"
    >
      <FormItem label="First name">
        <input
          className={FORM_STYLE}
          placeholder="John"
          {...register('firstName', { required: true, pattern: /^[a-z|A-Z|\s]+$/ })}
        />
        {errors.firstName && (
          <ErrorLabel text={`First name is ${errors.firstName.type === 'required' ? 'required' : 'invalid'}.`} />
        )}
      </FormItem>
      <FormItem label="Last name">
        <input
          className={FORM_STYLE}
          placeholder="Doe"
          {...register('lastName', { required: true, pattern: /^[a-z|A-Z|\s]+$/ })}
        />
        {errors.lastName && (
          <ErrorLabel text={`Last name is ${errors.lastName.type === 'required' ? 'required' : 'invalid'}.`} />
        )}
      </FormItem>
      <FormItem label="Company name">
        <input
          className={FORM_STYLE}
          placeholder="Dawn Health"
          {...register('companyName', { required: true, pattern: /^[a-z|A-Z|\s]+$/ })}
        />
        {errors.companyName && (
          <ErrorLabel text={`Company name is ${errors.companyName.type === 'required' ? 'required' : 'invalid'}.`} />
        )}
      </FormItem>
      <FormItem label="Number of employees">
        <input
          className={FORM_STYLE}
          placeholder="1-25,000"
          {...register('numEmployees', { valueAsNumber: true, pattern: /^[0-9|,]+$/ })}
        />
        {errors.numEmployees && (
          <ErrorLabel
            text={`Number of employees is ${errors.numEmployees.type === 'required' ? 'required' : 'invalid'}.`}
          />
        )}
      </FormItem>
      <FormItem label="Email" className="">
        <input
          className={FORM_STYLE}
          type="email"
          placeholder="you@example.com"
          {...register('email', { required: true, pattern: EMAIL_PATTERN })}
        />
        {errors.email && <ErrorLabel text={`Email is ${errors.email.type === 'required' ? 'required' : 'invalid'}.`} />}
      </FormItem>

      <div className="mt-4 text-sm leading-6 text-dawnDark-300">
        By providing your email, you agree to our{' '}
        <Link href="/legal/privacy-policy">
          <a className="text-dawnOrange-400">Privacy Policy</a>
        </Link>{' '}
        and{' '}
        <Link href="/legal/terms-of-service">
          <a className="text-dawnOrange-400">Terms of Service</a>
        </Link>
        {'.'}
      </div>

      <Button className="w-full px-8 py-4 mt-4 mb-4 text-lg font-medium tracking-widest xl:text-base" type="submit">
        <span className="text-sm md:text-base">{signupResult}</span>
      </Button>
    </form>
  );
}

export default function EmployersFormSection() {
  return (
    <div className="z-10 flex flex-col justify-between px-8 md:flex-row md:px-24 xl:px-48 max-w-9xl">
      <div className="max-w-[400px] md:mr-34">
        <h1 className="text-white mb-4 leading-14 md:leading-18 text-5xl md:text-5.5xl font-semibold">
          Want to learn more? Get in touch.
        </h1>
        <div className="mb-10 text-white font-inter md:text-xl">
          Better your workplace culture, business outcomes, and sleep.
        </div>
      </div>
      <EmployersForm />
    </div>
  );
}
