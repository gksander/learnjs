module.exports = {
  theme: {
    extend: {
      transitionProperty: {
        height: "height",
      },
      height: {
        halfscreen: "50vh",
      },
    },
  },
  variants: {
    transitionProperty: ["responsive"],
    margin: ["responsive", "last"],
  },
  plugins: [],
};
