import * as React from "react";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/edit/closebrackets";
import { Controlled as CodeMirror } from "react-codemirror2";

import { injectableKeys, injectables } from "../util/injectables";
import Button from "./Button";

const CodeBlock: React.FC<{ height?: number }> = ({
  children,
  height = 140,
}) => {
  // Local state
  const [value, setValue] = React.useState(String(children));
  const output = [];

  // Run code!
  const runCode = () => {
    // Reset stuff

    // Utility function to print stuff
    const print = (lineNum, value) => null;
    // this.setState((oldState) => ({
    //   ...oldState,
    //   output: oldState.output.concat({ lineNum, value }),
    // }));

    try {
      // Transform print(x) into print(n, x)
      const evalString = value
        .split("\n")
        .map((line, i) => line.replace(/print\(/g, `print(${i + 1}, `))
        .join("\n");

      // TODO: Babel this?

      // Build function
      const evaluator = new Function(
        `"use strict";return ({print, ${injectableKeys.join(
          ",",
        )}} = {}) => {${evalString}}`,
      )();

      evaluator({ print, ...injectables });
    } catch (error) {
      console.log(error);
    }
  };

  // Reset code
  const resetCode = () => {
    setValue(String(children));
    runCode();
  };

  return (
    <div className="mb-4 border-l-4 pl-3">
      <div className="flex flex-wrap -mx-1">
        <div className="w-full md:w-1/2 p-1 pt-0">
          <div
            className="border rounded bg-white shadow overflow-hidden"
            style={{ height }}
          >
            <CodeMirror
              value={value}
              onBeforeChange={(editor, data, value) => setValue(value)}
              options={{
                lineNumbers: true,
                autoCloseBrackets: true,
                tabSize: 2,
                theme: "material-palenight",
                extraKeys: {
                  "Cmd-Enter": runCode,
                },
              }}
              className="h-full w-full"
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 p-1 md:pt-0">
          <div
            style={{ paddingTop: "100%" }}
            className="border shadow rounded relative"
          >
            <div className="absolute inset-0">
              <h2>This is some text</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-2">
        <Button title="Run Code" onClick={runCode} className="mr-2" />
        <Button title="Reset Code" onClick={resetCode} />
      </div>
    </div>
  );
};

export default CodeBlock;
