import _ from 'lodash';
import { useEffect, useState } from 'react';

export interface FormItemProps {
  label: string;
  className?: string;
  optional?: boolean;
  children: React.ReactNode;
}

function* getDate() {
  let date = Date.now();
  while (true) {
    const dateobj = new Date(date);
    yield new Date(dateobj.getFullYear(), dateobj.getMonth(), dateobj.getDate(), dateobj.getHours());
    date = date + Math.random() * 1000 * 60 * 60 * 10;
    if (date > Date.now() + 1000 * 60 * 60 * 24 * 4) {
      date = Date.now();
    }
  }
}

export function DateBox({
  date,
  onClick,
  selected,
}: {
  date: string;
  onClick: (event: any) => void;
  selected: boolean;
}) {
  const formattedDate = new Date(date);
  return (
    <div
      className={`z-10 flex flex-col p-4 text-center border rounded-lg ${
        selected ? 'border-transparent border-gradient-bl-orange-purple-dawnDark-700' : 'border-dawnDark-400'
      } md:p-6 md:rounded-2xl`}
      onClick={onClick}
    >
      <div className="pb-2 text-sm uppercase md:text-base text-dawnDark-200">
        {formattedDate.toLocaleDateString('en-US', { weekday: 'short' })}
      </div>
      <div className="font-bold md:text-xl font-inter">
        {formattedDate.toLocaleDateString('en-US', { day: '2-digit', month: 'short' })}
      </div>
    </div>
  );
}

export function ScheduleCall({ setCallDate }: { setCallDate: (date: Date) => void }) {
  const [availabilitesByDate, setAvailabilitiesByDate] = useState<{ [key: string]: Date[] }>({});
  const [selectedDay, setSelectedDay] = useState<keyof typeof availabilitesByDate | undefined>(undefined);

  useEffect(() => {
    const dateGenerator = getDate();
    const availabilites = Array.from(Array(30)).map(() => dateGenerator.next().value) as Date[];
    const availabilitesByDate = _.groupBy(availabilites, (x) => x.toISOString().split('T')[0]);
    setAvailabilitiesByDate(availabilitesByDate);
    setSelectedDay(Object.keys(availabilitesByDate)[0] as keyof typeof availabilitesByDate);
  }, []);

  return (
    <>
      <div className="grid grid-cols-3 gap-2 md:gap-4 md:grid-flow-col md:grid-rows-1">
        {Object.keys(availabilitesByDate).map((date: keyof typeof availabilitesByDate) => (
          <DateBox
            key={date}
            date={date as string}
            onClick={() => setSelectedDay(date)}
            selected={date === selectedDay}
          />
        ))}
      </div>
      <div className="my-6 border border-white border-opacity-10"></div>
      <div className="grid grid-cols-3 gap-2 md:gap-4">
        {selectedDay &&
          availabilitesByDate[selectedDay].map((time: Date, index) => (
            <div
              key={`${selectedDay}_${index}`}
              className="z-10 flex flex-col p-4 text-center border rounded-lg border-dawnDark-400 md:p-8 md:rounded-2xl"
              onClick={() => setCallDate(time)}
            >
              <div className="text-sm font-semibold md:text-xl font-inter">
                {time.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })}
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
