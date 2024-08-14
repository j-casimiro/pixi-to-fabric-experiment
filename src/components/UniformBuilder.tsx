import React, { useEffect } from 'react';
import { fabric } from 'fabric';

const UniformBuilder: React.FC = () => {
  useEffect(() => {
    const canvas = new fabric.Canvas('canvas');

    // Define the directory path and file names
    const uniformFiles = [
      '1_Front_Body.png',
      '2_Left_Arm_Edging.png',
      '3_Right_Arm_Edging.png',
      '4_Neck_Edging.png',
      '5_Static.png',
      '98_Shadows.png',
      '99_Highlights.png',
    ];

    const teamName = 'TIGERS';
    const teamNumber = '23';

    // Function to load and add images to canvas
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

    // Function to add text to canvas
    const createText = (
      text: string,
      options: fabric.ITextOptions
    ): fabric.Text => {
      return new fabric.Text(text, options);
    };

    // Load and add all images to the canvas
    const addImages = async () => {
      const imagePromises = uniformFiles.map((fileName) => {
        const filePath = `/uniform/${fileName}`;
        let blendMode: string | undefined = undefined;

        // Apply blending based on the file name
        if (fileName === '98_Shadows.png') {
          blendMode = 'multiply';
        } else if (fileName === '99_Highlights.png') {
          blendMode = 'screen';
        }

        // Load and add the image to the canvas
        return loadImage(
          filePath,
          {
            left: 0,
            top: 70,
          },
          blendMode
        );
      });

      const images = await Promise.all(imagePromises);
      return images;
    };

    // Add text and group them with images
    const addTextAndGroup = async () => {
      const images = await addImages();

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

      // Create a group with all images and text
      const group = new fabric.Group(
        [...images, teamNameText, teamNumberText],
        {
          left: 0,
          top: 70,
          // Optional: group specific options
        }
      );

      canvas.add(group);
      canvas.renderAll();
    };

    // Initialize the canvas with images and text
    addTextAndGroup();
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

export default UniformBuilder;
