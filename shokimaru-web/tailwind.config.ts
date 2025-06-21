import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0EA5E9", // Sky Blue - 爽やかな海
        secondary: "#06B6D4", // Cyan - アクセント
        background: "#F0F9FF", // Sky 50 - 薄い青
        foreground: "#0C4A6E", // Sky 900 - 濃い青
      },
      fontFamily: {
        sans: ["Noto Sans JP", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;