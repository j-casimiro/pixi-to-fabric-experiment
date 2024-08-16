// export default function Testing() {
//   interface BodyPart {
//     body_parts: string[];
//     'Allow Patterns': boolean;
//     body_part_group: string;
//     body_parts_name: string[];
//     'Allow Sublimation': boolean;
//     body_part_group_name: string;
//     default_color: string;
//     default_color_id: number;
//     sort_order: string;
//     fill_type: string;
//   }

//   interface ThemeColorSettings {
//     [key: string]: {
//       code: string;
//       parts: string[];
//     }[];
//   }

//   const rawData: BodyPart[] = [
//     {
//       body_parts: ['158', '159', '160'],
//       'Allow Patterns': true,
//       body_part_group: '129',
//       body_parts_name: ['Right Leg', 'Left Leg', 'Waistband'],
//       'Allow Sublimation': true,
//       body_part_group_name: 'Body',
//       'Allow Custom Patterns': false,
//       default_color: 'White',
//       default_color_id: 313,
//       sort_order: '1',
//       fill_type: 'color',
//     },
//     {
//       sort_order: '2',
//       body_part_group: '628',
//       body_part_group_name: 'Side Graphic',
//       body_parts: ['628'],
//       body_parts_name: ['Side Graphic'],
//       'Allow Patterns': true,
//       'Allow Sublimation': true,
//       default_color: 'Vegas Gold',
//       default_color_id: 327,
//       fill_type: 'color',
//     },
//     {
//       sort_order: '3',
//       body_part_group: '589',
//       body_part_group_name: 'Graphic',
//       body_parts: ['589'],
//       body_parts_name: ['Graphic'],
//       'Allow Patterns': true,
//       'Allow Sublimation': true,
//       default_color: 'Dark Green',
//       default_color_id: 334,
//       fill_type: 'color',
//     },
//     {
//       sort_order: '4',
//       body_part_group: '131',
//       body_part_group_name: 'Piping',
//       body_parts: ['131'],
//       body_parts_name: ['Piping'],
//       'Allow Patterns': false,
//       'Allow Sublimation': true,
//       default_color: 'Forest Green',
//       default_color_id: 333,
//       fill_type: 'color',
//     },
//     {
//       sort_order: '5',
//       body_part_group: '313',
//       body_part_group_name: 'Trim',
//       body_parts: ['313'],
//       body_parts_name: ['Trim'],
//       'Allow Patterns': false,
//       'Allow Sublimation': true,
//       default_color: 'Dark Green',
//       default_color_id: 334,
//       fill_type: 'color',
//     },
//   ];

//   const themeColorSettings: ThemeColorSettings = {
//     '0': [{ code: 'Y', parts: [] }],
//     '1': [{ code: 'S', parts: [] }],
//     '2': [{ code: 'G', parts: [] }],
//   };

//   function updateThemeColorSettings(
//     data: BodyPart[],
//     settings: ThemeColorSettings
//   ) {
//     const existingColors: Record<string, string> = {};

//     data.forEach((part) => {
//       const sortOrder = parseInt(part.sort_order, 10) - 1;

//       if (sortOrder < 3) {
//         const colorKey = sortOrder.toString();
//         part.body_parts_name.forEach((name) => {
//           settings[colorKey][0].parts.push(name);
//         });
//         existingColors[part.default_color] = colorKey;
//       } else {
//         const existingColorKey = existingColors[part.default_color];
//         if (existingColorKey) {
//           part.body_parts_name.forEach((name) => {
//             settings[existingColorKey][0].parts.push(name);
//           });
//         }
//       }
//     });
//   }

//   updateThemeColorSettings(rawData, themeColorSettings);

//   console.log(themeColorSettings);

//   return <div></div>;
// }
