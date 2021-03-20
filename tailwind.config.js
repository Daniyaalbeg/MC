module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: (theme) => ({}),
      colors: {
        bgColorTransparent: "#222a2ec4",
        bgColor: "#2b353a",
        bgDarkColor: "#232b30",
        bgLightColor: "#38454b",
        bgLightDarkColor: "#313d42",
        bgLighterColor: "#767e81",
        bgLighterDarkColor: "#8e9ba1",
        yellowColor: "#FFD71A",
        lightYellowColor: "#ffde3b",
        darkYellowColor: "#e6c213",
        blueColor: "#1589C9",
        darkBlueColor: "#157cb4",
        lightBlueColor: "#1592d4",
        redColor: "#EF2A30",
        lightRedColor: "#db585c",
        orangeColor: "#F47E2E",
        greyColor: "#4C5962",
        darkGreyColor: "#434f57",
        lightGreyColor: "#5c6a74",
        greenColor: "#4BB250",
        lightGreenColor: "rgba(82, 197, 88, 0.514)",
        darkGreenColor: "#329137",
        textDark: "#0f0f0f",
        textMid: "#696969",
        textLight: "whitesmoke",
        lightBorderColor: "rgb(228, 228, 228)",
      },
    },
  },
  variants: {
    extend: {
      translate: ["group-hover"],
      scale: ["group-hover"],
    },
  },
  plugins: [],
};
