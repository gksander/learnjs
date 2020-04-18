import React from "react";
import { MDXProvider } from "@mdx-js/react";
import "katex/dist/katex.min.css";
import "../assets/tailwind.css";
import SiteLayout from "../components/SiteLayout";
import CodeBlockNoSsr from "../components/CodeBlockNoSsr";

// Component map
const components = {
  pre: (props) => <div {...props} />,
  code: (props) => <CodeBlockNoSsr {...props} />,
};

/**
 * Next.js wrapper
 */
const App = ({ Component, pageProps }) => (
  <MDXProvider components={components}>
    <SiteLayout>
      <Component {...pageProps} />
    </SiteLayout>
  </MDXProvider>
);

export default App;
