export interface SignupFormFields {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  password: string;
  confirmPassword: string;
  state?: string;
  insurance?: string;
  insuranceMemberId: string;
  insuranceGroupId?: string;
  dateOfBirth: any;
}
