import { Dialog } from '@headlessui/react';
import { ContinueButton } from 'modules/questionnaire/ContinueButton';
import * as React from 'react';

export function ConsentModal({
  name,
  dateOfBirth,
  state,
  isOpen,
  onClose,
  onAcknowledge,
  loading,
}: {
  name: string;
  dateOfBirth: Date;
  state: string;
  isOpen: boolean;
  onClose: () => void;
  onAcknowledge: () => void;
  loading: boolean;
}) {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-full p-4">
          <Dialog.Panel className="p-6 text-white align-middle shadow-xl md:p-12 bg-dawnDark-550 rounded-2xl md:max-w-2xl">
            <Dialog.Title className={'text-xl font-semibold mb-2 text-center md:text-2xl'}>
              Telehealth Informed Consent
            </Dialog.Title>
            <Dialog.Description className="flex flex-col font-inter">
              <div className="flex-grow mt-4 overflow-y-scroll h-[65vh] md:text-xl">
                <div>
                  Patient Name {name}
                  <br />
                  Date of Birth{' '}
                  {dateOfBirth.toLocaleDateString('en-US', { day: 'numeric', year: 'numeric', month: 'short' })}
                  <br />
                  Date {new Date().toLocaleDateString('en-US', { day: 'numeric', year: 'numeric', month: 'short' })}
                  <br />
                </div>
                Thank you for choosing Dawn Health, P.C. (“Dawn Health”)! You are viewing this form because you have
                elected to engage in behavioral health services with licensed mental health practitioners at Dawn
                Health. Your practitioner who is licensed to practice behavioral health services in the State of {state}
                . By clicking &quot;I acknowledge,&quot; I ACKNOWLEDGE I HAVE READ AND UNDERSTAND THE TERMS PRESENTED
                BELOW AND UNDERSTAND THE RISKS AND BENEFITS OF TELEHEALTH. BY ACCEPTING THESE TERMS OF USE, I GIVE MY
                INFORMED CONSENT TO PARTICIPATE IN A TELEHEALTH VISIT UNDER THESE TERMS. <br />
                What is Telehealth?
                <br />
                Telehealth is the delivery of healthcare services, including examination, consultation, diagnosis, and
                treatment, through electronic communication technologies when you (the patient) are located in a
                different location than your mental health practitioner. Dawn Health allows you to receive services from
                a mental health practitioner without having to travel to another location or schedule a separate
                appointment. This helps you avoid long wait times that you might otherwise experience at an in-person
                visit. During your telehealth visit, our mental health practitioners may discuss details of your mental
                health and medical history and personal health information using interactive video, audio, and
                telecommunications technology.
                <br />
                Benefits Using Telehealth
                <br />
                The benefits of telehealth include having access to healthcare anywhere you have access to the
                internet—including from the comfort of your home. Telehealth means you do not have to wait several days
                for an in-person appointment. Telehealth also means you do not have to travel great distances to gain
                access to specialty care that may not be available in your community.
                <br />
                Possible Risks of Using Telehealth
                <br />
                As with any mental health and/or medical treatment, there are potential risks associated with the use of
                telehealth. Dawn Health believes that the chance of any of these risks occurring is very low. These
                risks may include, without limitation, the following: Delays in evaluation, consultation, or treatment
                may occur due to deficiencies or failures of the equipment or the Internet, which may include poor video
                and data quality, Internet outages, or other service interruption issues. You may reschedule the visit
                with your Dawn Health mental health practitioner should these interruptions occur. Security protocols
                could fail, causing a breach of privacy of personal and mental health information. Because Dawn Health
                does not have access to your complete mental health or medical records, if you do not disclose to your
                mental health practitioner a full list of your mental health and/or medical history, including
                diagnoses, treatments, and medications/supplements, some negative outcomes may occur. Telehealth
                services are NOT emergency services and your Personal Data (as defined in the Dawn Health Privacy
                Policy) WILL NOT BE MONITORED 24/7. If you think you are experiencing a mental health emergency, SEEK
                SERVICES IN YOUR AREA IMMEDIATELY. If you think you are experiencing a medical emergency, CALL 911
                IMMEDIATELY. THE CARE YOU RECEIVE WILL BE AT THE SOLE DISCRETION OF THE MENTAL HEALTH PRACTITIONER WHO
                IS TREATING YOU, WITH NO GUARANTEE DIAGNOSIS OR TREATMENT. Your Rights and Acknowledgements You
                understand that your personal mental health and/or medical information may be shared with other
                individuals in accordance with the Dawn Health Privacy Policy and regulations or laws in the state or
                territory in which you are located. Further, telehealth may involve electronic communication of your
                personal mental health and/or medical information to remote mental health practitioners who may be
                located outside of your state. You have the same privacy rights via telehealth that you would have
                during an in-person visit. You understand that no results can be guaranteed or assured—you may not
                achieve the anticipated benefits of the telehealth services. You understand that a variety of
                alternative methods of mental health and/or medical care may be available to you, and that you may
                choose one or more of these at any time. You understand that some information submitted to Dawn Health
                may be part of your mental health record, and you may or may not have the right to review and receive
                copies of certain mental health records that pertain to you. For more information on your right to
                access your mental health records, please contact team@dawn.health. You attest that you are located in
                the state checked below and will be present in the state indicated below during all telehealth
                encounters with Dawn Health, P.C. This Telehealth Informed Consent is valid during your entire treatment
                with Dawn Health. If you would like to withdraw consent, you must do so prior to receiving any further
                services by emailing us at team@dawn.health. Your withdrawal of consent will not affect your right to
                future care or treatment.
              </div>
              <div className="w-full my-4">
                <ContinueButton
                  action={onAcknowledge}
                  disabled={loading}
                  text={loading ? 'Loading...' : 'I acknowledge'}
                />
              </div>
            </Dialog.Description>{' '}
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
}
