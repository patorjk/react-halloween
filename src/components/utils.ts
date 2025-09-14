export function randomNumber(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function randomIntFromInterval(min: number, max: number): number {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const cssColorLookup: Record<string, string> = {
  aliceblue: '#f0f8ff',
  antiquewhite: '#faebd7',
  aqua: '#00ffff',
  aquamarine: '#7fffd4',
  azure: '#f0ffff',
  beige: '#f5f5dc',
  bisque: '#ffe4c4',
  black: '#000000',
  blanchedalmond: '#ffebcd',
  blue: '#0000ff',
  blueviolet: '#8a2be2',
  brown: '#a52a2a',
  burlywood: '#deb887',
  cadetblue: '#5f9ea0',
  chartreuse: '#7fff00',
  chocolate: '#d2691e',
  coral: '#ff7f50',
  cornflowerblue: '#6495ed',
  cornsilk: '#fff8dc',
  crimson: '#dc143c',
  cyan: '#00ffff',
  darkblue: '#00008b',
  darkcyan: '#008b8b',
  darkgoldenrod: '#b8860b',
  darkgray: '#a9a9a9',
  darkgreen: '#006400',
  darkgrey: '#a9a9a9',
  darkkhaki: '#bdb76b',
  darkmagenta: '#8b008b',
  darkolivegreen: '#556b2f',
  darkorange: '#ff8c00',
  darkorchid: '#9932cc',
  darkred: '#8b0000',
  darksalmon: '#e9967a',
  darkseagreen: '#8fbc8f',
  darkslateblue: '#483d8b',
  darkslategray: '#2f4f4f',
  darkslategrey: '#2f4f4f',
  darkturquoise: '#00ced1',
  darkviolet: '#9400d3',
  deeppink: '#ff1493',
  deepskyblue: '#00bfff',
  dimgray: '#696969',
  dimgrey: '#696969',
  dodgerblue: '#1e90ff',
  firebrick: '#b22222',
  floralwhite: '#fffaf0',
  forestgreen: '#228b22',
  fuchsia: '#ff00ff',
  gainsboro: '#dcdcdc',
  ghostwhite: '#f8f8ff',
  goldenrod: '#daa520',
  gold: '#ffd700',
  gray: '#808080',
  green: '#008000',
  greenyellow: '#adff2f',
  grey: '#808080',
  honeydew: '#f0fff0',
  hotpink: '#ff69b4',
  indianred: '#cd5c5c',
  indigo: '#4b0082',
  ivory: '#fffff0',
  khaki: '#f0e68c',
  lavenderblush: '#fff0f5',
  lavender: '#e6e6fa',
  lawngreen: '#7cfc00',
  lemonchiffon: '#fffacd',
  lightblue: '#add8e6',
  lightcoral: '#f08080',
  lightcyan: '#e0ffff',
  lightgoldenrodyellow: '#fafad2',
  lightgray: '#d3d3d3',
  lightgreen: '#90ee90',
  lightgrey: '#d3d3d3',
  lightpink: '#ffb6c1',
  lightsalmon: '#ffa07a',
  lightseagreen: '#20b2aa',
  lightskyblue: '#87cefa',
  lightslategray: '#778899',
  lightslategrey: '#778899',
  lightsteelblue: '#b0c4de',
  lightyellow: '#ffffe0',
  lime: '#00ff00',
  limegreen: '#32cd32',
  linen: '#faf0e6',
  magenta: '#ff00ff',
  maroon: '#800000',
  mediumaquamarine: '#66cdaa',
  mediumblue: '#0000cd',
  mediumorchid: '#ba55d3',
  mediumpurple: '#9370db',
  mediumseagreen: '#3cb371',
  mediumslateblue: '#7b68ee',
  mediumspringgreen: '#00fa9a',
  mediumturquoise: '#48d1cc',
  mediumvioletred: '#c71585',
  midnightblue: '#191970',
  mintcream: '#f5fffa',
  mistyrose: '#ffe4e1',
  moccasin: '#ffe4b5',
  navajowhite: '#ffdead',
  navy: '#000080',
  oldlace: '#fdf5e6',
  olive: '#808000',
  olivedrab: '#6b8e23',
  orange: '#ffa500',
  orangered: '#ff4500',
  orchid: '#da70d6',
  palegoldenrod: '#eee8aa',
  palegreen: '#98fb98',
  paleturquoise: '#afeeee',
  palevioletred: '#db7093',
  papayawhip: '#ffefd5',
  peachpuff: '#ffdab9',
  peru: '#cd853f',
  pink: '#ffc0cb',
  plum: '#dda0dd',
  powderblue: '#b0e0e6',
  purple: '#800080',
  rebeccapurple: '#663399',
  red: '#ff0000',
  rosybrown: '#bc8f8f',
  royalblue: '#4169e1',
  saddlebrown: '#8b4513',
  salmon: '#fa8072',
  sandybrown: '#f4a460',
  seagreen: '#2e8b57',
  seashell: '#fff5ee',
  sienna: '#a0522d',
  silver: '#c0c0c0',
  skyblue: '#87ceeb',
  slateblue: '#6a5acd',
  slategray: '#708090',
  slategrey: '#708090',
  snow: '#fffafa',
  springgreen: '#00ff7f',
  steelblue: '#4682b4',
  tan: '#d2b48c',
  teal: '#008080',
  thistle: '#d8bfd8',
  tomato: '#ff6347',
  turquoise: '#40e0d0',
  violet: '#ee82ee',
  wheat: '#f5deb3',
  white: '#ffffff',
  whitesmoke: '#f5f5f5',
  yellow: '#ffff00',
  yellowgreen: '#9acd32',
};

interface RGBColor {
  r: number;
  g: number;
  b: number;
}

function twoColorFade(color1: RGBColor, color2: RGBColor, length: number): RGBColor[] {
  const rIncr = (color2.r - color1.r) / (length - 1);
  const gIncr = (color2.g - color1.g) / (length - 1);
  const bIncr = (color2.b - color1.b) / (length - 1);
  const colors: RGBColor[] = [];
  let { r } = color1;
  let { g } = color1;
  let { b } = color1;
  let ii: number;

  // eslint-disable-next-line no-plusplus
  for (ii = 0; ii < length; ii++) {
    colors.push({ r, b, g });
    r += rIncr;
    g += gIncr;
    b += bIncr;
  }

  return colors;
}

function multiColorFade(colors: RGBColor[], length: number): RGBColor[] {
  const colorIncr = (length - 1) / (colors.length - 1);
  let ii: number;
  const len = Math.min(colors.length - 1, length);
  let startPos = 0;
  let endPos = 1;
  let retColors: RGBColor[] = [];
  let tmpColors: RGBColor[];
  let dist: number;

  // eslint-disable-next-line no-plusplus
  for (ii = 0; ii < len; ii++) {
    endPos = Math.max(startPos + 2, endPos + colorIncr);
    dist = Math.round(endPos) - Math.round(startPos);

    tmpColors = twoColorFade(colors[ii], colors[ii + 1], dist);
    retColors.pop(); // remove last color
    retColors = retColors.concat(tmpColors);

    startPos = Math.round(endPos) - 1;
  }
  return retColors;
}

function parseCSSColor(color: string) {
  const retColor: RGBColor = { r: 255, g: 255, b: 255 };
  const lookup = cssColorLookup[color];
  if (lookup) {
    retColor.r = parseInt(lookup.substring(1, 3), 16);
    retColor.g = parseInt(lookup.substring(3, 5), 16);
    retColor.b = parseInt(lookup.substring(5, 7), 16);
    return retColor;
  }
  if (color.match(/^#[0-9a-fA-F]{3}$/)) {
    retColor.r = parseInt(color.substring(1, 2) + color.substring(1, 2), 16);
    retColor.g = parseInt(color.substring(2, 3) + color.substring(2, 3), 16);
    retColor.b = parseInt(color.substring(3, 4) + color.substring(3, 4), 16);
    return retColor;
  }
  if (color.match(/^#[0-9a-fA-F]{6}$/)) {
    retColor.r = parseInt(color.substring(1, 3), 16);
    retColor.g = parseInt(color.substring(3, 5), 16);
    retColor.b = parseInt(color.substring(5, 7), 16);
  } else if (color.indexOf('rgb') !== -1) {
    const matches = color.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
    if (matches) {
      retColor.r = parseInt(matches[1], 10);
      retColor.g = parseInt(matches[2], 10);
      retColor.b = parseInt(matches[3], 10);
    } else {
      console.warn(`Unknown rgb color: ${color}`);
      return retColor;
    }
  }
  console.warn(`Unknown color: ${color}`);
  return retColor;
}

export { multiColorFade, parseCSSColor };
