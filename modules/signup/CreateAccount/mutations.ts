import { gql } from 'urql';

export const signupMutation = gql`
  mutation signUp(
    $email: String!
    $firstName: String!
    $lastName: String!
    $phoneNumber: String
    $password: String!
    $giveFreeTrial: Boolean
    $coupon: String!
    $questionnaireAnswers: String
    $utmData: String
    $state: String
    $insurance: String
    $insuranceMemberId: String
    $giveFreeSubscription: Boolean
  ) {
    signUp(
      user: {
        email: $email
        firstName: $firstName
        lastName: $lastName
        phoneNumber: $phoneNumber
        password: $password
        questionnaireAnswers: $questionnaireAnswers
        utmData: $utmData
        state: $state
        insurance: $insurance
        insuranceMemberId: $insuranceMemberId
      }
      stripeCheckout: { coupon: $coupon, giveFreeTrial: $giveFreeTrial, giveFreeSubscription: $giveFreeSubscription }
    ) {
      stripeCreateCustomerResult
      user
    }
  }
`;

export const insuranceMutation = gql`
  mutation collectUserInsurance(
    $email: String!
    $firstName: String!
    $lastName: String!
    $phoneNumber: String
    $dateOfBirth: date!
    $questionnaireAnswers: String
    $state: String!
    $insurance: String!
    $insuranceMemberId: String!
    $insuranceGroupId: String
    $utmData: String
    $sessionId: String
  ) {
    collectUserInsurance(
        email: $email
        firstName: $firstName
        lastName: $lastName
        phoneNumber: $phoneNumber
        dateOfBirth: $dateOfBirth
        questionnaireAnswers: $questionnaireAnswers
        state: $state
        insurance: $insurance
        insuranceMemberId: $insuranceMemberId
        insuranceGroupId: $insuranceGroupId
        sessionId: $sessionId
        utmData: $utmData
    ) {
      id
    }
  }
`;


export const removeUserMutation = gql`
  mutation removeUser($userId: String!) {
    removeUser(id: $userId) {
      id
    }
  }
`;
