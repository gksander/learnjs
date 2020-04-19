import React from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-tomorrow";
import { injectableKeys, injectables } from "../util/injectables";
import Button from "./Button";

export default class CodeBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      val: props.children,
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
    this.setState({ val: this.props.children });
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
      const evalString = this.state.val
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
          <div className="w-full md:w-1/2 p-1">
            <div
              className="border rounded bg-white shadow overflow-hidden"
              style={{ height }}
            >
              <AceEditor
                mode="javascript"
                theme="tomorrow"
                value={val}
                height="100%"
                width="100%"
                onChange={(val) => this.setState({ val })}
                tabSize={2}
                commands={[
                  {
                    name: "run",
                    bindKey: { win: "Ctrl-Enter", mac: "Command-Enter" },
                    exec: this.runCode.bind(this),
                  },
                ]}
                fontSize={15}
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 p-1">
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
