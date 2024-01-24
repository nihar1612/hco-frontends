import { WithQuestionnaireLayout } from 'modules/layout/WithQuestionnaireLayout';

export default function SignupInitialComplete() {
  return (
    <WithQuestionnaireLayout
      showBackButton={false}
      isContinueButtonDisabled={false}
    >
      <div className="flex justify-center mx-6">
        <div>
          <div className="max-w-[608px] mx-auto">
            <h1 className="md:text-5xl text-2.5xl leading-8 font-semibold text-center md:leading-14">
              <span className="max-w-xs">Your insurance most likely covers Dawn!</span>
            </h1>
            <p className="max-w-4xl pt-2 text-base leading-8 text-center lg:text-xl lg:leading-8 font-inter">
              We are currently reviewing your health insurance information and will reach out over text! Here’s what to expect next:
            </p>
          </div>

          <div className="max-w-sm px-4 py-6 mx-auto mt-6 bg-white md:hidden bg-opacity-6 rounded-xl">
            <ul className="space-y-6">
              <li className="flex space-x-4">
                <div>
                  <p className="text-dawnOrange-400 font-inter">01.</p>
                </div>
                <p className="text-base font-inter">Check your phone for a text from us</p>
              </li>
              <li className="flex space-x-4">
                <div>
                  <p className="text-dawnOrange-400 font-inter">02.</p>
                </div>
                <p className="text-base font-inter">Verify your insurance information</p>
              </li>
              <li className="flex space-x-4">
                <div>
                  <p className="text-dawnOrange-400 font-inter">03.</p>
                </div>
                <p className="text-base font-inter">Meet your therapist and start sleeping better with Dawn</p>
              </li>
            </ul>
          </div>

          <div className="hidden mt-8 space-x-6 md:flex">
            <FeatureBox icon={<p className="text-dawnOrange-500">STEP 1</p>} text="Check your phone for a text from us" />
            <FeatureBox icon={<p className="text-dawnOrange-500">STEP 2</p>} text="Verify your insurance information" />
            <FeatureBox icon={<p className="text-dawnOrange-500">STEP 3</p>} text="Talk to an enrollment coordinator" />
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
