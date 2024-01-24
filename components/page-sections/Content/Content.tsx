import Link from 'next/link';
import { PortableText } from 'components/PortableText';
import classNames from 'classnames';

interface ContentProps {
  portableText: any;
  callToAction: {
    text: string;
    url: string;
  };
}

export function Content({ portableText, callToAction }: ContentProps) {
  return (
    <section className="flex justify-center py-12 md:py-30">
      <div className="max-w-2xl mx-6">
        <div className={classNames('text-base leading-6 break-words font-inter md:text-xl md:leading-8')}>
          <PortableText blocks={portableText} />
        </div>
        {callToAction?.url && callToAction?.text && (
          <div className="flex justify-center mt-10 md:mt-14">
            <Link href={callToAction.url}>
              <a className="flex items-center justify-center flex-1 max-w-md px-8 py-4 text-sm font-medium tracking-widest text-white uppercase rounded-full md:flex-none bg-gradient-to-tr from-dawnOrange-500 to-dawnPurple-500 md:py-6 md:text-base">
                {callToAction.text}
              </a>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
