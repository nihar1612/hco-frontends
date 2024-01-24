/* eslint-disable max-lines */
import { Link } from 'components/Link';
import { useForm } from 'react-hook-form'
import FormLabel from './FormLabel'

interface SignupFormProps {
  onSubmit: () => void;
  isLoading: boolean;
}

interface FormValues {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  terms: boolean;
}

export default function Signup({ onSubmit, isLoading }: SignupFormProps) {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()

  const terms = watch('terms')
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <FormLabel htmlFor="email">Email</FormLabel>
        <input
          type="text"
          name="email"
          id="email"
          placeholder="Enter your email"
          {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
          className="w-full p-4 text-sm border bg-dawnDark-500 border-dawnDark-400 text-dawnDark-300 rounded-xl focus:border-dawnOrange-500 focus:ring-0"
        />
        {errors.email && <p className="text-xs">{errors.email.message}</p>}
      </div>

      <div className="mt-4">
        <FormLabel htmlFor="firstName">First name</FormLabel>
        <input
          type="text"
          id="firstName"
          placeholder="Enter your first name"
          {...register('firstName', { required: true, maxLength: 80 })}
          className="w-full p-4 text-sm border bg-dawnDark-500 border-dawnDark-400 text-dawnDark-300 rounded-xl focus:border-dawnOrange-500 focus:ring-0"
        />
      </div>

      <div className="mt-4">
        <FormLabel htmlFor="lastName">Last name</FormLabel>
        <input
          type="text"
          id="lastName"
          placeholder="Enter your last name"
          {...register('lastName', { required: true, maxLength: 100 })}
          className="w-full p-4 text-sm border bg-dawnDark-500 border-dawnDark-400 text-dawnDark-300 rounded-xl focus:border-dawnOrange-500 focus:ring-0"
        />
      </div>

      <div className="mt-4">
        <FormLabel htmlFor="password">Password</FormLabel>
        <input
          type="password"
          id="password"
          placeholder="Create strong password"
          {...register('password', {
            required: true,
            minLength: 8,
            validate: {
              hasLowerCaseLetter: (s) => (s ? /[a-z]/.test(s) : true),
              hasUpperCaseLetter: (s) => (s ? /[A-Z]/.test(s) : true),
              hasNumber: (s) => (s ? /[0-9]/.test(s) : true),
              hasSpecialCharacter: (s) => (s ? /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(s) : true),
            },
          })}
          className="w-full p-4 text-sm border bg-dawnDark-500 border-dawnDark-400 text-dawnDark-300 rounded-xl focus:border-dawnOrange-500 focus:ring-0"
        />
        {errors.password && (
          <div className="text-xs">
            {errors.password?.type === 'minLength' && <p>Password must be 8 characters.</p>}
            {errors.password?.type === 'hasLowerCaseLetter' && <p>Password must have one lowercase letter.</p>}
            {errors.password?.type === 'hasNumber' && <p>Password must contain a number.</p>}
            {errors.password?.type === 'hasUpperCaseLetter' && <p>Password must have one uppercase letter.</p>}
            {errors.password?.type === 'hasSpecialCharacter' && <p>Password must contain a special character.</p>}
          </div>
        )}
      </div>

      <div className="mt-4">
        <label htmlFor="terms" className="flex items-center justify-start space-x-2">
          <div
            className={[
              'w-5 h-5 rounded-sm flex flex-shrink-0 justify-center items-center',
              terms ? '' : 'border border-dawnDark-400',
            ].join(' ')}
          >
            <input
              type="checkbox"
              id="terms"
              {...register('terms', { required: true })}
              className="absolute opacity-0"
            />
            <svg
              viewBox="0 0 20 20"
              className={[
                'fill-current text-dawnDark-300 w-4 h-4 pointer-events-none',
                terms ? 'block' : 'hidden',
              ].join(' ')}
            >
              <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
            </svg>
          </div>
          <span className="text-sm">
            I agree to the{' '}
            <Link href="/legal/terms-of-service">
              <a className="underline cursor-pointer">Terms of Service</a>
            </Link>
          </span>
        </label>
      </div>
      <div className="mt-12">
        <button
          type="submit"
          className="flex items-center px-8 py-4 text-xs font-medium text-white uppercase bg-gradient-to-tr from-dawnOrange-500 to-dawnPurple-500 rounded-3xl"
        >
          <span className="mr-2 tracking-wider">Continue to checkout</span>
          <div className="w-6 h-6">
            {isLoading ? (
              <svg className="fill-current" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a">
                    <stop stopColor="currentColor" stopOpacity="0" offset="0%" />
                    <stop stopColor="currentColor" stopOpacity=".631" offset="63.146%" />
                    <stop stopColor="currentColor" offset="100%" />
                  </linearGradient>
                </defs>
                <g fill="none" fillRule="evenodd">
                  <g transform="translate(1 1)">
                    <path d="M36 18c0-9.94-8.06-18-18-18" id="Oval-2" stroke="url(#a)" strokeWidth="2">
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 18 18"
                        to="360 18 18"
                        dur="0.9s"
                        repeatCount="indefinite"
                      />
                    </path>
                    <circle fill="currentColor" cx="36" cy="18" r="1">
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 18 18"
                        to="360 18 18"
                        dur="0.9s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  </g>
                </g>
              </svg>
            ) : (
              <svg
                className="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="{2}" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            )}
          </div>
        </button>
      </div>
    </form>
  )
}
