import React, { useEffect } from 'react';
import { fabric } from 'fabric';

const UniformBuilderNoGrouping: React.FC = () => {
  useEffect(() => {
    const canvas = new fabric.Canvas('canvas');

    // Define the directory path and file names
    const uniformFiles = {
      front_body:
        'https://s3.us-west-2.amazonaws.com/uniformbuilder/materials/production/phpHYIxM6.png', // front body
      colar_front:
        'https://s3.us-west-2.amazonaws.com/uniformbuilder/materials/production/php6vpjhs.png', // colar front
      back_panel:
        'https://s3.us-west-2.amazonaws.com/uniformbuilder/materials/production/php8qJb4l.png', // back panel
      piping:
        'https://s3.us-west-2.amazonaws.com/uniformbuilder/materials/production/phpJY0Sp5.png', // piping
      arm_cuff:
        'https://s3.us-west-2.amazonaws.com/uniformbuilder/materials/production/phproJMUT.png', // arm cuff
      side_graphic:
        'https://s3.us-west-2.amazonaws.com/uniformbuilder/materials/production/php9rcZPc.png', // side graphic
      highlight:
        'https://s3.us-west-2.amazonaws.com/uniformbuilder/materials/production/phpQgxbTp.png', // highlight
      shadow:
        'https://s3.us-west-2.amazonaws.com/uniformbuilder/materials/production/phpHpq74z.png', // shadow
    };

    const teamName = 'TIGERS';
    const teamNumber = '23';

    // Function to load and add images to the canvas
    const loadImage = (
      url: string,
      options: fabric.IImageOptions = {},
      blendMode?: string
    ): Promise<fabric.Image> => {
      return new Promise((resolve) => {
        fabric.Image.fromURL(url, (img) => {
          if (img) {
            img.set(options);
            if (blendMode) {
              img.globalCompositeOperation = blendMode;
            }
            resolve(img);
          }
        });
      });
    };

    // Function to add text to the canvas
    const createText = (
      text: string,
      options: fabric.ITextOptions
    ): fabric.Text => {
      return new fabric.Text(text, options);
    };

    // Load and add all images to the canvas
    const addImages = async () => {
      const imagePromises = Object.entries(uniformFiles).map(
        async ([key, url]) => {
          let blendMode: string | undefined;

          // Apply blending based on specific keys
          if (key === 'shadow') {
            blendMode = 'multiply';
          } else if (key === 'highlight') {
            blendMode = 'screen';
          }

          // Load and add the image to the canvas
          return loadImage(
            url,
            {
              left: 0,
              top: 70,
            },
            blendMode
          );
        }
      );

      const images = await Promise.all(imagePromises);
      images.forEach((image) => canvas.add(image));

      canvas.renderAll();
    };

    // Add text and ensure it appears in front
    const addText = () => {
      // Create text objects
      const teamNameText = createText(teamName, {
        left: 500,
        top: 400,
        fontFamily: 'Arial',
        fontSize: 100,
        fill: '#FF5733',
        textAlign: 'center',
        stroke: '#0000ff',
        strokeWidth: 4,
        fontWeight: 'bold',
        originX: 'center',
        originY: 'center',
        paintFirst: 'stroke',
      });

      const teamNumberText = createText(teamNumber, {
        left: 500,
        top: 550, // Adjust as needed
        fontFamily: 'Arial',
        fontSize: 160,
        fill: '#D3D3D3',
        textAlign: 'center',
        stroke: '#0000ff',
        strokeWidth: 4,
        fontWeight: 'bold',
        originX: 'center',
        originY: 'center',
        paintFirst: 'stroke',
      });

      // Add text to the canvas ensuring they are on top
      canvas.add(teamNameText);
      canvas.add(teamNumberText);

      // Bring text to the front
      teamNameText.bringToFront();
      teamNumberText.bringToFront();

      canvas.renderAll();
    };

    // Initialize the canvas with images and text
    const initializeCanvas = async () => {
      await addImages();
      addText();
    };

    initializeCanvas();
    console.log(canvas._objects);
  }, []);

  return (
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
        <canvas id="canvas" width={1000} height={1200}></canvas>
      </div>
    </div>
  );
};

export default UniformBuilderNoGrouping;
