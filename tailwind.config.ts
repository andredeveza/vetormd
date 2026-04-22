import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef6ff",
          100: "#d9eaff",
          500: "#2f6fed",
          700: "#214fb4"
        }
      },
      boxShadow: {
        card: "0 4px 24px rgba(0,0,0,0.08)"
      }
    }
  },
  plugins: []
};

export default config;
