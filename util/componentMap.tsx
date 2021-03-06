import AppImage from "../components/AppImage";
import * as React from "react";
import CodeBlock from "../components/CodeBlock";
import BlockQuote from "../components/BlockQuote";

/**
 * Transform elements
 */
const componentMap: { [key: string]: React.FC } = {
  pre: (props) => <div {...props} />,
  code: (props) => <CodeBlock {...props} />,
  h1: (props) => <h1 className="text-5xl border-b mb-5" {...props} />,
  h2: (props) => <h2 className="text-2xl mb-3" {...props} />,
  p: (props) => <p className="mb-5 last:mb-0" {...props} />,
  inlineCode: (props) => (
    <code
      className="text-red-700 px-1 bg-gray-200 rounded text-sm"
      {...props}
    />
  ),
  img: AppImage,
  blockquote: (props) => <BlockQuote {...props} />,
  ul: (props) => <ul className="list-disc ml-6 mb-5" {...props} />,
  li: (props) => <li className="mb-2 last:mb-0 pl-1" {...props} />,
  ol: (props) => <ol className="list-decimal ml-6 mb-5" {...props} />,
};

export default componentMap;
