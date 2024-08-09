// src/CanvasContainer.tsx

import React, { useEffect, useRef, useState } from 'react';
import * as PIXI from 'pixi.js';
import { fabric } from 'fabric';

const CanvasContainer: React.FC = () => {
  const pixiCanvasRef = useRef<HTMLDivElement>(null);
  const fabricCanvasRef = useRef<HTMLCanvasElement>(null);
  const [pixiApp, setPixiApp] = useState<PIXI.Application | null>(null);
  const [fabricCanvas, setFabricCanvas] = useState<fabric.Canvas | null>(null);
  const [pixiText, setPixiText] = useState<PIXI.Text | null>(null);

  useEffect(() => {
    if (pixiCanvasRef.current) {
      // Initialize PixiJS Application
      const app = new PIXI.Application({
        antialias: true,
        width: 500,
        height: 500,
        backgroundColor: '#FFFFFF',
      });
      pixiCanvasRef.current.appendChild(app.view as HTMLCanvasElement);
      setPixiApp(app);

      // Initialize FabricJS Canvas
      if (fabricCanvasRef.current) {
        const fabricCanvasInstance = new fabric.Canvas(
          fabricCanvasRef.current,
          {
            width: 500,
            height: 500,
          }
        );
        setFabricCanvas(fabricCanvasInstance);
      }

      return () => {
        app.destroy(true, true);
      };
    }
  }, []);

  const addPixiText = () => {
    if (pixiApp) {
      const text = new PIXI.Text('Hello, Pixi!', {
        fontFamily: 'Arial',
        fontSize: 24,
        fill: 0xff1010, // Red color in hex
        align: 'center',
      });
      text.x = 100;
      text.y = 150;
      text.eventMode = 'static';
      text.cursor = 'pointer';
      text
        .on('pointerdown', onDragStart)
        .on('pointerup', onDragEnd)
        .on('pointerupoutside', onDragEnd)
        .on('pointermove', onDragMove);
      pixiApp.stage.addChild(text);
      setPixiText(text);
    }
  };

  const onDragStart = (event: PIXI.FederatedPointerEvent) => {
    const target = event.currentTarget as PIXI.Text & {
      dragging?: boolean;
      data?: PIXI.FederatedPointerEvent;
    };
    target.data = event;
    target.dragging = true;
  };

  const onDragEnd = (event: PIXI.FederatedPointerEvent) => {
    const target = event.currentTarget as PIXI.Text & {
      dragging?: boolean;
      data?: PIXI.FederatedPointerEvent;
    };
    target.dragging = false;
    target.data = undefined;
  };

  const onDragMove = (event: PIXI.FederatedPointerEvent) => {
    const target = event.currentTarget as PIXI.Text & {
      dragging?: boolean;
      data?: PIXI.FederatedPointerEvent;
    };
    if (target.dragging && target.data) {
      const newPosition = target.data.getLocalPosition(target.parent);
      target.x = newPosition.x;
      target.y = newPosition.y;
    }
  };

  const translateTextToFabric = () => {
    if (pixiText && fabricCanvas) {
      const textValue = pixiText.text;
      const fontFamily = pixiText.style.fontFamily;
      const fontSize = pixiText.style.fontSize as number;
      const fillColor = pixiText.style.fill as number;
      const textAlign = pixiText.style.align;
      const position = { x: pixiText.x, y: pixiText.y };

      const rgbColor = fillColor.toString(); // Convert hex to string format, e.g., "#ff1010"

      const fabricText = new fabric.Text(textValue, {
        left: position.x,
        top: position.y,
        fontFamily: Array.isArray(fontFamily) ? fontFamily[0] : fontFamily,
        fontSize: fontSize,
        fill: rgbColor,
        textAlign: textAlign as string,
      });

      fabricCanvas.add(fabricText);
      fabricCanvas.renderAll();
    }
  };

  return (
    <div>
      <div>
        <button onClick={addPixiText}>Add Text</button>
        <button onClick={translateTextToFabric}>Translate</button>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          marginTop: '20px',
        }}
      >
        <div
          style={{
            backgroundImage: `url(https://resources.qstrike.net/vectorsoft/icons/tiles.png)`,
            backgroundColor: '#f8f8f8',
          }}
        >
          <div ref={pixiCanvasRef}></div>
        </div>
        <div
          style={{
            backgroundImage: `url(https://resources.qstrike.net/vectorsoft/icons/tiles.png)`,
            backgroundColor: '#f8f8f8',
          }}
        >
          <canvas ref={fabricCanvasRef} width={500} height={500}></canvas>
        </div>
      </div>
    </div>
  );
};

export default CanvasContainer;
