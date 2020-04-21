const optimizedImages = require("next-optimized-images");
const remarkImages = require("remark-images");
const withFonts = require("next-fonts");
const path = require("path");

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkImages],
  },
});

module.exports = withFonts(
  optimizedImages(
    withMDX({
      pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
      webpack: (config) => {
        config.resolve.alias["~"] = path.resolve(__dirname);
        return config;
      },
    }),
  ),
);
