import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        joynity: {
          50: "#f2fbf8",
          100: "#d9f3ec",
          200: "#bfe9dd",
          300: "#9fd8c8",
          500: "#7ABCA6",
          700: "#317f70",
          900: "#17453e"
        }
      },
      boxShadow: {
        soft: "0 18px 60px rgba(23, 69, 62, 0.10)"
      }
    }
  },
  plugins: []
};

export default config;
