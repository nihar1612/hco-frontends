import { theme } from 'utils/tailwindConfig';
const tailwindColors = theme?.colors;

interface GradientProps {
  color: 'purple' | 'orange';
  scale?: number;
  opacity?: number;
  right?: number | string;
  left?: number | string;
  top?: number | string;
  fixed?: boolean;
}

const availableColors = { purple: tailwindColors['dawnPurple']['500'], orange: tailwindColors['dawnOrange']['500'] };

export function Gradient({
  color,
  scale = 1,
  opacity = 0.15,
  right = undefined,
  left = undefined,
  top = 0,
  fixed = false,
}: GradientProps) {
  let width = 200;
  let height = 100;
  const selectedColor = availableColors[color];
  width = width * scale;
  height = height * scale;
  return (
    <svg
      style={{ right, left, top }}
      className={`${fixed ? 'fixed' : 'absolute'}  z-0 overflow-hidden`}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
    >
      <g opacity={opacity} filter="url(#filter)">
        <ellipse cx="50%" cy="50%" rx="20%" ry="20%" fill={selectedColor} />
      </g>
      <defs>
        <filter
          id="filter"
          x="0"
          y="0"
          width={width}
          height={height}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation={Math.round(width * 0.07)} result="effect1_foregroundBlur" />
        </filter>
      </defs>
    </svg>
  );
}
