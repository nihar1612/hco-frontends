import { useState } from 'react';
import { useScrollPosition } from 'hooks/useScrollPosition';

export function PostProgressbar({ startingRef }: { startingRef: any }) {
  const [progress, setProgress] = useState(0);

  useScrollPosition(
    ({ currPos }) => {
      const position = currPos.y - window.innerHeight / 2;
      const height = startingRef?.current?.clientHeight;
      if (position < 0) {
        setProgress(Math.min(100, Number(((Math.abs(position) / height) * 100).toFixed(1))));
      } else {
        setProgress(0);
      }
    },
    [],
    startingRef
  );
  return (
    <div className="w-full h-1 bg-white rounded-full bg-opacity-10">
      <div
        className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-dawnOrange-500 to-dawnPurple-500"
        style={{
          width: `${progress}%`,
          transition: 'width .2s',
        }}
      ></div>
    </div>
  );
}
