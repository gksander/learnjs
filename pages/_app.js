import React from "react";
import { MDXProvider } from "@mdx-js/react";
import "../assets/tailwind.css";
import "katex/dist/katex.min.css";
import SiteLayout from "../components/SiteLayout";
import componentMap from "../util/componentMap";

/**
 * Next.js wrapper
 */
const App = ({ Component, pageProps }) => (
  <MDXProvider components={componentMap}>
    <SiteLayout>
      <Component {...pageProps} />
    </SiteLayout>
  </MDXProvider>
);

export default App;
