const withPlugins = require("next-compose-plugins");
const optimizedImages = require("next-optimized-images");
const remarkMath = require("remark-math");
const rehypeKatex = require("rehype-katex");
const remarkImages = require("remark-images");
const path = require("path");

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkMath, remarkImages],
    rehypePlugins: [rehypeKatex],
  },
});

module.exports = optimizedImages(
  withMDX({
    pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
    webpack: (config) => {
      config.resolve.alias["~"] = path.resolve(__dirname);
      return config;
    },
  }),
);
