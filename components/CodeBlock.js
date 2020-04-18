import React from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-tomorrow";
import { injectableKeys, injectables } from "../util/injectables";

export default class CodeBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      val: props.children,
      output: [],
      codeError: null,
    };
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
      console.log(error);
    }
  }

  render() {
    return (
      <div>
        <div>
          <button onClick={this.runCode.bind(this)}>Run Code</button>
          <button onClick={this.resetCode.bind(this)}>Reset Code</button>
        </div>
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2">
            <AceEditor
              mode="javascript"
              theme="tomorrow"
              value={this.state.val}
              height={String(this.props.height || 140) + "px"}
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
            />
          </div>
          <div className="w-full md:w-1/2">
            <h2>Output</h2>
            {this.state.output.map((bit, i) => (
              <div key={i}>
                <span>{bit.lineNum}: </span>
                <span>{String(bit.value)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
