import React, { useRef } from 'react';
// import * as PIXI from "pixi.js";
import { fabric } from 'fabric';

export const MainCanvas: React.FC = () => {
  const pixiCanvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const svgData = reader.result as string;
      renderSVG(svgData);
    };
    reader.readAsText(file);
  };

  const renderSVG = (svgData: string) => {
    const fabricCanvas = new fabric.Canvas(fabricCanvasRef.current!, {
      width: 500,
      height: 500,
    });

    fabric.loadSVGFromString(svgData, (objects) => {
      const image = fabric.util.groupSVGElements(objects);
      fabricCanvas.add(image);
      fabricCanvas.centerObject(image);
      fabricCanvas.renderAll();
    });
  };

  return (
    <div>
      <label>FOR SVG:</label>
      <input type="file" accept=".svg" onChange={handleFileUpload} />
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ margin: 10 }}>
          <p>This is a pixi canvas</p>
          <div>
            <canvas ref={pixiCanvasRef} width={500} height={500} />
          </div>
        </div>
        <div style={{ margin: 10 }}>
          <p>This is a fabric canvas</p>
          <div>
            <canvas ref={fabricCanvasRef} width={500} height={500} />
          </div>
        </div>
      </div>
    </div>
  );
};
