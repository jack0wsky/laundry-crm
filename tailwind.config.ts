import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/modules/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        palette: {
          gray: {
            800: "#4B4B4B",
            700: "#626262",
            600: "#787878",
            500: "#8E8E8E",
            400: "#A5A5A5",
            300: "#BBBBBB",
            200: "#D2D2D2",
            100: "#E8E8E8",
          },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      minWidth: {
        20: "80px",
      },
    },
  },
  plugins: [],
};
export default config;
