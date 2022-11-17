import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useEvent } from '../../hooks/useEvent';

function LightsOut({ size = 300, darkColor = 'rgba(0,0,0,0.9)' }) {
  const svgRef = useRef(null);
  const northRef = useRef(null);
  const eastRef = useRef(null);
  const southRef = useRef(null);
  const westRef = useRef(null);
  const lightsOn = useRef(false);

  const [gradientUrl] = useState(`gradientUrl_${Math.random()}`);
  const [lightStyle] = useState({
    position: 'fixed',
    zIndex: 10000,
    left: -size,
    top: -size,
    // pointerEvents: 'none',
    cursor: 'pointer',
  });

  //      'url(\'data:image/svg+xml;utf8,\') 24 24 auto',

  const [darkStyle] = useState({
    position: 'fixed',
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    backgroundColor: darkColor,
  });
  const darkNorthStyle = {
    ...darkStyle,
    width: `${document.documentElement.scrollWidth}px`,
    height: `${document.documentElement.scrollHeight}px`,
  };

  const halfSize = size / 2;

  useEffect(() => {
    if (lightsOn.current) return;
    const onMouseMove = (evt) => {
      if (lightsOn.current) return;

      const pageWidth = document.documentElement.scrollWidth;
      const pageHeight = document.documentElement.scrollHeight;

      northRef.current.style.top = 0;
      northRef.current.style.left = 0;
      northRef.current.style.width = `${pageWidth}px`;
      northRef.current.style.height = `${Math.max(0, evt.clientY - halfSize)}px`;

      southRef.current.style.top = `${evt.clientY + halfSize}px`;
      southRef.current.style.left = 0;
      southRef.current.style.width = `${pageWidth}px`;
      southRef.current.style.height = `${Math.max(0, pageHeight - (evt.clientY + halfSize))}px`;

      westRef.current.style.top = `${evt.clientY - halfSize}px`;
      westRef.current.style.left = 0;
      westRef.current.style.width = `${Math.max(0, evt.clientX - halfSize)}px`;
      westRef.current.style.height = `${size}px`;

      eastRef.current.style.left = `${evt.clientX + halfSize}px`;
      eastRef.current.style.top = `${evt.clientY - halfSize}px`;
      eastRef.current.style.width = `${Math.max(0, pageWidth - (evt.clientX + halfSize))}px`;
      eastRef.current.style.height = `${size}px`;

      svgRef.current.style.left = `${evt.clientX - halfSize}px`;
      svgRef.current.style.top = `${evt.clientY - halfSize}px`;
    };
    window.addEventListener('mousemove', onMouseMove);
    // eslint-disable-next-line consistent-return
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [halfSize, lightsOn]);

  // eslint-disable-next-line consistent-return
  const turnLightsOn = useEvent((evt) => {
    if (lightsOn.current === true) return false;
    lightsOn.current = true;

    const pageWidth = document.documentElement.scrollWidth;
    const pageHeight = document.documentElement.scrollHeight;

    let northHeight = evt.clientY - halfSize;

    let westWidth = evt.clientX - halfSize;

    let eastLeft = evt.clientX + halfSize;
    let eastWidth = pageWidth - (evt.clientX + halfSize);

    let southTop = evt.clientY + halfSize;
    let southHeight = pageHeight - (evt.clientY + halfSize);

    let svgTop = evt.clientY - halfSize;
    let svgLeft = evt.clientX - halfSize;
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
  });

  return (
    <>
      <div ref={northRef} style={darkNorthStyle} />
      <div ref={eastRef} style={darkStyle} />
      <div ref={southRef} style={darkStyle} />
      <div ref={westRef} style={darkStyle} />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 100 100"
        version="1.1"
        style={lightStyle}
        ref={svgRef}
        width={size}
        height={size}
        onClick={turnLightsOn}
      >
        <defs>
          <radialGradient id={gradientUrl}>
            <stop stopColor="transparent" offset="0%" />
            <stop stopColor={`${darkColor}`} offset="100%" />
          </radialGradient>
        </defs>

        <rect
          id="r1"
          x="0"
          y="0"
          width="100"
          height="100"
          stroke="black"
          strokeWidth="0"
          fill={`url('#${gradientUrl}')`}
        />
      </svg>
    </>
  );
}

LightsOut.propTypes = {
  size: PropTypes.number,
  darkColor: PropTypes.string,
};

/*
TODO:
- Light goes on (circle expands)
- Light goes out on no movement
 */

export { LightsOut };
