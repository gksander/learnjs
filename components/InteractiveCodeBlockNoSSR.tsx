import * as React from "react";
import dynamic from "next/dynamic";
const InteractiveCodeBlockNoSSR = dynamic(
  () => import("./InteractiveCodeBlock"),
  { ssr: false },
);

export default InteractiveCodeBlockNoSSR;
