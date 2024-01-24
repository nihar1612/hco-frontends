const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './modules/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  mode: 'jit',
  darkMode: false, // or 'media' or 'class'
  theme: {
    linearBorderGradients: (theme) => ({
      colors: {
        'orange-purple': [theme('colors.dawnOrange.500'), theme('colors.dawnPurple.500')],
        ...theme('colors'),
      },
      background: {
        white: theme('colors.white'),
        ...theme('colors'),
      },
    }),
    colors: {
      dawnDark: {
        100: '#EFF2F6',
        150: '#E5E5E5',
        200: '#BBBDC5',
        300: '#858992',
        400: '#4F555F',
        500: '#19212C',
        550: '#232832',
        600: '#151B25',
        700: '#11161E',
        800: '#0D1117',
        900: '#090C10',
      },
      dawnOrange: {
        100: '#FFEEE5',
        200: '#FFD7C4',
        300: '#FFBFA1',
        400: '#FFA77E',
        500: '#FF8F5B',
        600: '#C56E45',
        700: '#8C4C2E',
        800: '#532A17',
        900: '#1A0800',
      },
      dawnPurple: {
        100: '#E9EDFB',
        200: '#C5CDF4',
        300: '#9FADEE',
        400: '#798DE8',
        500: '#536DE2',
        600: '#4055AF',
        700: '#2C3B7C',
        800: '#182149',
        900: '#040716',
      },
      dawnRed: {
        500: '#E24328',
      },
      dawnGreen: {
        500: '#E24328',
      },
      white: '#fff',
      black: '#000',
      transparent: 'transparent',
    },
    extend: {
      spacing: {
        1.5: '0.375rem',
        13: '3.25rem',
        18: '4.5rem',
        22: '5.5rem',
        26: '6.5rem',
        30: '7.5rem',
        34: '8.5rem',
        38: '9.5rem',
        62: '15.5rem',
        100: '25rem',
        108: '27rem',
        500: '31.25rem',
      },
      maxWidth: {
        '1.5xl': '38rem',
        '3.5xl': '52rem',
        '8xl': '88rem',
        '9xl': '96rem',
      },
      fontFamily: {
        sans: ['Epilogue', ...defaultTheme.fontFamily.sans],
        inter: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        '2.5xl': '1.75rem',
        '3.5xl': '2rem',
        '5.5xl': '3.5rem',
        '6.25xl': '4rem',
      },
      lineHeight: {
        12: '3rem',
        14: '3.5rem',
        18: '4.5rem',
      },
      zIndex: {
        '-10': '-10',
        '-05': '-05',
      },
      borderWidth: {
        1.5: '1.5px',
      },
      borderRadius: {
        dawnDefault: '2.5rem',
      },
      inset: {
        '60%': '60%',
      },
      backdropBlur: {
        '1.5xl': '2.25rem',
      },
      opacity: {
        6: '0.06',
      },
      maxHeight: {
        1000: '100rem', // when you need really big max height
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            a: {
              'word-break': 'break-word',
              'overflow-wrap': 'break-word',
              fontWeight: 'normal',
              'text-decoration': 'none',
              color: theme('colors.dawnPurple.500'),
              '&:hover': {
                color: theme('colors.dawnPurple.600'),
              },
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
    require('tailwindcss-border-gradient-radius'),
  ],
};
