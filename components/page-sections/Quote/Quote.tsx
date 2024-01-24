import Image from 'next/image';

import SanityImage from 'modules/sanity/SanityImage';

interface QuoteProps {
  text: string;
  source: string;
  sourceTitle: string;
  sourceImage?: { [key: string]: any };
  sourceImageStatic?: any;
}

export function Quote({ text, source, sourceTitle, sourceImage, sourceImageStatic }: QuoteProps) {
  return (
    <section className="flex justify-center py-22 md:py-30">
      <div className="max-w-1.5xl mx-8">
        <svg className="w-10 mx-auto md:w-13" viewBox="0 0 52 36" fill="none">
          <path
            d="M13.5823 15.756C16.521 15.756 18.877 16.6173 20.6503 18.34C22.4236 20.012 23.3103 22.3173 23.3103 25.256C23.3103 28.0933 22.3476 30.4747 20.4223 32.4C18.497 34.2747 15.7356 35.212 12.1383 35.212C8.43965 35.212 5.60231 33.9707 3.62631 31.488C1.65031 29.0053 0.662313 25.8387 0.662313 21.988C0.662313 18.2893 1.54898 15.0213 3.32231 12.184C5.09565 9.29599 7.35031 6.86399 10.0863 4.888C12.8223 2.912 15.5836 1.36666 18.3703 0.251991L20.4223 4.58399C17.4836 5.648 14.7476 7.42133 12.2143 9.904C9.68098 12.3867 8.36365 14.9707 8.26231 17.656C8.46498 17.3013 9.04765 16.896 10.0103 16.44C10.973 15.984 12.1636 15.756 13.5823 15.756ZM41.3983 15.756C44.337 15.756 46.693 16.6173 48.4663 18.34C50.2396 20.012 51.1263 22.3173 51.1263 25.256C51.1263 28.0933 50.1636 30.4747 48.2383 32.4C46.313 34.2747 43.5516 35.212 39.9543 35.212C36.2556 35.212 33.4183 33.9707 31.4423 31.488C29.4663 29.0053 28.4783 25.8387 28.4783 21.988C28.4783 18.2893 29.365 15.0213 31.1383 12.184C32.9116 9.29599 35.1663 6.86399 37.9023 4.888C40.6383 2.912 43.3996 1.36666 46.1863 0.251991L48.2383 4.58399C45.2996 5.648 42.5636 7.42133 40.0303 9.904C37.497 12.3867 36.1796 14.9707 36.0783 17.656C36.281 17.3013 36.8636 16.896 37.8263 16.44C38.789 15.984 39.9796 15.756 41.3983 15.756Z"
            fill="url(#paint0_linear_311:3561)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_311:3561"
              x1="56.5"
              y1="-2"
              x2="31.1043"
              y2="54.1136"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.166667" stopColor="#FF8F5B" />
              <stop offset="0.822917" stopColor="#536DE2" />
            </linearGradient>
          </defs>
        </svg>

        <p className="mt-4 text-lg leading-8 text-center md:text-2xl md:leading-10">{text}</p>
        <div className="flex justify-center">
          <div className="flex items-center mt-4 space-x-4">
            {sourceImage && (
              <div className="relative w-10 h-10 overflow-hidden rounded-full md:w-14 md:h-14">
                <SanityImage image={sourceImage} width={100} />
              </div>
            )}
            {sourceImageStatic && (
              <div className="w-10 h-10 overflow-hidden rounded-full md:w-12 md:h-12">
                <Image src={sourceImageStatic} alt="" />
              </div>
            )}
            <div className="flex-1 text-base leading-6 md:text-xl md:leading-8">
              <div className="font-semibold md:inline-block">
                {source}
                <span className="hidden md:inline-block md:mr-1">,</span>
              </div>
              <div className="text-xs md:text-xl md:leading-8 md:inline-block text-dawnDark-700">{sourceTitle}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
