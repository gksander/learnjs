import React from "react";
import { MDXProvider } from "@mdx-js/react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material-palenight.css";
import "../assets/tailwind.css";
import SiteLayout from "../components/SiteLayout";
import componentMap from "../util/componentMap";

/**
 * Next.js wrapper
 */
const App: React.FC<any> = ({ Component, pageProps }) => (
  <MDXProvider components={componentMap}>
    <SiteLayout>
      <Component {...pageProps} />
    </SiteLayout>
  </MDXProvider>
);

export default App;
