import { useState, Dispatch, SetStateAction } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import styles from './CallToActionSlider.module.css';
import { useRouter } from 'next/router';

const WORRY_SCORE_TEXT = ['Very often', 'Often', 'Sometimes', 'Rarely', 'Never'];
const SLEEP_QUALITY_TEXT = ['Very poor', 'Poor', 'Moderate', 'Great', 'Excellent'];
const MENTAL_HEALTH_QUALITY_SCORE_TEXT = ['Very Poor', 'Poor', 'Moderate', 'Great', 'Excellent'];

function calculateMentalHealthQualityScore(sleepQuality: number, worryScore: number) {
  // Possible score range 0 - 4
  let mentalHealthQualityScore = Math.floor((worryScore + sleepQuality) / 2);
  console.log(mentalHealthQualityScore);
  if (worryScore < 2 || sleepQuality < 2) {
    mentalHealthQualityScore = 0;
  }
  else if (worryScore == 2) {
    mentalHealthQualityScore = 1;
  }
  return mentalHealthQualityScore;
}

interface CallToActionSliderProps {
  href?: string;
}
export function CallToActionSlider({ href }: CallToActionSliderProps) {
  const router = useRouter();
  const [sleepQuality, setSleepQuality] = useState(0);
  const [worryScore, setWorryScore] = useState(0);
  const mentalHealthQualityScore = calculateMentalHealthQualityScore(sleepQuality, worryScore);
  const touched = worryScore > 0 || sleepQuality > 0;

  return (
    <div className="p-6 sm:p-10 bg-dawnDark-700 rounded-xl">
      <div className={classNames('flex', `${touched ? 'justify-between' : 'justify-center'}`)}>
        <div className="py-2">
          <span className="text-base font-semibold text-white sm:text-2xl font-inter">
            {touched ? 'Mental Health Quality' : 'Check Your Mental Health Quality'}
          </span>
        </div>

        {touched && (
          <div className="px-4 py-2 bg-white bg-opacity-6 rounded-2xl">
            <span className="text-base font-semibold text-white uppercase sm:text-2xl font-inter">
              {MENTAL_HEALTH_QUALITY_SCORE_TEXT[mentalHealthQualityScore]}
            </span>
          </div>
        )}
      </div>
      <div className="mt-10">
        <div className="space-y-3">
          <div className="flex flex-col justify-between space-y-2 sm:space-y-2 sm:flex-row sm:items-center">
            <span className="text-base text-white sm:text-xl sm:leading-8 font-inter">How Is Your Sleep?</span>
            <span className="text-base font-bold text-white sm:text-xl sm:leading-8 font-inter">
              {SLEEP_QUALITY_TEXT[sleepQuality]}
            </span>
          </div>
          <Slider onChange={setSleepQuality} value={sleepQuality} min={0} max={4} />
        </div>
        <div className="mt-16 space-y-3">
          <div className="flex flex-col justify-between space-y-2 sm:space-y-2 sm:flex-row sm:items-center">
            <span className="text-base text-white sm:text-xl sm:leading-8 font-inter">How often do you feel worry?</span>
            <span className="text-base font-bold text-white sm:text-xl sm:leading-8 font-inter">
              {WORRY_SCORE_TEXT[worryScore]}
            </span>
          </div>
          <Slider onChange={setWorryScore} value={worryScore} min={0} max={4} />
        </div>
      </div>

      <div className="flex justify-center mt-16">
        <Link href={{ pathname: href ?? '/questionnaire', query: { utm_source: router.asPath } }}>
          <a className="w-full px-8 py-4 text-center rounded-full sm:w-auto bg-gradient-to-tr from-dawnPurple-500 to-dawnOrange-500">
            <span className="font-sans text-sm font-medium leading-none tracking-widest text-white uppercase sm:text-base">
              Start Feeling Better
            </span>
          </a>
        </Link>
      </div>
    </div>
  );
}

interface SliderProps {
  value: number;
  min: number;
  max: number;
  onChange: Dispatch<SetStateAction<number>>;
}
function Slider({ value, min, max, onChange }: SliderProps) {
  return (
    <div className="relative">
      <div className="absolute w-full h-2 bg-white rounded bg-opacity-10" />
      <div
        className="absolute h-2 rounded-l bg-gradient-to-r from-dawnPurple-500 to-dawnOrange-500"
        style={{ width: `${(100 / (max - min)) * (value - min)}%` }}
      />
      <input
        type="range"
        className={`absolute appearance-none h-2 w-full bg-transparent ${styles.inputRange}`}
        value={value}
        min={min}
        max={max}
        onChange={(event) => onChange(parseInt(event.target.value))}
      />
    </div>
  );
}
