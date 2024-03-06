import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
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
    },
  },
  plugins: [],
};
export default config;
