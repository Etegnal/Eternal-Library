/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cozy: {
          bg: "#FAF6EE",           // Light creamy parchment background
          card: "#FFFDF9",          // Soft white/parchment card bg
          parchment: "#FEF3C7",     // Rich parchment glow
          "parchment-border": "#E5D5B7",
          amber: "#D97706",         // Lo-fi fireplace flame amber
          "amber-dark": "#B45309",   // Fire flame deep amber
          ember: "#F59E0B",         // Bright glowing ember
          flame: "#EF4444",         // Cozy red warmth
          coffee: "#362215",        // Dark coffee primary text
          "coffee-light": "#784E2D",// Muted wood typography
          wood: "#2A180E",          // Dark wood frame / hero dark bg
          "wood-deep": "#190D07",   // Deep night room tone
          "wood-light": "#4A2E1B",  // Warm bookshelf wood
        },
      },
      fontFamily: {
        serif: ["Merriweather", "Georgia", "Cambria", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
        handwriting: ["Caveat", "Dancing Script", "cursive"],
      },
      boxShadow: {
        cozy: "0 10px 30px -10px rgba(180, 83, 9, 0.15)",
        fire: "0 0 40px 10px rgba(217, 119, 6, 0.25)",
        parchment: "0 4px 20px rgba(42, 24, 14, 0.08)",
      },
      animation: {
        flame: "flamePulse 2s ease-in-out infinite alternate",
        footSwing: "footSwing 2.5s ease-in-out infinite alternate",
        candleFlicker: "candleFlicker 1.8s ease-in-out infinite alternate",
        emberFloat: "emberFloat 4s linear infinite",
        glowPulse: "glowPulse 3s ease-in-out infinite alternate",
      },
      keyframes: {
        flamePulse: {
          "0%": { transform: "scaleY(1) scaleX(1) rotate(-1deg)", opacity: "0.95" },
          "50%": { transform: "scaleY(1.08) scaleX(0.96) rotate(1deg)", opacity: "1" },
          "100%": { transform: "scaleY(0.95) scaleX(1.04) rotate(-0.5deg)", opacity: "0.9" },
        },
        footSwing: {
          "0%": { transform: "rotate(0deg)" },
          "50%": { transform: "rotate(6deg)" },
          "100%": { transform: "rotate(-3deg)" },
        },
        candleFlicker: {
          "0%": { opacity: "0.85", transform: "scale(0.98)" },
          "25%": { opacity: "1", transform: "scale(1.04) skewX(1deg)" },
          "60%": { opacity: "0.75", transform: "scale(0.95) skewX(-1deg)" },
          "100%": { opacity: "0.95", transform: "scale(1.02)" },
        },
        emberFloat: {
          "0%": { transform: "translateY(0) translateX(0)", opacity: "0.9" },
          "50%": { transform: "translateY(-40px) translateX(10px)", opacity: "0.6" },
          "100%": { transform: "translateY(-90px) translateX(-15px)", opacity: "0" },
        },
        glowPulse: {
          "0%": { opacity: "0.3" },
          "100%": { opacity: "0.6" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
