import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useEvent } from '../../hooks/useEvent';

// eslint-disable-next-line react/prop-types
const SpotLight = React.forwardRef(({ size, onClick, darkColor, getContainer }, ref) => {
  const [lightStyle] = useState({
    position: 'fixed',
    zIndex: 10000,
    pointerEvents: onClick ? 'auto' : 'none',
    cursor: 'pointer',
  });
  const [gradientUrl] = useState(`gradientUrl_${Math.random()}`);
  const [spotLightState, setSpotLightState] = useState('off'); // on, off, lightsOn
  const mouseMoveTimer = useRef(null);

  const onMouseMove = useEvent(() => {
    if (spotLightState === 'lightsOn') return;
    setSpotLightState('on');
    window.clearTimeout(mouseMoveTimer.current);
    mouseMoveTimer.current = setTimeout(() => {
      if (spotLightState === 'lightsOn') return;
      setSpotLightState('off');
    }, 3000);
  });

  useEffect(() => {
    getContainer().addEventListener('mousemove', onMouseMove, true);
    return () => {
      getContainer().removeEventListener('mousemove', onMouseMove, true);
    };
  }, [onMouseMove, getContainer]);

  const onSvgClick = useEvent((evt) => {
    if (spotLightState === 'lightsOn') return;
    setSpotLightState('lightsOn');
    onClick(evt);
  });

  const variants = {
    lightsOn: () => ({
      stopColor: 'rgba(0,0,0,0)', // transparent
      transition: {
        duration: 0.1,
      },
    }),
    on: () => ({
      stopColor: 'rgba(0,0,0,0)', // transparent
      transition: {
        duration: 1,
      },
    }),
    off: () => ({
      stopColor: darkColor,
      transition: {
        duration: 1,
      },
    }),
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 100 100"
      version="1.1"
      style={lightStyle}
      ref={ref}
      width={size}
      height={size}
      onClick={onClick ? onSvgClick : null}
    >
      <defs>
        <radialGradient id={gradientUrl}>
          <motion.stop variants={variants} animate={spotLightState} initial={{ stopColor: darkColor }} offset="0%" />
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
  );
});

export { SpotLight };
