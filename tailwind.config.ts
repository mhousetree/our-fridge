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
        'light-bg': '#EFE9F4',
        'light-text': '#0B0014',
        red: '#D44D5C',
        citron: '#F5F749',
        emerald: '#15616D',
      },
    },
  },
  plugins: [],
};
export default config;
