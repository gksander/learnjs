import * as React from "react";
import { Resizable } from "re-resizable";
import Button from "./Button";
import { Layer, Rect, Stage, Text } from "react-konva";
import { RectClass, TextClass } from "../util/StageItems";
import { FaPlay, FaUndoAlt } from "react-icons/fa";
import CodeEditor from "./CodeEditor";

/**
 * Code block
 */
const InteractiveCodeBlock: React.FC<{ height?: number; code: string }> = ({
  code,
  height = 140,
}) => {
  // Local state
  const [value, setValue] = React.useState(code);
  const [stageItems, setStageItems] = React.useState<
    Array<TextClass | RectClass>
  >([]);
  const [$stageWidth, setStageWidth] = React.useState(200);
  const [$stageHeight, setStageHeight] = React.useState(200);

  // Reset stage
  const resetStage = () => {
    setStageItems([]);
  };

  // Rect helper
  const $rect = (...params: ConstructorParameters<typeof RectClass>) =>
    setStageItems((items) => items.concat(new RectClass(...params)));

  // Text helper
  const $text = (...params: ConstructorParameters<typeof TextClass>) => {
    const newTextItem = new TextClass(...params);
    setStageItems((items) => items.concat(newTextItem));
    return newTextItem;
  };

  /**
   * Run code!
   */
  const runCode = React.useCallback(() => {
    // Reset stuff
    resetStage();

    try {
      // Things to inject into func
      const injectables = {
        $text,
        $rect,
        $stageWidth,
        $stageHeight,
        // Disable some shit
        print: undefined,
        console: undefined,
        document: undefined,
      };
      const injectableKeys = Object.keys(injectables);

      // Build function
      const evaluator = new Function(
        `"use strict";return ({${injectableKeys.join(
          ",",
        )}} = {}) => {${value}}`,
      )();

      evaluator(injectables);
    } catch (error) {
      console.log(error);
    }
  }, [$text, $rect, $stageWidth, $stageHeight]);

  // Reset code
  const resetCode = () => {
    setValue(code);
    runCode();
  };

  React.useEffect(runCode, [$stageWidth, $stageHeight]);

  return (
    <div className="mb-4">
      <div className="border rounded overflow-hidden shadow bg-white">
        <CodeEditor code={value} onCodeChange={setValue} />
        <div className="py-3 flex justify-center relative">
          {/* Control buttons */}
          <div className="absolute left-0 top-0 z-10 px-2 py-1 flex">
            <Button onClick={runCode} className="mr-2">
              <FaPlay />
            </Button>
            <Button onClick={resetCode}>
              <FaUndoAlt />
            </Button>
          </div>
          <Resizable
            size={{ width: $stageWidth, height: $stageHeight }}
            onResizeStop={(e, dir, ref, d) => {
              setStageWidth((oldW) => oldW + d.width);
              setStageHeight((oldH) => oldH + d.height);
            }}
            minWidth={200}
            minHeight={200}
            className="border shadow-md relative"
          >
            {/* Here's the actual stage */}
            <Stage
              width={$stageWidth}
              height={$stageHeight}
              className="w-full h-full"
            >
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
            {/* Dimensions indicator */}
            <div className="absolute bottom-0 right-0 px-2 py-1 bg-white rounded-tl border-l border-t text-xs">
              {$stageWidth}px x {$stageHeight}px
            </div>
          </Resizable>
        </div>
      </div>
    </div>
  );
};

export default InteractiveCodeBlock;
