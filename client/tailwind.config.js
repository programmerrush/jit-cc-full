/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      colors: { glass: "rgba(255,255,255,0.08)" },
      boxShadow: {
        glow: "0 0 0 2px rgba(99,102,241,0.35), 0 0 24px rgba(99,102,241,0.35)",
      },
      animation: {
        "slow-pulse": "slowPulse 3s ease-in-out infinite",
        "bg-pan": "bgPan 25s linear infinite",
      },
      keyframes: {
        slowPulse: {
          "0%,100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.02)" },
        },
        bgPan: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
    },
  },
  plugins: [],
};
