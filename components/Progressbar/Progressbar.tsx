import styles from './Progressbar.module.css';

export const Progressbar = ({ progress = 1 }) => {
  return (
    <div className="relative z-10 w-full h-2 bg-white rounded-full bg-opacity-10">
      <div
        className={`absolute top-0 left-0 h-full bg-gradient-to-bl from-dawnOrange-500 to-dawnPurple-500 rounded-full ${styles.animated}`}
        style={{
          width: `${progress}%`,
        }}
        data-testid="progressbar"
      ></div>
    </div>
  );
};
