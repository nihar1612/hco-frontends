import Image from 'next/image';
import imageMayo from 'public/images/landing_page/mayo.png';
import imageHarvard from 'public/images/landing_page/harvard.png';
import imageAasm from 'public/images/landing_page/aasm.png';

export function ResearchBackedBy({ title }: { title: string; showCallToAction: boolean }) {
  return (
    <section className="mx-8 py-22 md:py-30">
      <h2 className="max-w-[220px] md:max-w-none mx-auto text-2xl font-semibold leading-8 text-center  md:text-4xl">
        {title}
      </h2>
      <div className="flex justify-center">
        <div className="flex flex-col items-center flex-1 max-w-6xl space-y-14 md:space-y-0 md:flex-row mt-14">
          <div className="relative w-full md:h-12 h-14">
            <Image src={imageMayo} alt="" layout="fill" objectFit="contain" />
          </div>
          <div className="relative w-full h-12 md:h-14">
            <Image src={imageHarvard} alt="" layout="fill" objectFit="contain" />
          </div>
          <div className="relative w-full h-6 md:h-10">
            <Image src={imageAasm} alt="" layout="fill" objectFit="contain" />
          </div>
        </div>
      </div>
    </section>
  );
}
