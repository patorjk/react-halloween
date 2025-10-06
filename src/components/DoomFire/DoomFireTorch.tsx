import React, { useEffect, useMemo, useRef, useState } from 'react';
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
 * @param fireDecay
 * @param fireEnabled {boolean} Toggling on/off leads to a mini animation.
 * @param mousePos {{ x: number; y: number } | null} Mouse position in fire coordinates
 * @param fireRadius {number} Size of the fire source
 * @param burningPixels
 * @oaram burningPixels {Set<string>}
 */
function updateFire(
  fireBuffer: number[] | null,
  width: number,
  height: number,
  maxIntensity: number,
  fireDecay: number,
  fireEnabled: boolean = true,
  mousePos: { x: number; y: number } | null = null,
  fireRadius: number,
  burningPixels: Set<string>,
) {
  if (!fireBuffer) return [];

  const newFireBuffer = Array.from(fireBuffer);

  /**
   * We do averages here because without taking average the fire will
   * drift slightly to the left. This is because pixels are processed
   * left-to-right and each pixel writes to a target position.
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

      const randomDecay = Math.floor(Math.random() * fireDecay);
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

  // Bottom row
  for (let i = height - 1; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const index = getPixelIndex(j, i, width);
      newFireBuffer[index] = 0;
    }
  }

  // Ensure burning pixels stay burning
  for (const pixel of burningPixels) {
    const [x, y] = pixel.split(',').map(Number);
    const index = getPixelIndex(x, y, width);
    newFireBuffer[index] = maxIntensity;
  }

  // Fire source follows mouse - ensure the fire remains strong around it
  // Point of this section is to create a fire source that emanates from the mouse position
  if (fireEnabled && mousePos) {
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
            const randomVariation = 0.5 + Math.random() * 0.5;
            const intensity = maxIntensity * falloff * randomVariation;

            const index = getPixelIndex(x, y, width);
            // blend with existing fire
            newFireBuffer[index] = Math.max(newFireBuffer[index], Math.floor(intensity));
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
      if (!color) continue;

      const imageIndex = (y * fireWidth + x) * 4;
      imageData.data[imageIndex] = color.r;
      imageData.data[imageIndex + 1] = color.g;
      imageData.data[imageIndex + 2] = color.b;
      imageData.data[imageIndex + 3] = color.a * 255;
    }
  }

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
  return Array(width * height).fill(0);
}

const defaultFireColors = ['#771f0700', '#771f07', '#DF4F07', '#cf770f', '#BF9F1F', '#B7B72F', '#ffffff'];

function usePrevious(value: number) {
  const ref = useRef<number>(undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

export interface DoomFireTorchProps {
  height?: number;
  width?: number;
  pixelSize?: number;
  fireColors?: string[];
  fireEnabled?: boolean;
  fireStrength?: number;
  fireRadius?: number;
  flammable?: Set<string>;
  fireDecay?: number;
}

/**
 *
 * @param height {number} Height of canvas in pixels.
 * @param width {number} Width of canvas in pixels.
 * @param pixelSize {number} How big a pixel should be in the output. Larger means more pixelated.
 * @param fireColors {string[]} Array of CSS color values.
 * @param fireEnabled {boolean} If the fire is on.
 * @param fireStrength {number} Number between 0 and 1, represents the "strength" of the fire.
 * @param fireRadius {number} Radius of fire.
 * @param flammable {String<string>} Pixels that can catch fire.
 * @param fireDecay {number} How fast the fire decays
 * @constructor
 */
const DoomFireTorch = ({
  height = 300,
  width = 400,
  pixelSize = 2,
  fireColors = defaultFireColors,
  fireEnabled = true,
  fireStrength = 0.75,
  fireRadius = 7,
  flammable = new Set(),
  fireDecay = 3,
}: DoomFireTorchProps) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

  const fireWidth = Math.ceil(width / pixelSize);
  const fireHeight = Math.ceil(height / pixelSize);

  const prevStrength = usePrevious(fireStrength);
  const prevFireWidth = usePrevious(fireWidth);
  const prevFireHeight = usePrevious(fireHeight);

  const fireBufferRef = useRef<number[]>(null);
  const burningPixelsRef = useRef<Set<string>>(new Set());

  const flamePalette: RgbaColor[] = useMemo(() => {
    const fadedColors = fadeColors(fireColors ?? defaultFireColors, fireHeight * fireStrength);
    if (fireStrength !== prevStrength || prevFireWidth !== fireWidth || prevFireHeight !== fireHeight) {
      fireBufferRef.current = initFire(fireWidth, fireHeight, fadedColors.length - 1);
    }
    return fadedColors;
  }, [fireColors, fireWidth, fireHeight, fireStrength, prevStrength, prevFireWidth, prevFireHeight]);

  // Handle mouse/touch movement
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateMousePosition = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      const x = Math.floor((clientX - rect.left) / pixelSize);
      const y = Math.floor((clientY - rect.top) / pixelSize);

      const pixelSets = [
        `${x},${y}`,
        `${x - 1},${y}`,
        `${x},${y - 1}`,
        `${x + 1},${y}`,
        `${x},${y + 1}`,
        `${x - 1},${y - 1}`,
        `${x + 1},${y + 1}`,
        `${x - 1},${y + 1}`,
        `${x + 1},${y - 1}`,
      ];

      pixelSets.forEach((pixelSet) => {
        if (flammable.has(pixelSet)) {
          burningPixelsRef.current.add(pixelSet);
        }
      });

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
  }, [pixelSize]);

  /**
   * This effect governs the animation.
   */
  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      if (!fireBufferRef.current) return;

      fireBufferRef.current = updateFire(
        fireBufferRef.current,
        fireWidth,
        fireHeight,
        flamePalette.length - 1,
        fireDecay,
        fireEnabled,
        mousePos,
        fireRadius,
        burningPixelsRef.current,
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
  }, [fireWidth, fireHeight, flamePalette, fireEnabled, mousePos, fireRadius, fireDecay]);

  return (
    <canvas
      id="doomfire"
      width={`${width}px`}
      height={`${height}px`}
      ref={canvasRef}
      style={{ touchAction: 'none', cursor: 'none' }}
    />
  );
};

export { DoomFireTorch };
