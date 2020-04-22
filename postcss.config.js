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
    whitelistPatterns: [/video-react/],
    whitelistPatternsChildren: [/video-react/],
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
