import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'light-bg': '#E9F1F7',
        'light-text': '#435058',
        red: '#D44D5C',
        citron: '#F5F749',
        emerald: '#15616D',
      },
      gridTemplateColumns: {
        'items-2': '1fr max-content',
        'items-3': '1fr max-content max-content',
      },
      keyframes: {
        news: {
          '0%': { transform: 'translateY(60px)' },
          '30%': { transform: 'translateY(60px)' },
          '33%': { transform: 'translateY(20px)' },
          '63%': { transform: 'translateY(20px)' },
          '66%': { transform: 'translateY(-20px)' },
          '96%': { transform: 'translateY(-20px)' },
          '100%': { transform: 'translateY(-60px)' },
        },
      },
      animation: {
        news: '9s ease-in-out 0s infinite normal none news',
      },
    },
    screens: {
      sp: { max: '700px' },
    },
  },
  plugins: [],
};
export default config;
