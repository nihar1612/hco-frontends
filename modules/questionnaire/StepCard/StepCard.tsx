import Image from 'next/image';

interface StepCardProps {
  image: string;
  heading: string;
  description: string;
  actionText: string;
  actionUrl: string;
}

export function StepCard({ image, heading, description, actionText, actionUrl }: StepCardProps) {
  return (
    <>
      <div className="items-center p-6 text-center bg-dawnDark-100 rounded-2xl bg-opacity-5 md:p-10">
        <div className="hidden md:block">
          <Image src={image} height={184} width={184} alt="" />
        </div>
        <div className="block md:hidden">
          <Image src={image} height={80} width={80} alt="" />
        </div>
        <div>
          <div className="pt-4 text-xl font-semibold text-white md:pt-8 md:text-2xl">{heading}</div>
        </div>
        <h1 className="pt-2 text-base text-white md:pt-4 md:text-xl">{description}</h1>
        <div className="pt-4 md:pt-8">
          <button
            className="w-full px-8 py-4 text-xs font-medium text-white uppercase bg-gradient-to-tr from-dawnOrange-500 to-dawnPurple-500 rounded-3xl"
            onClick={(e) => {
              e.preventDefault();
              window.open(actionUrl, '_blank');
            }}
          >
            <span>{actionText}</span>
          </button>
        </div>
      </div>
    </>
  );
}
