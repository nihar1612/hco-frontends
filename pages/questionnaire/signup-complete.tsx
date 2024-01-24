import { WithQuestionnaireLayout } from 'modules/layout/WithQuestionnaireLayout';
import { useGetInsuranceData } from 'hooks/useGetInsuranceData';

export default function SignupInitialComplete() {
  const { isEligibleForInsurance } = useGetInsuranceData();

  return (
    <WithQuestionnaireLayout
      showBackButton={false}
      isContinueButtonDisabled={false}
    >
      <div className="flex justify-center mx-6">
        <div>
          <div className="max-w-[608px] mx-auto">
            <h1 className="md:text-5xl text-2.5xl leading-8 font-semibold text-center md:leading-14">
              {isEligibleForInsurance ? (
                <span className="max-w-xs">
                  Your insurance most likely covers Dawn!
                </span>
              ) : (
                <>Good therapy is still affordable!</>
              )}
            </h1>
            <p className="pt-2 text-base leading-8 text-center max-w-4xl lg:text-xl lg:leading-8 font-inter">
              {isEligibleForInsurance
                ? 'We are currently reviewing your health insurance information and will reach out over text! Here’s what to expect next:'
                : `Your insurance doesnt cover Dawn, but we have an affordable private pay rate of $75 per session. Text or call (936) 265-0766 to get setup.`}
            </p>
          </div>
        </div>
      </div>
    </WithQuestionnaireLayout>
  );
}

interface FeatureBoxProps {
  icon: React.ReactNode;
  text: string;
}
function FeatureBox({ icon, text }: FeatureBoxProps) {
  return (
    <div className="px-6 py-6 border border-transparent rounded-xl border-gradient-bl-orange-purple-dawnDark-700 w-[258px] h-[168px]">
      <div className="flex justify-center">{icon}</div>
      <p className="mt-6 text-xl text-center text-white font-inter">{text}</p>
    </div>
  );
}
