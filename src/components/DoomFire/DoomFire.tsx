import React, { useEffect, useMemo, useRef, useState } from 'react';

//import { fadeColors, type RgbaColor } from 'color-fader';

export interface RgbaColor {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface HslaColor {
  h: number;
  s: number;
  l: number;
  a: number;
}

const namedColors: { [key: string]: string } = {
  transparent: '#00000000',
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
  gold: '#ffd700',
  goldenrod: '#daa520',
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
  lavender: '#e6e6fa',
  lavenderblush: '#fff0f5',
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

/**
 * Converts a color string into an RGBAColor object
 *
 * @param color CSS color string
 */
export function cssColorToRgba(color: string): RgbaColor {
  const normalizedColor = color.trim().toLowerCase();

  if (normalizedColor.startsWith('#')) {
    return parseHexColor(normalizedColor);
  } else if (normalizedColor.startsWith('rgb')) {
    return parseRgbColor(normalizedColor);
  } else if (normalizedColor.startsWith('hsl')) {
    return parseHslColor(normalizedColor);
  } else if (namedColors[normalizedColor]) {
    return parseNamedColor(normalizedColor)!;
  }

  throw new Error(`Unsupported color format: ${color}`);
}

function parseHexColor(hex: string): RgbaColor {
  const cleanHex = hex.slice(1); // Remove the # symbol

  if (cleanHex.length < 3) throw new Error(`Invalid hex color format: ${hex}`);

  let r: number,
    g: number,
    b: number,
    a: number = 1;

  if (cleanHex.length <= 4) {
    if (typeof cleanHex[0] !== 'string') throw new Error(`Invalid hex color format: ${hex}`);
    if (typeof cleanHex[1] !== 'string') throw new Error(`Invalid hex color format: ${hex}`);
    if (typeof cleanHex[2] !== 'string') throw new Error(`Invalid hex color format: ${hex}`);

    r = parseInt(cleanHex[0] + cleanHex[0], 16);
    g = parseInt(cleanHex[1] + cleanHex[1], 16);
    b = parseInt(cleanHex[2] + cleanHex[2], 16);
    if (cleanHex.length === 4) {
      if (typeof cleanHex[3] !== 'string') throw new Error(`Invalid hex color format: ${hex}`);
      a = parseInt(cleanHex[3] + cleanHex[3], 16) / 255;
    }
  } else if (cleanHex.length === 6) {
    r = parseInt(cleanHex.slice(0, 2), 16);
    g = parseInt(cleanHex.slice(2, 4), 16);
    b = parseInt(cleanHex.slice(4, 6), 16);
  } else if (cleanHex.length === 8) {
    r = parseInt(cleanHex.slice(0, 2), 16);
    g = parseInt(cleanHex.slice(2, 4), 16);
    b = parseInt(cleanHex.slice(4, 6), 16);
    a = parseInt(cleanHex.slice(6, 8), 16) / 255;
  } else {
    throw new Error(`Invalid hex color format: ${hex}`);
  }

  return { r, g, b, a };
}

function parseRgbColor(rgb: string): RgbaColor {
  // Extract the content inside parentheses
  const match = rgb.match(/rgba?\(([^)]+)\)/);
  if (!match) {
    throw new Error(`Invalid RGB color format: ${rgb}`);
  }
  if (typeof match[1] !== 'string') throw new Error('Invalid RGB color format: ' + rgb);

  const values = match[1]
    .trim()
    .split(/[ ,/]+/)
    .map((v) => v.trim());

  if (values.length < 3 || values.length > 4) {
    throw new Error(`Invalid RGB color format: ${rgb}`);
  }

  if (typeof values[0] !== 'string' || typeof values[1] !== 'string' || typeof values[2] !== 'string') {
    throw new Error(`Invalid RGB color format: ${rgb}`);
  }

  const r = parseColorValue(values[0], 255);
  const g = parseColorValue(values[1], 255);
  const b = parseColorValue(values[2], 255);
  let a = 1;
  if (values.length === 4 && typeof values[3] === 'string') {
    a = parseAlphaValue(values[3], 1);
  }

  return { r, g, b, a };
}

function parseHslColor(hsl: string): RgbaColor {
  // Extract the content inside parentheses
  const match = hsl.match(/hsla?\(([^)]+)\)/);
  if (!match) {
    throw new Error(`Invalid HSL color format: ${hsl}`);
  }

  if (typeof match[1] !== 'string') throw new Error('Invalid RGB color format: ' + hsl);

  const values = match[1]
    .trim()
    .split(/[ ,/]+/)
    .map((v) => v.trim());

  if (values.length < 3 || values.length > 4) {
    throw new Error(`Invalid HSL color format: ${hsl}`);
  }
  if (typeof values[0] !== 'string' || typeof values[1] !== 'string' || typeof values[2] !== 'string') {
    throw new Error(`Invalid HSL color format: ${hsl}`);
  }

  const h = parseFloat(values[0]) / 360; // Convert to 0-1 range
  const s = parseFloat(values[1].replace('%', '')) / 100; // Convert percentage to 0-1
  const l = parseFloat(values[2].replace('%', '')) / 100; // Convert percentage to 0-1
  let a = 1;
  if (values.length === 4 && typeof values[3] === 'string') {
    a = parseAlphaValue(values[3], 1);
  }

  const { r, g, b } = hslToRgb(h, s, l);

  return { r, g, b, a };
}

function parseColorValue(value: string, maxValue: number): number {
  if (value.includes('%')) {
    return Math.round((parseFloat(value.replace('%', '')) / 100) * maxValue);
  }
  return Math.min(maxValue, Math.max(0, Math.round(parseFloat(value))));
}

function parseAlphaValue(value: string, maxValue: number): number {
  if (value.includes('%')) {
    return (parseFloat(value.replace('%', '')) / 100) * maxValue;
  }
  return Math.min(maxValue, Math.max(0, parseFloat(value)));
}

function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number): number => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

function parseNamedColor(colorName: string): RgbaColor | null {
  if (namedColors[colorName]) {
    return parseHexColor(namedColors[colorName]);
  }

  return null;
}

export function rgbaToHsla(rgb: RgbaColor): HslaColor {
  // Normalize RGB values to 0-1 range
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (delta !== 0) {
    // Calculate saturation
    s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);

    // Calculate hue
    switch (max) {
      case r:
        h = ((g - b) / delta + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / delta + 2) / 6;
        break;
      case b:
        h = ((r - g) / delta + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
    a: rgb.a,
  };
}

export type Color = RgbaColor | string;

export const fadeColors = (colors: Color[], outputSize: number): RgbaColor[] => {
  const processedColors: RgbaColor[] = colors.map((color) => {
    return typeof color === 'string' ? cssColorToRgba(color) : color;
  });

  if (processedColors.length === 0) {
    throw new Error('Colors array cannot be empty');
  }

  if (outputSize <= 0) {
    throw new Error('Output size must be greater than 0');
  }

  if (outputSize === 1) {
    if (processedColors[0]) {
      return [{ r: processedColors[0].r, g: processedColors[0].g, b: processedColors[0].b, a: processedColors[0].a }];
    } else {
      throw new Error('Colors array cannot be empty');
    }
  }

  if (processedColors.length === 1) {
    const color = processedColors[0];
    if (typeof color !== 'undefined') {
      return Array(outputSize)
        .fill(null)
        .map(() => ({ r: color.r, g: color.g, b: color.b, a: color.a }));
    } else {
      throw new Error('Colors array cannot be empty');
    }
  }

  const result: RgbaColor[] = [];

  // Calculate how many steps between each pair of colors
  const totalSegments = processedColors.length - 1;
  const stepsPerSegment = (outputSize - 1) / totalSegments;

  for (let i = 0; i < outputSize; i++) {
    // Find which segment we're in
    const segmentIndex = Math.min(Math.floor(i / stepsPerSegment), totalSegments - 1);

    // Find the position within the current segment (0 to 1)
    const segmentProgress = i / stepsPerSegment - segmentIndex;
    const t = Math.min(segmentProgress, 1);

    const startColor = processedColors[segmentIndex];
    const endColor = processedColors[segmentIndex + 1];

    if (startColor && endColor) {
      // Linear interpolation between the two colors
      const interpolatedColor: RgbaColor = {
        r: Math.round(startColor.r + (endColor.r - startColor.r) * t),
        g: Math.round(startColor.g + (endColor.g - startColor.g) * t),
        b: Math.round(startColor.b + (endColor.b - startColor.b) * t),
        a: startColor.a + (endColor.a - startColor.a) * t,
      };

      result.push(interpolatedColor);
    }
  }

  return result;
};

export type FireMode = 'ground' | 'freeform';

/**
 * Algorithm that explains Doom Fire is talked about here:
 * https://fabiensanglard.net/doom_fire_psx/
 */

/**
 * Gets an index into the 1D array that represents the fire.
 *
 * @param x {number} X position.
 * @param y {number} Y position.
 * @param width {number} Width of the fire.
 */
const getPixelIndex = (x: number, y: number, width: number) => y * width + x;

/**
 * Takes in an existing fireBuffer and creates the next iteration
 *
 * @param fireBuffer {number[]} 1D array representing a 2D plane. Top-left pixel is at array index zero
 *   and bottom-right pixel is at index height*width-1.
 * @param width {number} Width of the fire in pixels.
 * @param height {number} Height of hte fire in pixels.
 * @param maxIntensity {number} Number indicating the intensity. Higher the number, higher the intensity. Max height of
 *   the fire is the max intensity.
 * @param fireEnabled {boolean} Toggling on/off leads to a mini animation.
 * @param mode {FireMode} "ground" or "freeform"
 * @param mousePos {{ x: number; y: number } | null} Mouse position in fire coordinates
 * @param fireRadius {number} Size of the fire source in freeform mode
 */
function updateFire(
  fireBuffer: number[] | null,
  width: number,
  height: number,
  maxIntensity: number,
  fireEnabled: boolean = true,
  mode: FireMode = 'ground',
  mousePos: { x: number; y: number } | null = null,
  fireRadius: number,
) {
  if (!fireBuffer) return [];

  const newFireBuffer = Array.from(fireBuffer);

  /**
   * We do averages here because without taking average the fire will
   * drift slightly to the left. This is because pixels are processed
   * left-to-right and each pixels writes to a target position.
   * When multiple pixels write to the same position, the last writes
   * wins. So the average approach is aimed at getting rid of this bias.
   */

  // Track contributions for averaging
  const contributionCounts = new Array(width * height).fill(0);
  const contributionSums = new Array(width * height).fill(0);

  for (let y = 0; y < height - 1; y++) {
    for (let x = 0; x < width; x++) {
      const belowPixelIndex = getPixelIndex(x, y + 1, width);
      const fireIntensity = fireBuffer[belowPixelIndex];

      const randomDecay = Math.floor(Math.random() * 3);
      const randomWind = Math.floor(Math.random() * 3) - 1;

      const newIntensity = Math.max(0, fireIntensity - randomDecay);
      const targetX = Math.max(0, Math.min(width - 1, x + randomWind));
      const targetIndex = getPixelIndex(targetX, y, width);

      // Accumulate values for averaging
      contributionSums[targetIndex] += newIntensity;
      contributionCounts[targetIndex]++;
    }
  }

  // Average out all contributions
  for (let i = 0; i < height - 1; i++) {
    for (let j = 0; j < width; j++) {
      const index = getPixelIndex(j, i, width);
      if (contributionCounts[index] > 0) {
        newFireBuffer[index] = Math.round(contributionSums[index] / contributionCounts[index]);
      }
    }
  }

  if (mode === 'ground') {
    // Ground mode: fire source at bottom
    for (let x = 0; x < width; x++) {
      if (fireEnabled) {
        newFireBuffer[getPixelIndex(x, height - 1, width)] = maxIntensity;
      } else {
        newFireBuffer[getPixelIndex(x, height - 1, width)] = Math.max(
          0,
          newFireBuffer[getPixelIndex(x, height - 1, width)] - Math.floor(Math.random() * 3),
        );
      }
    }
  } else if (mode === 'freeform') {
    // Freeform mode: fire source follows mouse
    if (fireEnabled && mousePos) {
      // Create a fire source that emanates from the mouse position
      for (let dy = -fireRadius; dy <= fireRadius; dy++) {
        for (let dx = -fireRadius; dx <= fireRadius; dx++) {
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance <= fireRadius) {
            const x = Math.round(mousePos.x + dx);
            const y = Math.round(mousePos.y + dy);

            if (x >= 0 && x < width && y >= 0 && y < height) {
              // Use exponential falloff for more natural decay
              const normalizedDistance = distance / fireRadius;
              const falloff = Math.pow(1 - normalizedDistance, 2); // Quadratic falloff

              // Add randomness to create more natural-looking fire
              const randomVariation = 0.5 + Math.random() * 0.5; // 0.7 to 1.0

              // Calculate intensity with falloff and randomness
              const intensity = maxIntensity * falloff * randomVariation;

              const index = getPixelIndex(x, y, width);
              // Use Math.max to blend with existing fire
              newFireBuffer[index] = Math.max(newFireBuffer[index], Math.floor(intensity));
            }
          }
        }
      }
    }
  }

  return newFireBuffer;
}

/**
 * Draws the fires onto the canvas.
 *
 * @param canvas {HTMLCanvasElement} Canvas that will hold the fire.
 * @param ctx {CanvasRenderingContext2D} Canvas context of the canvas.
 * @param fireBuffer {number[]} 1D array representing a 2D plane. Top-left pixel is at array index zero
 *   and bottom-right pixel is at index height*width-1.
 * @param firePalette {RgbaColor[]} An array of color values that map to a fire intensity.
 * @param fireWidth {number} Width of fire.
 * @param fireHeight {number} Height of fire.
 */
function renderFire(
  canvas: HTMLCanvasElement | null,
  ctx: CanvasRenderingContext2D | null,
  fireBuffer: number[],
  firePalette: RgbaColor[],
  fireWidth: number,
  fireHeight: number,
) {
  if (!canvas || !ctx) return;

  const imageData = ctx.createImageData(fireWidth, fireHeight);

  for (let y = 0; y < fireHeight; y++) {
    for (let x = 0; x < fireWidth; x++) {
      const pixelIndex = getPixelIndex(x, y, fireWidth);
      const fireIntensity = Math.min(fireBuffer[pixelIndex], firePalette.length - 1);

      const color = firePalette[fireIntensity];

      const imageIndex = (y * fireWidth + x) * 4;
      imageData.data[imageIndex] = color.r;
      imageData.data[imageIndex + 1] = color.g;
      imageData.data[imageIndex + 2] = color.b;
      imageData.data[imageIndex + 3] = color.a * 255;
    }
  }

  // Create temporary canvas for scaling
  const tempCanvas = document.createElement('canvas');
  const tempCtx = tempCanvas.getContext('2d');
  tempCanvas.width = fireWidth;
  tempCanvas.height = fireHeight;

  if (!tempCtx) return;

  tempCtx.putImageData(imageData, 0, 0);

  // Scale up the image with pixelated rendering
  ctx.imageSmoothingEnabled = false;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(tempCanvas, 0, 0, canvas.width, canvas.height);
}

function initFire(width: number, height: number, maxIntensity: number = 36, mode: FireMode): number[] {
  const fireBuffer = Array(width * height).fill(0);

  if (mode === 'ground') {
    // While fire is on, bottom row should be at maximum fire intensity
    for (let x = 0; x < width; x++) {
      fireBuffer[getPixelIndex(x, height - 1, width)] = maxIntensity;
    }
  }
  return fireBuffer;
}

const defaultFireColors = ['#771f0700', '#771f07', '#DF4F07', '#cf770f', '#BF9F1F', '#B7B72F', '#ffffff'];

function usePrevious(value: number) {
  const ref = useRef<number>(undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

export interface DoomFireProps {
  height?: number;
  width?: number;
  pixelSize?: number;
  fireColors?: string[];
  fireEnabled?: boolean;
  fireStrength?: number;
  mode?: FireMode;
  fireRadius?: number;
}

/**
 *
 * @param height {number} Height of canvas in pixels.
 * @param width {number} Width of canvas in pixels.
 * @param pixelSize {number} How big a pixel should be in the output. Larger means more pixelated.
 * @param fireColors {string[]} Array of CSS color values.
 * @param fireEnabled {boolean} If the fire is on.
 * @param fireStrength {number} Number between 0 and 1, represents the "strength" of the fire.
 * @param mode {FireMode} "ground" for fire from bottom, "freeform" to follow mouse/touch
 * @param fireRadius {number} Radius of fire in "freeform" mode.
 * @constructor
 */
const DoomFire = ({
  height = 300,
  width = 400,
  pixelSize = 2,
  fireColors = defaultFireColors,
  fireEnabled = true,
  fireStrength = 0.75,
  mode = 'ground',
  fireRadius = 7,
}: DoomFireProps) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

  const fireWidth = Math.ceil(width / pixelSize);
  const fireHeight = Math.ceil(height / pixelSize);

  const prevStrength = usePrevious(fireStrength);
  const prevFireWidth = usePrevious(fireWidth);
  const prevFireHeight = usePrevious(fireHeight);

  const fireBufferRef = useRef<number[]>(null);

  const flamePalette: RgbaColor[] = useMemo(() => {
    const fadedColors = fadeColors(fireColors ?? defaultFireColors, fireHeight * fireStrength);
    if (fireStrength !== prevStrength || prevFireWidth !== fireWidth || prevFireHeight !== fireHeight) {
      fireBufferRef.current = initFire(fireWidth, fireHeight, fadedColors.length - 1, mode);
    }
    return fadedColors;
  }, [fireColors, fireWidth, fireHeight, fireStrength, prevStrength, prevFireWidth, prevFireHeight]);

  // Handle mouse/touch movement
  useEffect(() => {
    if (mode !== 'freeform') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateMousePosition = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      const x = Math.floor((clientX - rect.left) / pixelSize);
      const y = Math.floor((clientY - rect.top) / pixelSize);

      setMousePos({ x, y });
    };

    const handleMouseMove = (e: MouseEvent) => {
      updateMousePosition(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        updateMousePosition(touch.clientX, touch.clientY);
      }
    };

    const handleMouseLeave = () => {
      setMousePos(null);
    };

    const handleTouchEnd = () => {
      setMousePos(null);
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd);

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
    };
  }, [mode, pixelSize]);

  /**
   * This effect governs the animation.
   */
  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      fireBufferRef.current = updateFire(
        fireBufferRef.current,
        fireWidth,
        fireHeight,
        flamePalette.length - 1,
        fireEnabled,
        mode,
        mousePos,
        fireRadius,
      );
      renderFire(
        canvasRef.current,
        canvasRef.current?.getContext('2d') || null,
        fireBufferRef.current,
        flamePalette,
        fireWidth,
        fireHeight,
      );
      animationFrameId = window.requestAnimationFrame(animate);
    };

    animationFrameId = window.requestAnimationFrame(animate);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [fireWidth, fireHeight, flamePalette, fireEnabled, mode, mousePos, fireRadius]);

  return (
    <canvas
      id="doomfire"
      width={`${width}px`}
      height={`${height}px`}
      ref={canvasRef}
      style={{ touchAction: 'none', cursor: mode === 'freeform' ? 'none' : 'default' }}
    />
  );
};

export { DoomFire };
