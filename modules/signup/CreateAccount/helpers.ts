import { OperationResult } from 'urql';

export function getSignupErrorMessage(signupError: OperationResult['error']) {
  console.log(signupError);
  if (signupError.graphQLErrors?.[0]?.extensions.code === '400') {
    return signupError.graphQLErrors?.[0].message;
  }

  return 'Failed to signup. Please contact us or try again later.';
}

export function validatePassword(password: string) {
  const tests = [
    [(password: string) => password.length < 8, 'Password should contain at least 8 characters.'],
    [(password: string) => !/[a-z]/.test(password), 'Password should contain at least 1 lower-case alphabet.'],
    [(password: string) => !/[A-Z]/.test(password), 'Password should contain at least 1 upper-case alphabet.'],
    [(password: string) => !/[0-9]/.test(password), 'Password should contain at least 1 number.'],
  ] as const;

  return tests.find(([test]) => test(password))?.[1] || true;
}
