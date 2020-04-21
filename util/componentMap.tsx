import AppImage from "../components/AppImage";
import * as React from "react";
import CodeBlock from "../components/CodeBlock";

/**
 * Transform elements
 */
const componentMap: { [key: string]: React.FC } = {
  pre: (props) => <div {...props} />,
  code: (props) => <CodeBlock {...props} />,
  h1: (props) => <h1 className="text-5xl border-b mb-3" {...props} />,
  h2: (props) => <h2 className="text-2xl mb-2" {...props} />,
  p: (props) => <p className="mb-3" {...props} />,
  inlineCode: (props) => (
    <code
      className="text-red-700 px-1 bg-gray-200 rounded text-sm"
      {...props}
    />
  ),
  img: AppImage,
};

export default componentMap;
