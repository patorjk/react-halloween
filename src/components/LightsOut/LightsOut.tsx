import React, { CSSProperties, useCallback, useEffect, useRef } from 'react';
import { SpotLight } from './SpotLight';

export interface LightsOutProps {
  size: number;
  darkColor: string;
  clickToTurnOnLights: boolean;
  zIndex: number;
}

function LightsOut({
  size = 300,
  darkColor = 'rgba(0,0,0,0.9)',
  clickToTurnOnLights = true,
  zIndex = 100000,
}: LightsOutProps) {
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const northRef = useRef(null);
  const eastRef = useRef(null);
  const southRef = useRef(null);
  const westRef = useRef(null);
  const lightsOn = useRef(false);

  const darkStyle: CSSProperties = {
    position: 'fixed',
    backgroundColor: darkColor,
    zIndex,
  };
  const halfSize = size / 2;

  const setPositions = useCallback(
    (clientX = 0, clientY = 0) => {
      const pageWidth = document.documentElement.scrollWidth;
      const pageHeight = document.documentElement.scrollHeight;

      northRef.current.style.top = 0;
      northRef.current.style.left = 0;
      northRef.current.style.width = `${pageWidth}px`;
      northRef.current.style.height = `${Math.max(0, clientY - halfSize)}px`;

      southRef.current.style.top = `${clientY + halfSize}px`;
      southRef.current.style.left = 0;
      southRef.current.style.width = `${pageWidth}px`;
      southRef.current.style.height = `${Math.max(0, pageHeight - (clientY + halfSize))}px`;

      westRef.current.style.top = `${clientY - halfSize}px`;
      westRef.current.style.left = 0;
      westRef.current.style.width = `${Math.max(0, clientX - halfSize)}px`;
      westRef.current.style.height = `${size}px`;

      eastRef.current.style.left = `${clientX + halfSize}px`;
      eastRef.current.style.top = `${clientY - halfSize}px`;
      eastRef.current.style.width = `${Math.max(0, pageWidth - (clientX + halfSize))}px`;
      eastRef.current.style.height = `${size}px`;

      svgRef.current.style.left = `${clientX - halfSize}px`;
      svgRef.current.style.top = `${clientY - halfSize}px`;
    },
    [northRef, southRef, westRef, eastRef, svgRef, halfSize, size],
  );

  useEffect(() => {
    setPositions();
  }, [setPositions]);

  // eslint-disable-next-line consistent-return
  const turnLightsOn = useCallback(
    (evt) => {
      const cx = evt.clientX;
      const cy = evt.clientY;

      if (lightsOn.current === true) return false;
      lightsOn.current = true;

      const pageWidth = document.documentElement.scrollWidth;
      const pageHeight = document.documentElement.scrollHeight;

      let northHeight = cy - halfSize;

      let westWidth = cx - halfSize;

      let eastLeft = cx + halfSize;
      let eastWidth = pageWidth - (cx + halfSize);

      let southTop = cy + halfSize;
      let southHeight = pageHeight - (cy + halfSize);

      let svgTop = cy - halfSize;
      let svgLeft = cx - halfSize;
      let svgWidth = size;
      let svgHeight = size;

      // disable pointer-events
      svgRef.current.style.pointerEvents = 'none';
      northRef.current.style.pointerEvents = 'none';
      eastRef.current.style.pointerEvents = 'none';
      southRef.current.style.oppointerEventsacity = 'none';
      westRef.current.style.pointerEvents = 'none';

      let count = 0;
      const countMax = 200;
      const opacityBreakPoint = 100;
      const moveSize = 12;

      const timer = setInterval(() => {
        northHeight -= moveSize;
        westWidth -= moveSize;
        eastLeft += moveSize;
        eastWidth -= moveSize;

        southTop += moveSize;
        southHeight -= moveSize;

        svgTop -= moveSize;
        svgLeft -= moveSize;
        svgWidth += moveSize * 2;
        svgHeight += moveSize * 2;

        count += 1;

        try {
          if (count < opacityBreakPoint) {
            northRef.current.style.height = `${Math.max(0, northHeight)}px`;

            eastRef.current.style.top = `${svgTop}px`;
            eastRef.current.style.height = `${svgHeight}px`;
            eastRef.current.style.left = `${eastLeft}px`;
            eastRef.current.style.width = `${Math.max(0, eastWidth)}px`;

            westRef.current.style.top = `${svgTop}px`;
            westRef.current.style.height = `${svgHeight}px`;
            westRef.current.style.width = `${Math.max(0, westWidth)}px`;

            southRef.current.style.top = `${southTop}px`;
            southRef.current.style.height = `${Math.max(0, southHeight)}px`;

            svgRef.current.style.top = `${svgTop}px`;
            svgRef.current.style.left = `${svgLeft}px`;
            svgRef.current.style.width = `${svgWidth}px`;
            svgRef.current.style.height = `${svgHeight}px`;
          } else {
            const opacity = 1 - (count - opacityBreakPoint) / (countMax - opacityBreakPoint);
            svgRef.current.style.opacity = opacity;
            northRef.current.style.opacity = opacity;
            eastRef.current.style.opacity = opacity;
            southRef.current.style.opacity = opacity;
            westRef.current.style.opacity = opacity;
          }
        } catch (err) {
          clearInterval(timer);
        }

        if (count >= countMax) {
          clearInterval(timer);
        }
      }, 10);

      return null;
    },
    [halfSize, size],
  );

  useEffect(() => {
    if (lightsOn.current) return;
    const onMouseMove = (evt) => {
      if (lightsOn.current) return;
      setPositions(evt.clientX, evt.clientY);
    };
    const onKeyDown = (evt) => {
      if (lightsOn.current) return;
      if (evt.key === 'Escape') {
        const clientX = document.documentElement.clientWidth / 2;
        const clientY = document.documentElement.clientHeight / 2;
        turnLightsOn({ clientX, clientY });
      }
    };

    window.addEventListener('mousemove', onMouseMove, true);
    if (clickToTurnOnLights) {
      window.addEventListener('keydown', onKeyDown, true);
    }
    // eslint-disable-next-line consistent-return
    return () => {
      window.removeEventListener('mousemove', onMouseMove, true);
      if (clickToTurnOnLights) {
        window.removeEventListener('keydown', onKeyDown, true);
      }
    };
  }, [halfSize, lightsOn, turnLightsOn, clickToTurnOnLights, setPositions]);

  return (
    <div ref={containerRef}>
      <div ref={northRef} style={darkStyle} />
      <div ref={eastRef} style={darkStyle} />
      <div ref={southRef} style={darkStyle} />
      <div ref={westRef} style={darkStyle} />
      <SpotLight
        ref={svgRef}
        size={size}
        zIndex={zIndex}
        darkColor={darkColor}
        onClick={clickToTurnOnLights ? turnLightsOn : null}
      />
    </div>
  );
}

export { LightsOut };
