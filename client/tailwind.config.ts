import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./utils/**/*.{js,ts,jsx,tsx,mdx}", // Added this for your slugify.ts and other helpers
  ],
  theme: {
    extend: {
      // I've kept your brand variables so you don't lose your themeing!
      colors: {
        brand: {
          bg: "var(--background)",
          card: "var(--card)",
          border: "var(--card-border)",
          main: "var(--text-main)",
          muted: "var(--text-muted)",
          primary: "var(--primary)",
          hover: "var(--primary-hover)",
        },
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
      },
    },
  },
  plugins: [],
};
export default config;