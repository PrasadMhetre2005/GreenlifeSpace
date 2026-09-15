import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        moss: {
          DEFAULT: "#2C4A3B",
          dark: "#1B3128",
          light: "#3E6350",
        },
        ink: "#182219",
        greige: "#E8E4D6",
        greigedark: "#DAD5C3",
        sage: "#D6DEC9",
        sagedeep: "#B9C5A6",
        ochre: {
          DEFAULT: "#B08A3E",
          light: "#D2AE63",
        },
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-work-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        prose: "68ch",
      },
      borderRadius: {
        organic: "63% 37% 41% 59% / 47% 45% 55% 53%",
      },
    },
  },
  plugins: [],
};
export default config;
