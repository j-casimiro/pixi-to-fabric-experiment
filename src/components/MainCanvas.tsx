/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useEffect, useState } from 'react'
import { fabric } from 'fabric'

export const MainCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);


    useEffect(() => {
        if (canvasRef.current) {
            const newCanvas = new fabric.Canvas(canvasRef.current, {
                width: 500,
                height: 500,
            });
            setCanvas(newCanvas);
        }
    }, []);

    const handleAddImage = async () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/svg+xml';

        fileInput.onchange = async (e: any) => {
            const file = e.target.files?.[0];
            if (!file) return;

            const reader = new FileReader();
            reader.readAsText(file);

            reader.onload = async () => {
                const svgContent = reader.result as string;
                fabric.loadSVGFromString(svgContent, (objects) => {
                    const image = fabric.util.groupSVGElements(objects);
                    image.set({ left: 0.1, top: 0.1 });
                    canvas?.add(image);
                    canvas?.renderAll();
                })
            }
        }

        fileInput.click();
    }

    return (
        <>
            <canvas ref={canvasRef} />
            <button onClick={handleAddImage}>
                Add Image
            </button>
        </>
    )
}