import React, { useRef } from 'react';
import { Application, Sprite } from 'pixi.js';
import { fabric } from 'fabric';

interface PixiExperimentProps {}

export const PixiExperiment: React.FC<PixiExperimentProps> = () => {
  const pixiCanvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const imageData = await readFileAsDataURL(file);
    renderPngToPixi(imageData);
  };

  const readFileAsDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const renderPngToPixi = (image: string) => {
    const app = new Application({
      antialias: true,
      backgroundColor: "#FFFFFF",
      width: 500,
      height: 500,
      view: pixiCanvasRef.current!,
    });

    const bunny = Sprite.from(image);
    bunny.anchor.set(0.5);
    const canvasWidth = app.screen.width;
    const canvasHeight = app.screen.height;
    const scale = Math.min(canvasWidth / bunny.width, canvasHeight / bunny.height) * 0.8; // Adjust scale factor as needed
    bunny.scale.set(scale);

    bunny.x = canvasWidth / 2;
    bunny.y = canvasHeight / 2;

    app.stage.addChild(bunny);

    const canvas = app.renderer.extract.canvas(bunny);
    const context = canvas.getContext('2d');
    const imgData = context?.getImageData(0, 0, canvas.width, canvas.height);
    if (!imgData) return;

    console.log(JSON.stringify(imgData));
    console.log(imgData);
    renderFabricCanvas(imgData.data, canvas.width);
  };

  const renderFabricCanvas = async (pixelData: Uint8ClampedArray, width: number) => {
    return new Promise<void>((resolve, reject) => {
      // Ensure pixelData length is a multiple of (4 * width)
      const paddedLength = Math.ceil(pixelData.length / (4 * width)) * (4 * width);
      const paddedData = new Uint8ClampedArray(paddedLength);
      paddedData.set(pixelData);
  
      // Create a new ImageData object
      const imgData = new ImageData(paddedData, width, paddedLength / (4 * width));
  
      // Create a canvas and draw the ImageData onto it
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = paddedLength / (4 * width);
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error("Failed to get canvas context"));
        return;
      }
      ctx.putImageData(imgData, 0, 0);
  
      // Convert the canvas to a data URL
      const dataURL = canvas.toDataURL();
  
      // Create Fabric.js Image from the data URL
      fabric.Image.fromURL(dataURL, (fabricImage) => {
        fabricImage.set({ left: 0, top: 0 });
  
        // Adjusting scale
        const scaleFactor = 0.5; // Adjust scale factor as needed
        fabricImage.scaleX = (fabricImage.scaleX ?? 1) * scaleFactor;
        fabricImage.scaleY = (fabricImage.scaleY ?? 1) * scaleFactor;
  
        const fabricCanvas = new fabric.Canvas(fabricCanvasRef.current!);
        fabricCanvas.add(fabricImage);
        fabricCanvas.centerObject(fabricImage);
        fabricCanvas.renderAll();

        console.log(JSON.stringify(fabricCanvas));
        
        resolve();
      });
    });
  };  

  return (
    <div>
      <label htmlFor="file">Upload PNG:</label>
      <input type="file" id="file" onChange={handleFileUpload} />
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ margin: 10 }}>
          <p>This is a pixi canvas</p>
          <div style={{ backgroundColor: '#FFFFFF' }}>
            <canvas ref={pixiCanvasRef} width={500} height={500} />
          </div>
        </div>
        <div style={{ margin: 10 }}>
          <p>This is a fabric canvas</p>
          <div style={{ backgroundColor: '#FFFFFF' }}>
            <canvas ref={fabricCanvasRef} width={500} height={500} />
          </div>
        </div>
      </div>
    </div>
  );
};
