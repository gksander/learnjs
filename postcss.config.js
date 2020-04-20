const purgecss = [
  "@fullhuman/postcss-purgecss",
  {
    content: [
      "./components/**/*.js",
      "./pages/**/*.js",
      "./util/componentMap.js",
    ],
    defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
    // Need to whitelist katex and codemirror stuff
    whitelistPatterns: [/cm-s-material-palenight/i, /cm-/i],
    whitelistPatternsChildren: [/katex/i, /codemirror/i],
  },
];

module.exports = {
  plugins: [
    "postcss-import",
    "tailwindcss",
    "autoprefixer",
    ...(process.env.NODE_ENV === "production" ? [purgecss] : []),
  ],
};
