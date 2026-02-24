import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        cream: "#f8f6f2",
        charcoal: "#1f2321",
        gold: "#b89b5e",
        muted: "#707070"
      },
      boxShadow: {
        luxury: "0 14px 45px rgba(10, 10, 10, 0.08)",
        soft: "0 8px 30px rgba(31, 35, 33, 0.07)"
      },
      backgroundImage: {
        "hero-glow": "radial-gradient(circle at 20% 20%, rgba(184, 155, 94, 0.18), transparent 45%), radial-gradient(circle at 80% 30%, rgba(255, 255, 255, 0.2), transparent 45%)"
      }
    }
  },
  plugins: []
};

export default config;
