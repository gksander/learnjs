import * as React from "react";
import StaticCodeBlock from "./StaticCodeBlock";
import InteractiveCodeBlockNoSSR from "./InteractiveCodeBlockNoSSR";

/**
 * Code block
 */
const CodeBlock: React.FC<{ height?: number; live?: boolean }> = ({
  children,
  height = 140,
  live = false,
}) => {
  const code = String(children).replace(/\n$/, "");

  // Live editors
  if (live) {
    return <InteractiveCodeBlockNoSSR height={height} code={code} />;
  }

  return <StaticCodeBlock code={code} />;
};

export default CodeBlock;
