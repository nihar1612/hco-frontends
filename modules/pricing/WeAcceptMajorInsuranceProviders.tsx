import Image from 'next/image';
import Link from 'next/link';

export function WeAcceptMajorInsuranceProviders() {
  return (
    <div className="flex justify-center pt-22 pb-22 md:pt-30 md:pb-18">
      <div className="flex flex-col items-center mx-8 md:flex-row md:space-x-22 xl:space-x-34">
        <div className="relative md:hidden">
          <Image src="/images/pricing/we_accept_major_insurance_providers_mobile.png" alt="" width="311" height="280" />
        </div>
        <div className="hidden md:block">
          <Image src="/images/pricing/we_accept_major_insurance_providers.png" alt="" width="501" height="328" />
        </div>
        <div className="max-w-[394px] mt-4 md:mt-0">
          <h2 className="font-semibold text-2.5xl leading-8 md:text-5xl md:leading-14">
            We accept major insurance providers
          </h2>
          <p className="mt-4 text-base font-inter md:text-xl md:leading-8">
            If your insurance plan is in-network with Dawn, it’s likely that it will cover a portion of the cost of your
            therapy plan.
          </p>
          <div className="mt-4">
            <Link href="/questionnaire">
              <a className="text-base font-bold text-dawnPurple-500 md:text-xl md:leading-8">Get Started</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
