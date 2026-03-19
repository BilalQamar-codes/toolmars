import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // This line is critical!
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
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
    },
  },
  plugins: [],
};
export default config;