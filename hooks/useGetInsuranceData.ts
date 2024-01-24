import { useEffect, useState } from 'react';
import { getFromStorage } from 'utils/storage';
import type { QuestionLocalStorageAnswer } from 'types/Question';
import { QUESTIONNAIRE_LOCALSTORAGE_KEY } from 'utils/constants';

// TODO: consider moving this config to Sanity.
const evryQuestionnaireSlug = 'signup-evry-v1';
const insuranceConfig: { [key: string]: any } = {
  florida: { excludedPlans: ['blue cross blue shield', 'anthem', 'magellan', 'medicare'] },
  texas: { excludedPlans: ['magellan', 'medicare'] },
  illinois: { excludedPlans: ['magellan', 'medicare'] },
};
const insurancePlans = [
  'Aetna',
  'Anthem',
  'Blue Cross Blue Shield',
  'Cigna',
  'Oscar',
  'Oxford',
  'United Healthcare',
  'Magellan',
  'Medicare',
  'None of the above',
];

export function useGetInsuranceData(answers?: any) {
  const [insurance, setInsurance] = useState<string>();
  const [insuranceMemberId, setInsuranceMemberId] = useState<string>();
  const [state, setState] = useState<string>();
  const [planType, setPlanType] = useState<string>();

  useEffect(() => {
    const cachedAnswers: { [key: string]: QuestionLocalStorageAnswer } =
      answers ?? getFromStorage(QUESTIONNAIRE_LOCALSTORAGE_KEY);
    const activeQuestionnaireAnswers = Object.values(cachedAnswers).filter(
      (q) => q.questionnaireSlug.includes('signup')
    );
    const stateQuestion = activeQuestionnaireAnswers.find((q) => q.questionSlug === 'insurance-state');
    if (stateQuestion?.answer) {
      setState(stateQuestion.answer);
    }
    const insurancePlanQuestion = activeQuestionnaireAnswers.find((q) => q.questionSlug === 'insurance-plan');
    if (insurancePlanQuestion?.answer) {
      setInsurance(insurancePlanQuestion.answer);
    }
    const insurancePlaTypeQuestion = activeQuestionnaireAnswers.find((q) => q.questionSlug === 'insurance-plan-type');
    if (insurancePlaTypeQuestion?.answer) {
      setPlanType(insurancePlaTypeQuestion.answer);
    }
    // Check for Evry signup questionnaire answers
    const evryQuesionnaireAnswers = Object.values(cachedAnswers).filter(
      (q) => q.questionnaireSlug === evryQuestionnaireSlug
    );
    const evryMemberIdQuestion = evryQuesionnaireAnswers.find((q) => q.questionSlug === 'evry-member-id');
    if (evryMemberIdQuestion?.answer) {
      setInsuranceMemberId(evryMemberIdQuestion.answer);
      setInsurance('Evry');
    }
  }, [answers]);
  const residesInSupportedState = state && state.toLowerCase() in insuranceConfig;
  const hasInsurancePlan = insurance && insurance !== 'None of the above';
  const isSupportedInsurancePlan = planType && planType.toLowerCase() != 'yes';
  const isEligibleForInsurance =
    Boolean(insuranceMemberId) ||
    (residesInSupportedState && isSupportedInsurancePlan &&
      hasInsurancePlan &&
      !insuranceConfig[state.toLowerCase()].excludedPlans.includes(insurance.toLowerCase()));
  return { insurance, state, isEligibleForInsurance, residesInSupportedState, insuranceMemberId, insurancePlans };
}
