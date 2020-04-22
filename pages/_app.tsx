import React from "react";
import { MDXProvider } from "@mdx-js/react";
import "../assets/tailwind.css";
import SiteLayout from "../components/SiteLayout";
import componentMap from "../util/componentMap";

/**
 * Next.js wrapper
 */
const App: React.FC<any> = ({ Component, pageProps }) => (
  <React.Fragment>
    <MDXProvider components={componentMap}>
      <SiteLayout>
        <Component {...pageProps} />
      </SiteLayout>
    </MDXProvider>
  </React.Fragment>
);

export default App;
