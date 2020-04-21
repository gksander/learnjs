const purgecss = [
  "@fullhuman/postcss-purgecss",
  {
    content: [
      "./components/**/*.tsx",
      "./pages/**/*.tsx",
      "./util/componentMap.tsx",
    ],
    defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
    // Need to whitelist katex and codemirror stuff
    whitelistPatterns: [/cm-s-material-palenight/i, /cm-/i],
    whitelistPatternsChildren: [/codemirror/i],
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
