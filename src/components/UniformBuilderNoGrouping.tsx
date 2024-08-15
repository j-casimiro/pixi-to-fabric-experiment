import React, { useEffect } from 'react';
import { fabric } from 'fabric';

const UniformBuilderNoGrouping: React.FC = () => {
  useEffect(() => {
    const canvas = new fabric.Canvas('canvas');

    const canvasWidth = 250;
    const canvasHeight = 450;

    // Define the front section images and brand logo
    const uniformFiles = {
      front: [
        {
          name: 'front_body',
          link: 'https://s3.us-west-2.amazonaws.com/uniformbuilder/materials/production/phpHYIxM6.png',
        },
        {
          name: 'colar_front',
          link: 'https://s3.us-west-2.amazonaws.com/uniformbuilder/materials/production/php6vpjhs.png',
        },
        {
          name: 'back_panel',
          link: 'https://s3.us-west-2.amazonaws.com/uniformbuilder/materials/production/php8qJb4l.png',
        },
        {
          name: 'piping',
          link: 'https://s3.us-west-2.amazonaws.com/uniformbuilder/materials/production/phpJY0Sp5.png',
        },
        {
          name: 'arm_cuff',
          link: 'https://s3.us-west-2.amazonaws.com/uniformbuilder/materials/production/phproJMUT.png',
        },
        {
          name: 'side_graphic',
          link: 'https://s3.us-west-2.amazonaws.com/uniformbuilder/materials/production/php9rcZPc.png',
        },
        {
          name: 'highlight',
          link: 'https://s3.us-west-2.amazonaws.com/uniformbuilder/materials/production/phpQgxbTp.png',
        },
        {
          name: 'shadow',
          link: 'https://s3.us-west-2.amazonaws.com/uniformbuilder/materials/production/phpHpq74z.png',
        },
      ],
    };

    const teamName = {
      font_path:
        'https://s3.us-west-2.amazonaws.com/uniformbuilder/fonts/staging/bears-volleyball-qtcb1b04e9/font.ttf',
      text_value: 'RED STICK',
    };

    const frontNumber = {
      font_path:
        'https://s3.us-west-2.amazonaws.com/uniformbuilder/fonts/staging/bears-volleyball-qtcb1b04e9/font.ttf',
      text_value: '23',
    };

    const brandLogo = {
      link: 'https://s3.us-west-2.amazonaws.com/qx7/uploaded_files/master_trims/20230803140846/pupJTi4WMr.png',
      size: {
        width: 33,
        height: 33,
      },
    };

    // Function to load the font
    const loadFont = async (name: string, url: string) => {
      const font = new FontFace(name, `url(${url})`);
      await font.load();
      (document as Document).fonts.add(font);
    };

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
      const imagePromises = uniformFiles.front.map(async (file) => {
        let blendMode: string | undefined;

        // Apply blending based on specific keys
        if (file.name === 'shadow') {
          blendMode = 'multiply';
        } else if (file.name === 'highlight') {
          blendMode = 'screen';
        }

        // Load the image
        const img = await loadImage(file.link);

        // Calculate scaling to fit the image within the canvas
        const scaleX = canvasWidth / img.width!;
        const scaleY = canvasHeight / img.height!;
        const scale = Math.min(scaleX, scaleY);

        img.set({
          left: (canvasWidth - img.width! * scale) / 2,
          top: 35,
          scaleX: scale,
          scaleY: scale,
        });

        if (blendMode) {
          img.globalCompositeOperation = blendMode;
        }

        return img;
      });

      const images = await Promise.all(imagePromises);
      images.forEach((image) => canvas.add(image));

      // Load and add the brand logo
      const logo = await loadImage(brandLogo.link, {
        left: 87, // Adjust as needed
        top: 85, // Adjust as needed
        scaleX: 0.006, // Scale based on the size provided
        scaleY: 0.006, // Scale based on the size provided
        originX: 'center',
        originY: 'center',
      });

      canvas.add(logo);

      canvas.renderAll();
    };

    // Add text and ensure it appears in front
    const addText = async () => {
      // Load custom fonts
      await loadFont('CustomFont', teamName.font_path);

      // Create text objects
      const teamNameText = createText(teamName.text_value, {
        left: canvasWidth / 2,
        top: 115,
        fontFamily: 'CustomFont', // Use the custom font name
        fontSize: 15,
        fill: '#D3D3D3',
        textAlign: 'center',
        stroke: '#808080',
        strokeWidth: 2,
        fontWeight: 'bold',
        originX: 'center',
        originY: 'center',
        paintFirst: 'stroke',
      });

      const teamNumberText = createText(frontNumber.text_value, {
        left: canvasWidth / 2,
        top: 145, // Adjust as needed
        fontFamily: 'CustomFont', // Use the custom font name
        fontSize: 40,
        fill: '#D3D3D3',
        textAlign: 'center',
        stroke: '#808080',
        strokeWidth: 2,
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
      await addText();
    };

    initializeCanvas();
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
        <canvas id="canvas" width={250} height={350}></canvas>
      </div>
    </div>
  );
};

export default UniformBuilderNoGrouping;
