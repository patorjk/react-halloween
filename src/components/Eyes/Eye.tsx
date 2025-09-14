import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

// Useful tool for editing and creating paths (for things like the eye shape)
// https://yqnn.github.io/svg-path-editor/

const simpleOpenedPath = 'M 0 4 C 3 7 7 7 10 4 C 7 1 3 1 0 4';
const simpleClosedPath = 'M 0 4 C 3 4 7 4 10 4 C 7 4 3 4 0 4';

export interface EyeProps {
  animationTime?: number;
  open?: boolean;
  openedClipPath?: string;
  closedClipPath?: string;
  irisColor?: string;
  eyeBallColor?: string;
  pupilColor?: string;
  pupilSize?: number;
  follow?: boolean;
  pupilCoords?: { cx: number; cy: number };
  width?: number;
}

/**
 * @Component
 * Component for an eye which follows the mouse.
 */
function Eye({
  animationTime = 0.75,
  open = true,
  openedClipPath = simpleOpenedPath,
  closedClipPath = simpleClosedPath,
  irisColor = '#333',
  eyeBallColor = 'white',
  pupilColor = 'black',
  pupilSize = 1,
  follow = true,
  pupilCoords = { cx: 5, cy: 4 },
  width = 50,
}: EyeProps) {
  const pupilRef = useRef(null);
  const eyeContainerRef = useRef(null);
  const irisRef = useRef(null);
  const groupRef = useRef(null);
  const [eyeMaskId] = useState(`eyemask_${Math.random()}`);

  useEffect(() => {
    if (follow === false) return undefined;

    // based on https://buipalsulich.com/post/gopher-eyes/
    const onMouseMove = (evt) => {
      const pupil = pupilRef.current;
      const iris = irisRef.current;
      if (!pupil) return;

      const eyeBall = eyeContainerRef.current;

      const pupilR = pupil.r.baseVal.value;
      const eyeR = eyeBall.r.baseVal.value;
      const bound = eyeBall.getBoundingClientRect();

      const cx = bound.left + eyeR;
      const cy = bound.bottom - eyeR;
      const x = evt.clientX - cx;
      const y = evt.clientY - cy;
      let d = Math.sqrt(x * x + y * y);
      const theta = Math.atan2(y, x);
      const angle = (theta * 180) / Math.PI + 360;

      const max = width * 5;
      if (d > max) d = max;
      const t = (d / max) * (eyeR - pupilR);

      pupil.style.transform = `translate(${`${t}px`}) rotate(${`${angle}deg`})`;
      pupil.style.transformOrigin = `${`${eyeBall.cx.baseVal.value - t}px`} ${`${eyeBall.cy.baseVal.value}px`}`;

      iris.style.transform = `translate(${`${t}px`}) rotate(${`${angle}deg`})`;
      iris.style.transformOrigin = `${`${eyeBall.cx.baseVal.value - t}px`} ${`${eyeBall.cy.baseVal.value}px`}`;
    };
    document.addEventListener('mousemove', onMouseMove);
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, [pupilRef, follow, width]);

  const variants = {
    opened: () => ({
      clipPath: `path('${openedClipPath}')`,
      transition: {
        clipPath: {
          duration: animationTime,
        },
      },
    }),
    closed: () => ({
      clipPath: `path('${closedClipPath}')`,
      transition: {
        clipPath: {
          duration: animationTime,
        },
      },
    }),
  };

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 8" width={width}>
      <mask id={eyeMaskId}>
        <rect width="10" height="14" fill="black" />
        <path d={openedClipPath} fill="white" />
      </mask>
      <motion.g
        variants={variants}
        initial={{ clipPath: `path('${closedClipPath}')` }}
        animate={open ? 'opened' : 'closed'}
        ref={groupRef}
        mask={`url(#${eyeMaskId})`}
      >
        <rect width="10" height="14" fill={eyeBallColor} />
        <circle cx={pupilCoords.cx} cy={pupilCoords.cy} r="2" fill={eyeBallColor} ref={eyeContainerRef} />
        <circle cx={pupilCoords.cx} cy={pupilCoords.cy} r="2" fill={irisColor} ref={irisRef} />
        <circle cx={pupilCoords.cx} cy={pupilCoords.cy} r={pupilSize} fill={pupilColor} ref={pupilRef} />
      </motion.g>
    </svg>
  );
}

export { Eye };
