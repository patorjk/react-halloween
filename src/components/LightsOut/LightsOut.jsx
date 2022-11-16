import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

function LightsOut({ size = 300, darkColor = 'rgba(0,0,0,0.9)' }) {
  const svgRef = useRef(null);
  const northRef = useRef(null);
  const eastRef = useRef(null);
  const southRef = useRef(null);
  const westRef = useRef(null);

  const [gradientUrl] = useState(`gradientUrl_${Math.random()}`);
  const [lightStyle] = useState({
    position: 'fixed',
    zIndex: 10000,
    left: -size,
    top: -size,
    pointerEvents: 'none',
  });

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
    const onMouseMove = (evt) => {
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
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [halfSize]);

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
