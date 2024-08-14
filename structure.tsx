export const data = {
  themeColorSettings: {
    0: [
      {
        code: 'B',
        parts: ['back_panel', 'front_body', 'piping'],
      },
    ],
    1: [
      {
        code: 'R',
        parts: ['collar', 'arm_cuff', 'side_graphic'],
      },
    ],
    2: [
      {
        code: 'W',
        parts: [],
      },
    ],
  },
  uniforms: {
    0: [
      {
        // lahat ng perspective na may front value kunin tapos ilagay dito
        front: {
          0: {
            name: '',
            link: '',
          },
          // marami to
        },
        left: {
          name: '',
          link: '',
          // marami din
        },
      },
    ],
    1: [
      {
        // lahat ng perspective na may front value kunin tapos ilagay dito
        front: {
          0: {
            name: '',
            link: '',
          },
          // marami to
        },
        left: {
          name: '',
          link: '',
          // marami din
        },
      },
    ],
  },
  teamName: {
    // reference: settings/applications
    font_path: 'link',
    text_value: 'RED STICK',
    pixelFontSize: 60,
    color_array: [
      // settings/applications/application_type: 'team_name'/color_array

      // sample data is:
      {
        color_code: 'W',
        color_alias: 'White',
        web_hex_code: 'e6e6e6',
        type: 'regular',
        hex_code: 'e6e6e6',
        name: 'White',
      },
      // need kunin lahat nung nasa loob ng color array
      // if ang laman ng array ay more than 1, automatic na yung iba ay for stroke
    ],
  },
  frontNumber: {
    font_path: 'link to',
    text_value: '23',
    pixelFontSize: 180,
    color_array: [
      // settings/applications/application_type: 'front_number'/color_array

      // sample data is:
      {
        color_code: 'W',
        color_alias: 'White',
        web_hex_code: 'e6e6e6',
        type: 'regular',
        hex_code: 'e6e6e6',
        name: 'White',
      },
      // need kunin lahat nung nasa loob ng color array
    ],
  },
  brand_logo: {
    // settings/brand_trims/trim/image
    link: 'link',

    // settings/brand_trims/size
    size: {
      width: 33,
      height: 37.5,
    },
  },
};
