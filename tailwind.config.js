export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ethica: {
          dark: "#10241B",
          accent: "#82BF98",
          soft: "#C8E3D2",
          warm: "#F4F0E9",
        },
      },
      fontFamily: {
        heading: ['"TWK Lausanne"', "ui-sans-serif", "system-ui"],
        body: ["Geist", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};
