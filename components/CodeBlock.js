import React from "react";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/edit/closebrackets";
import { Controlled as CodeMirror } from "react-codemirror2";

import { injectableKeys, injectables } from "../util/injectables";
import Button from "./Button";

export default class CodeBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.children,
      output: [],
      codeError: null,
    };
  }

  // On mount, run code right away
  componentDidMount() {
    this.runCode();
  }

  // Reset code to original code
  resetCode() {
    this.setState({ value: this.props.children });
  }

  // Run code
  runCode() {
    this.setState({
      codeError: null,
      output: [],
    });

    // Utility function to print stuff
    const print = (lineNum, value) =>
      this.setState((oldState) => ({
        ...oldState,
        output: oldState.output.concat({ lineNum, value }),
      }));

    try {
      // Transform print(x) into print(n, x)
      const evalString = this.state.value
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
      this.setState({ codeError: String(error) });
      console.log(error);
    }
  }

  render() {
    const height = `${this.props.height || 140}px`;
    const { output, codeError, val } = this.state;

    return (
      <div className="mb-4 border-l-4 pl-3">
        <div className="flex flex-wrap -mx-1">
          <div className="w-full md:w-1/2 p-1 pt-0">
            <div
              className="border rounded bg-white shadow overflow-hidden"
              style={{ height }}
            >
              <CodeMirror
                value={this.state.value}
                onBeforeChange={(editor, data, value) =>
                  this.setState({ value })
                }
                options={{
                  lineNumbers: true,
                  autoCloseBrackets: true,
                  tabSize: 2,
                  theme: "material-palenight",
                  extraKeys: {
                    "Cmd-Enter": this.runCode.bind(this),
                  },
                }}
                className="h-full w-full"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 p-1 md:pt-0">
            <div
              className="border rounded bg-white shadow overflow-auto h-full"
              style={{ maxHeight: height }}
            >
              {(() => {
                if (codeError) {
                  return (
                    <div className="py-1 px-2 text-red-600">{codeError}</div>
                  );
                }

                return output.map((bit, i) => (
                  <div key={i} className="flex py-1">
                    <div className="w-12 text-gray-600 text-xs flex items-center justify-center">
                      Line {bit.lineNum}:
                    </div>
                    <div>{String(bit.value)}</div>
                  </div>
                ));
              })()}
            </div>
          </div>
        </div>
        <div className="mt-2">
          <Button
            title="Run Code"
            onClick={this.runCode.bind(this)}
            className="mr-2"
          />
          <Button title="Reset Code" onClick={this.resetCode.bind(this)} />
        </div>
      </div>
    );
  }
}
