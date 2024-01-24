export function Aggregates() {
  return (
    <div className="flex justify-center bg-white">
      <div className="max-w-7xl pt-22 xl:pt-30">
        <div className="flex flex-col items-center xl:flex-row xl:space-x-8 space-y-22 xl:space-y-0">
          <div className="flex flex-col items-center xl:w-72">
            <div className="text-transparent bg-clip-text bg-gradient-to-br from-dawnOrange-500 to-dawnPurple-500 text-6.25xl leading-18 xl:text-7xl font-bold">
              75%
            </div>
            <p className="xl:px-6 mt-2 md:mt-6 text-base text-center xl:text-xl max-w-[176px] xl:max-w-none">
              less time needed to fall asleep
            </p>
          </div>
          <div className="flex flex-col items-center xl:w-72">
            <div className="text-transparent bg-clip-text bg-gradient-to-br from-dawnOrange-500 to-dawnPurple-500 text-6.25xl leading-18 xl:text-7xl font-bold">
              80%
            </div>
            <p className="mt-2 md:mt-6 text-base text-center xl:text-xl max-w-[176px] xl:max-w-none">
              less time awake in the middle of the night
            </p>
          </div>
          <div className="flex flex-col items-center xl:w-72">
            <div className="text-transparent bg-clip-text bg-gradient-to-br from-dawnOrange-500 to-dawnPurple-500 text-6.25xl leading-18 xl:text-7xl font-bold">
              60%
            </div>
            <p className="px-6 mt-2 md:mt-6 text-base text-center xl:text-xl max-w-[176px] xl:max-w-none">
              decrease in ISI symptoms
            </p>
          </div>
          <div className="flex flex-col items-center xl:w-72">
            <div className="text-transparent bg-clip-text bg-gradient-to-br from-dawnOrange-500 to-dawnPurple-500 text-6.25xl leading-18 xl:text-7xl font-bold">
              90 min
            </div>
            <p className="xl:px-10 mt-2 md:mt-6 text-base text-center xl:text-xl max-w-[176px] xl:max-w-none">
              increase in total sleep time
            </p>
          </div>
        </div>
        <p className="px-10 mt-16 mb-6 text-base italic text-center xl:text-lg font-inter text-dawnDark-400">
          Based on users who followed the program for 1 month or more
        </p>
      </div>
    </div>
  );
}
