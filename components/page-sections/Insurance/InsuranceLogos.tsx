import Image from 'next/image';
import Aetna from 'public/images/landing_page/insurance/aetna.png';
import Anthem from 'public/images/landing_page/insurance/anthem.png';
import Bsbs from 'public/images/landing_page/insurance/bsbs.png';
import Uhc from 'public/images/landing_page/insurance/uhc.png';
import Cigna from 'public/images/landing_page/insurance/cigna.png';
import AetnaMobile from 'public/images/landing_page/insurance/aetna-mobile.png';
import AnthemMobile from 'public/images/landing_page/insurance/anthem-mobile.png';
import BsbsMobile from 'public/images/landing_page/insurance/bsbs-mobile.png';
import UhcMobile from 'public/images/landing_page/insurance/uhc-mobile.png';
import CignaMobile from 'public/images/landing_page/insurance/cigna-mobile.png';

export function InsuranceLogos() {
  return (
    <section className="flex justify-center px-8">
      <div className="flex flex-col items-center justify-center md:hidden">
        <h2 className="text-base text-center font-inter text-dawnDark-200">Accepted by</h2>
        <div className="grid grid-cols-6 gap-4 mt-8">
          <div className="col-span-2">
            <Image src={AetnaMobile} height={32} width={98} alt="aetna" />
          </div>
          <div className="col-span-2">
            <Image src={AnthemMobile} height={32} width={98} alt="anthem" />
          </div>
          <div className="col-span-2">
            <Image src={CignaMobile} height={32} width={98} alt="cigna" />
          </div>
          <div className="col-span-2 col-start-2 cold-end-4">
            <Image src={UhcMobile} height={32} width={98} alt="united healthcare" />
          </div>
          <div className="col-span-2">
            <Image src={BsbsMobile} height={32} width={98} alt="blue cross blue shield" />
          </div>
        </div>
      </div>

      <div className="flex-wrap items-center justify-center hidden gap-12 md:flex">
        <h2 className="text-lg text-center font-inter text-dawnDark-200">Accepted by</h2>
        <Image src={Aetna} height={32} width={116} alt="aetna" />
        <Image src={Anthem} height={28} width={148} alt="anthem" />
        <Image src={Cigna} height={40} width={95} alt="cigna" />
        <Image src={Uhc} height={32} width={161} alt="united healthcare" />
        <Image src={Bsbs} height={32} width={150} alt="blue cross blue shield" />
      </div>
    </section>
  );
}
