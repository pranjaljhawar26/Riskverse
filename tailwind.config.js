/** @type {import('tailwindcss').Config} */
export default {
content: ["./index.html", "./src/**/*.{ts,tsx}"],
theme: {
extend: {
colors: {
navy: {
950: "#050813",
900: "#0a0f1f",
800: "#0f1729",
700: "#152036",
600: "#1c2b47",
500: "#263a5e",
},

gold: {
50: "#fbf6e9",
100: "#f4e6bf",
200: "#ecd28a",
300: "#e3bd58",
400: "#d4a537",
500: "#c08a20",
600: "#9a6b18",
},

amber: {
glow: "#ffb347",
},
},

fontFamily: {
display: ["Cinzel", "serif"],
serif: ["Cormorant Garamond", "serif"],
hand: ["Caveat", "cursive"],
pen: ["Kalam", "cursive"],
sans: ["Inter", "system-ui", "sans-serif"],
},

boxShadow: {
gold: "0 0 30px -5px rgba(212,165,55,0.5)",
"gold-lg": "0 0 60px -10px rgba(212,165,55,0.55)",
note: "4px 6px 14px rgba(0,0,0,0.45)",
vault: "inset 0 0 80px rgba(0,0,0,0.8)",
},

keyframes: {
flicker: {
"0%,100%": { opacity: "1" },
"45%": { opacity: "0.92" },
"50%": { opacity: "0.78" },
"55%": { opacity: "0.95" },
},

sway: {
"0%,100%": { transform: "rotate(-1deg)" },
"50%": { transform: "rotate(1.2deg)" },
},

pulseGlow: {
"0%,100%": {
boxShadow: "0 0 20px -5px rgba(212,165,55,0.4)",
},
"50%": {
boxShadow: "0 0 45px -5px rgba(212,165,55,0.7)",
},
},

crisisPulse: {
"0%,100%": {
boxShadow: "0 0 25px -5px rgba(220,38,38,0.35)",
},
"50%": {
boxShadow: "0 0 60px 0px rgba(220,38,38,0.75)",
},
},

rise: {
"0%": {
transform: "translateY(20px)",
opacity: "0",
},
"100%": {
transform: "translateY(0)",
opacity: "1",
},
},
},

animation: {
flicker: "flicker 6s ease-in-out infinite",
sway: "sway 5s ease-in-out infinite",
pulseGlow: "pulseGlow 4s ease-in-out infinite",
crisisPulse: "crisisPulse 2.2s ease-in-out infinite",
rise: "rise 0.6s ease-out both",
},
},
},

plugins: [],
};
