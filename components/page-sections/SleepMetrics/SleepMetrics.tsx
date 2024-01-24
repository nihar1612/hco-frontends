import classNames from 'classnames';

function Metric({ metricText, subtitle }: { metricText: string; subtitle: string }) {
  return (
    <div className="flex flex-col items-center w-[250px]">
      <div className="text-center text-[4.5rem] font-bold text-transparent bg-clip-text bg-gradient-to-bl from-dawnOrange-500 to-dawnPurple-500">
        {metricText}
      </div>
      <span className="text-center h-[48px] w-[250px] md:text-xl">{subtitle}</span>
    </div>
  );
}

export function SleepMetrics() {
  return (
    <section className={classNames('flex flex-col items-center px-8 pt-22 pb-6 md:pt-30 md:pb-6 bg-white')}>
      <div className="flex gap-12 flex-row flex-wrap items-center justify-center ">
        <Metric metricText="75%" subtitle="less time needed to fall asleep" />
        <Metric metricText="80%" subtitle="less time awake in the middle of the night" />
        <Metric metricText="60%" subtitle="decrease in insomnia symptoms" />
        <Metric metricText="90 min" subtitle="increase in total sleep time" />
      </div>
      <span className="italic md:text-base text-center text-dawnDark-400 mt-24">
        Based on users who followed the program for 1 month or more
      </span>
    </section>
  );
}
