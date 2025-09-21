import React, { useEffect, useMemo, useRef } from 'react';
import { fadeColors, type RGBAColor } from 'color-fader';

// Get pixel index in 1D array from x,y coordinates
function getPixelIndex(x: number, y: number, width: number) {
  return y * width + x;
}

function updateFire(
  fireBuffer: number[],
  width: number,
  height: number,
  maxIntensity: number,
  fireEnabled: boolean = true,
) {
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
        const randomDecay = Math.floor(Math.random() * 3);
        const randomWind = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1

        const newIntensity = fireIntensity - randomDecay;
        const targetX = Math.max(0, Math.min(width - 1, x + randomWind));
        const targetIndex = getPixelIndex(targetX, y, width);

        newFireBuffer[targetIndex] = Math.max(0, newIntensity);
      }
    }
  }

  // Maintain fire source at bottom if fire is enabled
  if (fireEnabled) {
    for (let x = 0; x < width; x++) {
      newFireBuffer[getPixelIndex(x, height - 1, width)] = maxIntensity;
    }
  }
  return newFireBuffer;
}

function renderFire(
  ctx: CanvasRenderingContext2D,
  fireBuffer: number[],
  firePalette: RGBAColor[],
  canvas: HTMLCanvasElement,
  fireWidth: number,
  fireHeight: number,
) {
  const imageData = ctx.createImageData(fireWidth, fireHeight);

  for (let y = 0; y < fireHeight; y++) {
    for (let x = 0; x < fireWidth; x++) {
      const pixelIndex = getPixelIndex(x, y, fireWidth);
      const fireIntensity = fireBuffer[pixelIndex];
      const color = firePalette[fireIntensity];

      const imageIndex = (y * fireWidth + x) * 4;
      imageData.data[imageIndex] = color.r; // Red
      imageData.data[imageIndex + 1] = color.g; // Green
      imageData.data[imageIndex + 2] = color.b; // Blue
      imageData.data[imageIndex + 3] = color.a * 255; // Alpha
    }
  }

  // Create temporary canvas for scaling
  const tempCanvas = document.createElement('canvas');
  const tempCtx = tempCanvas.getContext('2d');
  tempCanvas.width = fireWidth;
  tempCanvas.height = fireHeight;

  tempCtx.putImageData(imageData, 0, 0);

  // Scale up the image with pixelated rendering
  ctx.imageSmoothingEnabled = false;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(tempCanvas, 0, 0, canvas.width, canvas.height);
}

function initFire(width: number, height: number, maxIntensity: number = 36): number[] {
  const fireBuffer = Array(width * height).fill(0);

  // Set bottom row to maximum fire intensity
  for (let x = 0; x < width; x++) {
    fireBuffer[getPixelIndex(x, height - 1, width)] = maxIntensity;
  }
  return fireBuffer;
}

const fireColors = ['#771f0700', '#771f0700', '#771f07', '#DF4F07', '#cf770f', '#BF9F1F', '#B7B72F', '#ffffff'];

interface DoomFireProps {
  height?: number;
  width?: number;
  pixelSize?: number;
}

const DoomFire = ({ height = 300, width = 400, pixelSize = 2 }: DoomFireProps) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const fireWidth = Math.ceil(width / pixelSize);
  const fireHeight = Math.ceil(height / pixelSize);

  const flamePalette = useMemo(() => fadeColors(fireColors, fireHeight), [fireHeight]);

  const fireBufferRef = useRef(initFire(fireWidth, fireHeight, flamePalette.length - 1));

  useEffect(() => {
    let animationFrameId;

    const animate = () => {
      fireBufferRef.current = updateFire(fireBufferRef.current, fireWidth, fireHeight, flamePalette.length - 1);
      renderFire(
        canvasRef.current.getContext('2d'),
        fireBufferRef.current,
        flamePalette,
        canvasRef.current,
        fireWidth,
        fireHeight,
      );
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    // Cleanup function to cancel the animation
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [fireWidth, fireHeight, flamePalette]);

  return <canvas id="doomfire" width={`${width}px`} height={`${height}px`} ref={canvasRef} />;
};

export { DoomFire };
