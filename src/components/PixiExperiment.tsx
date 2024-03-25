import { useRef } from 'react';
import { Application, Sprite } from 'pixi.js';

export const PixiExperiment = () => {
    const pixiCanvasRef = useRef<HTMLCanvasElement>(null);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            const imageData = reader.result as string;
            renderPng(imageData);
        };
        reader.readAsDataURL(file);
    };

    const renderPng = (image: string) => {
        const app = new Application({
            antialias: true,
            backgroundColor: 0xFCFBF4,
            width: 500,
            height: 500,
            view: pixiCanvasRef.current!,
        });

        const bunny = Sprite.from(image);
        bunny.anchor.set(0.5);
        bunny.x = app.screen.width / 2;
        bunny.y = app.screen.height / 2;

        app.stage.addChild(bunny);
    };

    return (
        <div>
            <label htmlFor="file">FOR PNG</label>
            <input type="file" id="file" accept=".png" onChange={handleFileUpload} />
            <div style={{ backgroundColor: '#FCFBF4' }}>
                <canvas ref={pixiCanvasRef} width={500} height={500} />
            </div>
        </div>
    );
};
