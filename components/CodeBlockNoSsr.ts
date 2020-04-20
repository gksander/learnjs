import * as React from "react";
import dynamic from "next/dynamic";
const CodeBlockNoSsr = dynamic(() => import("./CodeBlock"), { ssr: false });

export default CodeBlockNoSsr;
