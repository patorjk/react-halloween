import React, { useEffect, useMemo, useRef } from 'react';
import { fadeColors, type RgbaColor } from 'color-fader';

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
 */
function updateFire(
  fireBuffer: number[] | null,
  width: number,
  height: number,
  maxIntensity: number,
  fireEnabled: boolean = true,
) {
  if (!fireBuffer) return [];

  const newFireBuffer = Array.from(fireBuffer);
  for (let y = 0; y < height - 1; y++) {
    for (let x = 0; x < width; x++) {
      const pixelIndex = getPixelIndex(x, y, width);
      const belowPixelIndex = getPixelIndex(x, y + 1, width);

      const fireIntensity = fireBuffer[belowPixelIndex];

      if (fireIntensity === 0) {
        newFireBuffer[pixelIndex] = 0;
      } else {
        // Add randomness to create flickering effect
        const randomDecay = Math.floor(Math.random() * 3); // 0, 1, or 2
        const randomWind = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1

        const newIntensity = fireIntensity - randomDecay;
        const targetX = Math.max(0, Math.min(width - 1, x + randomWind));
        const targetIndex = getPixelIndex(targetX, y, width);

        newFireBuffer[targetIndex] = Math.max(0, newIntensity);
      }
    }
  }

  for (let x = 0; x < width; x++) {
    if (fireEnabled) {
      // Maintain fire source at bottom if fire is enabled
      newFireBuffer[getPixelIndex(x, height - 1, width)] = maxIntensity;
    } else {
      // extinguish the fire by killing the bottom source
      newFireBuffer[getPixelIndex(x, height - 1, width)] = Math.max(
        0,
        newFireBuffer[getPixelIndex(x, height - 1, width)] - Math.floor(Math.random() * 3),
      );
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

function initFire(width: number, height: number, maxIntensity: number = 36): number[] {
  const fireBuffer = Array(width * height).fill(0);

  // While fire is on, bottom row should be at maximum fire intensity
  for (let x = 0; x < width; x++) {
    fireBuffer[getPixelIndex(x, height - 1, width)] = maxIntensity;
  }
  return fireBuffer;
}

const defaultFireColors = ['#771f0700', '#771f07', '#DF4F07', '#cf770f', '#BF9F1F', '#B7B72F', '#ffffff'];

function usePrevious(value: number) {
  const ref = useRef<number>(undefined);

  useEffect(() => {
    ref.current = value; // Update the ref's current value after every render
  }, [value]); // Rerun this effect only when 'value' changes

  return ref.current; // Return the value from the previous render
}

export interface DoomFireProps {
  height?: number;
  width?: number;
  pixelSize?: number;
  fireColors?: string[];
  fireEnabled?: boolean;
  fireStrength?: number;
}

/**
 *
 * @param height {number} Height of canvas in pixels.
 * @param width {number} Width of canvas in pixels.
 * @param pixelSize {number} How big a pixel should be in the output. Larger means more pixelated.
 * @param fireColors {string[]} Array of CSS color values.
 * @param fireEnabled {boolean} If the fire is on.
 * @param fireStrength {number} Number between 0 and 1, represents the "strength" of the fire.
 * @constructor
 */
const DoomFire = ({
  height = 300,
  width = 400,
  pixelSize = 2,
  fireColors = defaultFireColors,
  fireEnabled = true,
  fireStrength = 0.75,
}: DoomFireProps) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const fireWidth = Math.ceil(width / pixelSize);
  const fireHeight = Math.ceil(height / pixelSize);

  const prevStrength = usePrevious(fireStrength);
  const prevFireWidth = usePrevious(fireWidth);
  const prevFireHeight = usePrevious(fireHeight);

  const fireBufferRef = useRef<number[]>(null);

  const flamePalette: RgbaColor[] = useMemo(() => {
    const fadedColors = fadeColors(fireColors ?? defaultFireColors, fireHeight * fireStrength);
    if (fireStrength !== prevStrength || prevFireWidth !== fireWidth || prevFireHeight !== fireHeight) {
      fireBufferRef.current = initFire(fireWidth, fireHeight, fadedColors.length - 1);
    }
    return fadedColors;
  }, [fireColors, fireWidth, fireHeight, fireStrength, prevStrength, prevFireWidth, prevFireHeight]);

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
  }, [fireWidth, fireHeight, flamePalette, fireEnabled]);

  return <canvas id="doomfire" width={`${width}px`} height={`${height}px`} ref={canvasRef} />;
};

export { DoomFire };
