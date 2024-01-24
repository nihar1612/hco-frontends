import { WithAccountLayout } from 'modules/layout/WithAccountLayout';
import { Link } from 'components/Link';
import Image from 'next/image';
interface WithThankYouLayoutProps {
  title: string;
  subtitle: string;
}

export default function WithThankYouLayout({ title, subtitle }: WithThankYouLayoutProps) {
  return (
    <WithAccountLayout title="Signup | Dawn Health">
      <div className="w-full max-w-screen-sm mx-auto text-center xl:pt-12">
        <div className="pb-6">
          <div className="hidden md:flex md:align-center md:justify-center">
            <Image src="/complete.svg" height={72} width={72} alt="" />
          </div>
          <div className="flex justify-center md:hidden align-center">
            <Image src="/complete.svg" height={56} width={56} alt="" />
          </div>
        </div>
        <h1 className="pb-2 text-3xl font-semibold leading-10 text-white md:text-4xl">{title}</h1>
        <p className="mt-4 text-lg text-dawnDark-300">{subtitle}</p>
        <p className="mt-12">
          <Link href="https://dawn.health">
            <a className="flex items-center justify-center w-full h-full px-8 py-4 mt-8 text-xs font-medium tracking-widest text-white uppercase rounded-full bg-gradient-to-bl from-dawnOrange-500 to-dawnPurple-500">
              Back to home
            </a>
          </Link>
        </p>
      </div>
    </WithAccountLayout>
  );
}
