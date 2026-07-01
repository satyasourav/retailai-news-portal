/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        accenture: {
          50:  "#f5e6ff",
          100: "#e8bfff",
          200: "#d580ff",
          300: "#c240ff",
          400: "#b000ff",
          500: "#a100ff", // Accenture primary
          600: "#8100cc",
          700: "#610099",
          800: "#460073", // Accenture dark
          900: "#2a0047",
        },
      },
      boxShadow: {
        card: "0 2px 8px 0 rgba(161,0,255,0.08), 0 1px 3px 0 rgba(0,0,0,0.06)",
        "card-hover": "0 8px 28px 0 rgba(161,0,255,0.18), 0 4px 10px 0 rgba(0,0,0,0.08)",
        "card-glow": "0 0 0 2px rgba(161,0,255,0.25)",
      },
      backgroundImage: {
        "accenture-gradient": "linear-gradient(135deg, #2a0047 0%, #610099 50%, #a100ff 100%)",
        "card-shimmer": "linear-gradient(135deg, #ffffff 0%, #f9f0ff 100%)",
      },
    },
  },
  plugins: [],
};
