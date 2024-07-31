import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/styles/**/*.scss",
  ],
  theme: {
    colors: {
      grayscale: {
        "pure-white": "#FFFFFF",
        white: "#EFEFEF",
        gray: "#BABABA",
        deep: "#636363",
        dark: "#1E1E1E",
        "pure-black": "#000000",
      },
      red: {
        primary: "#FF0066",
        dark: "#CC004D",
        light: "#FF4C7F",
      },
      blue: {
        primary: "#0033FF",
        dark: "#001ACC",
        light: "#0066FF",
      },
      yellow: {
        primary: "#FFFF00",
        dark: "#DEE132",
        light: "#FFFF85",
      },
      green: {
        primary: "#33FF99",
        dark: "#2ED87B",
        light: "#B5FEBD",
      },
      transparent: "rgba(0,0,0,0)",
    },
    fontSize: {
      "10px": [
        ".625rem",
        {
          letterSpacing: "-0.2px",
          fontWeight: "500",
        },
      ],
      "12px": [
        ".75rem",
        {
          letterSpacing: "-0.24px",
          fontWeight: "500",
        },
      ],
      "14px": [
        ".875rem",
        {
          letterSpacing: "-0.28px",
          fontWeight: "500",
        },
      ],
      "16px": [
        "1rem",
        {
          letterSpacing: "-0.32px",
          fontWeight: "500",
        },
      ],
      "18px": [
        "1.125rem",
        {
          letterSpacing: "-0.36px",
          fontWeight: "500",
        },
      ],
      "21px": [
        "1.3125rem",
        {
          letterSpacing: "-0.42px",
          fontWeight: "500",
        },
      ],
      "24px": [
        "1.5rem",
        {
          letterSpacing: "-0.48px",
          fontWeight: "500",
        },
      ],
      "30px": [
        "1.875rem",
        {
          letterSpacing: "-0.6px",
          fontWeight: "500",
        },
      ],
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
export default config;
