import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./src/modules/**/*.{ts,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        palette: {
          blue: {
            900: "#00287F",
            600: "#2563EB",
          },
          green: {
            700: "#00AD26",
            500: "#1FBA66",
          },
          red: {
            500: "#F84747",
            100: "#FEEDED",
          },
          gray: {
            800: "#4B4B4B",
            700: "#626262",
            600: "#787878",
            500: "#8E8E8E",
            400: "#A5A5A5",
            300: "#BBBBBB",
            200: "#D2D2D2",
            100: "#E8E8E8",
            50: "#F4F4F4",
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
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
