import * as React from "react";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/edit/closebrackets";
import { Controlled as CodeMirror } from "react-codemirror2";
import { injectableKeys, injectables } from "../util/injectables";
import Button from "./Button";
import { Layer, Rect, Stage, Text } from "react-konva";
import useComponentSize from "@rehooks/component-size";
import { RectClass, TextClass } from "../util/StageItems";

const CodeBlock: React.FC = ({ children }) => {
  // Local state
  const [value, setValue] = React.useState(String(children));
  const [stageItems, setStageItems] = React.useState<
    Array<TextClass | RectClass>
  >([]);
  const [hasRunCode, setHasRunCode] = React.useState(false);

  // Ref to Canvas
  const canvasContainerRef = React.useRef<HTMLDivElement>(null);
  const { width: totalWidth, height: totalHeight } = useComponentSize(
    canvasContainerRef,
  );

  // Reset stage
  const resetStage = () => {
    setStageItems([]);
  };

  // Rect helper
  const rect = (...params: ConstructorParameters<typeof RectClass>) =>
    setStageItems((items) => items.concat(new RectClass(...params)));

  // Text helper
  const text = (...params: ConstructorParameters<typeof TextClass>) => {
    const newTextItem = new TextClass(...params);
    setStageItems((items) => items.concat(newTextItem));
    return newTextItem;
  };

  /**
   * Run code!
   */
  const runCode = () => {
    // Reset stuff
    resetStage();
    setHasRunCode(true);

    try {
      // Build function
      const evaluator = new Function(
        `"use strict";return ({rect, totalWidth, totalHeight, text } = {}) => {${value}}`,
      )();

      evaluator({ rect, totalWidth, totalHeight, text });
    } catch (error) {
      console.log(error);
    }
  };

  // Reset code
  const resetCode = () => {
    setValue(String(children));
    runCode();
  };

  // On mount, run code
  React.useEffect(() => {
    if (totalWidth > 0 && !hasRunCode) runCode();
  }, [hasRunCode, totalWidth]);

  return (
    <div className="mb-4 border-l-4 pl-3">
      <div className="flex flex-wrap -mx-1">
        <div className="w-full md:w-1/2 p-1 pt-0">
          <div className="relative w-full" style={{ paddingTop: "100%" }}>
            <div className="absolute inset-0 shadow rounded border overflow-hidden">
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
        </div>
        <div className="w-full md:w-1/2 p-1 md:pt-0">
          <div
            style={{ paddingTop: "100%" }}
            className="border shadow rounded relative overflow-hidden"
            ref={canvasContainerRef}
          >
            <div className="absolute inset-0">
              <div className="w-full h-full">
                {/* Here's the actual stage */}
                <Stage width={totalWidth} height={totalHeight}>
                  <Layer>
                    {stageItems.map((item, i) => {
                      // Text
                      if (item instanceof TextClass) {
                        return (
                          <Text
                            key={item.id}
                            text={item.text}
                            x={item.x}
                            y={item.y}
                            fontSize={18}
                            {...item.options}
                          />
                        );
                      }

                      // Rectangle
                      if (item instanceof RectClass) {
                        return (
                          <Rect
                            key={item.id}
                            width={item.width}
                            height={item.height}
                            x={item.x}
                            y={item.y}
                            fill="red"
                            {...item.options}
                          />
                        );
                      }

                      return null;
                    })}
                  </Layer>
                </Stage>
              </div>
            </div>
            {/* Dimension display */}
            <div className="absolute bottom-0 right-0 px-2 py-1 bg-white rounded-tl border-l border-t">
              {totalWidth}px x {totalHeight}px
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
