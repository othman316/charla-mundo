import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'customGreen': '#BCECE0',
        'darkTeal': '#36EEE0',
        'plum': '#F652A0',
        'blueGray': '#4C5270',
      }
    },
  },
  plugins: [],
} satisfies Config;
