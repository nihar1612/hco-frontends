function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="w-8 h-8 text-base font-medium leading-8 text-center rounded-full bg-gradient-to-bl from-dawnOrange-500 to-dawnPurple-500">
      {children}
    </span>
  );
}

interface AccordionHeadingProps {
  number: number;
  headerText: string;
}

export const AccordionHeading: React.FC<AccordionHeadingProps> = ({ number, headerText }) => {
  return (
    <div className="flex mt-8">
      <Pill>
        <p className="mt-px">{number}</p>
      </Pill>
      <h1 className="pl-4 text-xl font-semibold leading-8 xl:text-2xl">{headerText}</h1>
    </div>
  );
};
