import React, {useEffect, useRef, useState} from 'react';
import {motion} from "framer-motion";
import PropTypes from 'prop-types';

// Useful tool for editing and creating paths (for things like the eye shape)
// https://yqnn.github.io/svg-path-editor/

const simpleOpenedPath = 'M 0 4 C 3 7 7 7 10 4 C 7 1 3 1 0 4';
const simpleClosedPath = 'M 0 4 C 3 4 7 4 10 4 C 7 4 3 4 0 4';

/**
 * @Component
 * Component for an eye which follows the mouse.
 */
const Eye = ({
               animationTime = 0.75,
               open = true,
               openedClipPath = simpleOpenedPath,
               closedClipPath = simpleClosedPath,
               irisColor = '#333',
               eyeBallColor = 'white',
               pupilColor = 'black',
               pupilSize = 1,
               follow = true,
               pupilCoords = {cx: 5, cy: 4},
               width = 50,
             }) => {
  const pupilRef = useRef(null);
  const eyeContainerRef = useRef(null);
  const irisRef = useRef(null);
  const groupRef = useRef(null);
  const [eyeMaskId] = useState('eyemask_' + Math.random());

  useEffect(() => {
    if (follow === false) return;

    // based on https://buipalsulich.com/post/gopher-eyes/
    const onMouseMove = (evt) => {
      const pupil = pupilRef.current;
      const iris = irisRef.current;
      if (!pupil) return;

      let eyeBall = eyeContainerRef.current;

      let pupilR = pupil.r.baseVal.value;
      let eyeR = eyeBall.r.baseVal.value;
      let bound = eyeBall.getBoundingClientRect();

      let cx = bound.left + eyeR;
      let cy = bound.bottom - eyeR;
      let x = evt.clientX - cx;
      let y = evt.clientY - cy;
      let d = Math.sqrt(x*x + y*y);
      let theta = Math.atan2(y, x);
      let angle = theta*180/Math.PI + 360;

      let max = width * 5;
      if (d > max) d = max;
      let t = d / max * (eyeR - pupilR);

      pupil.style.transform = `translate(${t + "px"}) rotate(${angle + "deg"})`;
      pupil.style.transformOrigin = `${eyeBall.cx.baseVal.value - t +"px"} ${eyeBall.cy.baseVal.value +"px"}`;

      iris.style.transform = `translate(${t + "px"}) rotate(${angle + "deg"})`;
      iris.style.transformOrigin = `${eyeBall.cx.baseVal.value - t +"px"} ${eyeBall.cy.baseVal.value +"px"}`;
    };
    document.addEventListener('mousemove', onMouseMove);
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, [pupilRef, follow])

  const variants = {
    opened: () => {
      return {
        clipPath: `path('${openedClipPath}')`,
        transition: {
          clipPath: {
            duration: animationTime
          },
        },
      };
    },
    closed: () => {
      return {
        clipPath: `path('${closedClipPath}')`,
        transition: {
          clipPath: {
            duration: animationTime
          },
        },
      }
    },
  };

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 8" width={width}>
      <mask id={eyeMaskId}>
        <rect width="10" height="14" fill="black" />
        <path d={openedClipPath} fill={'white'}/>
      </mask>
      <motion.g
        variants={variants}
        initial={{clipPath: `path('${closedClipPath}')`}}
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
  )
};

Eye.propTypes = {
  animationTime: PropTypes.number,
  open: PropTypes.bool,
  openedClipPath: PropTypes.string,
  closedClipPath: PropTypes.string,
  irisColor: PropTypes.string,
  eyeBallColor: PropTypes.string,
  pupilColor: PropTypes.string,
  pupilSize: PropTypes.number,
  follow: PropTypes.bool,
  pupilCoords: PropTypes.shape({
    cx: PropTypes.number,
    cy: PropTypes.number,
  }),
  width: PropTypes.number,
};

export {Eye};
export default Eye;
