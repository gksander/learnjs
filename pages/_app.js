import React from "react";
import { MDXProvider } from "@mdx-js/react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material-palenight.css";
import "katex/dist/katex.min.css";
import "../assets/tailwind.css";
import SiteLayout from "../components/SiteLayout";
import componentMap from "../util/componentMap";
import Head from "next/head";

/**
 * Next.js wrapper
 */
const App = ({ Component, pageProps }) => (
  <>
    {/*<Head>*/}
    {/*  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.css"*/}
    {/*        integrity="sha384-zB1R0rpPzHqg7Kpt0Aljp8JPLqbXI3bhnPWROx27a9N0Ll6ZP/+DiW/UqRcLbRjq" crossOrigin="anonymous" />*/}
    {/*</Head>*/}
    <MDXProvider components={componentMap}>
      <SiteLayout>
        <Component {...pageProps} />
      </SiteLayout>
    </MDXProvider>
  </>
);

export default App;
