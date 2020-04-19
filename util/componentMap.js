import CodeBlockNoSsr from "../components/CodeBlockNoSsr";

/**
 * Transform elements
 */
const componentMap = {
  pre: (props) => <div {...props} />,
  code: (props) => <CodeBlockNoSsr {...props} />,
  h1: (props) => <h1 className="text-5xl border-b mb-3" {...props} />,
  h2: (props) => <h2 className="text-2xl mb-2" {...props} />,
  p: (props) => <p className="mb-2" {...props} />,
  inlineCode: (props) => (
    <code className="text-red-700 p-1 bg-gray-200 rounded text-sm" {...props} />
  ),
};

export default componentMap;
