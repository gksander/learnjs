const optimizedImages = require("next-optimized-images");
const remarkImages = require("remark-images");
const remarkEmojis = require("remark-emoji");
const withVideos = require("next-videos");
const path = require("path");

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkImages, remarkEmojis],
  },
});

module.exports = withVideos(
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
