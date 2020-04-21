import * as React from "react";
import useComponentSize from "@rehooks/component-size";
import { Layer, Rect, Stage } from "react-konva";

const CodeBlockCanvas: React.FC = () => {
  // Create ref to HTML element
  const ref = React.useRef<HTMLDivElement>();
  const { width, height } = useComponentSize(ref);

  return (
    <div className="w-full h-full" ref={ref}>
      <Stage width={width} height={height} className="bg-blue-200">
        <Layer>
          <Rect
            x={20}
            y={50}
            width={100}
            height={100}
            fill="red"
            shadowBlur={10}
          />
        </Layer>
      </Stage>
    </div>
  );
};

export default CodeBlockCanvas;
