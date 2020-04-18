import CodeBlockNoSsr from "../components/CodeBlockNoSsr";

/**
 * Transform elements
 */
const componentMap = {
  pre: (props) => <div {...props} />,
  code: (props) => <CodeBlockNoSsr {...props} />,
  h1: (props) => <h1 className="text-5xl" {...props} />,
  h2: (props) => <h2 className="text-2xl" {...props} />,
};

export default componentMap;
