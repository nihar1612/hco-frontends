import Link from 'next/link';

interface CallToActionStickyBottomProps {
  callToActionStickyBottomText: string;
  progress?: number;
}
export function CallToActionStickyBottom({ callToActionStickyBottomText }: CallToActionStickyBottomProps) {
  return (
    <div className="fixed bottom-0 z-50 flex w-full">
      <div className="flex justify-center w-full text-base text-white md:justify-end md:text-xl ">
        <div className="flex justify-center w-full px-6 py-4 md:w-auto bg-dawnDark-700 font-inter rounded-t-2xl md:mr-12 2xl:mr-34">
          <Link href="/questionnaire">
            <a className="flex items-center">
              <div>{callToActionStickyBottomText}</div>
              <svg className="w-4 h-4 ml-3 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none">
                <path
                  d="M8 20L16 12L8 4"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                />
              </svg>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
