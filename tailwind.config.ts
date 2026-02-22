import type { Config } from "tailwindcss";

export default {
  darkMode: "selector",
  important: true,
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      // Desktop-first breakpoints
      xxl: { max: "1440px" },
      xl: { max: "1279px" },
      lg: { max: "1023px" },
      mdp: { max: "899px" },
      md: { max: "767px" },
      sm: { max: "639px" },
      xs : { max: "479px" },
      xxs : { max: "379px" },
    },
    colors: {
      "neutral-950": "#0E121B",
      "neutral-900": "#191B25",
      "neutral-800": "#232530",
      "neutral-700": "#2B303B",
      "neutral-600": "#525866",
      "neutral-500": "#717784",
      "neutral-400": "#232530",
      "neutral-300": "#CACFD8",
      "neutral-200": "#E0E4EA",
      "neutral-100": "#F3F5F8",
      "neutral-50": "#F5F7FA",
      "blue-700": "#2547D0",
      "blue-500": "#335CFF",
      "blue-50": "#EBF1FF",
      "green-500": "#21C16B",
      "green-100": "#191B25",
      "red-500": "#FB3748",
      "red-100": "#FFD5D8",
    },
    fontFamily: {
      sans: ["Inter", "sans-serif"],
      mono: ["Noto Serif", "serif"],
    },
    extend: {},
  },
  plugins: [],
} satisfies Config;
