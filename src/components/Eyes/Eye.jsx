import React, {useEffect, useRef, useState} from 'react';
import {motion} from "framer-motion";
import useEvent from "../../hooks/useEvent";

const Eye = ({
               animationTime,
               open,
               openedClipPath,
               closedClipPath,
               irisColor,
               eyeBallColor,
               pupilColor,
               pupilSize,
               follow,
               width,
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
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" width={width}>
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
        <circle cx="5" cy="4.5" r="2" fill={eyeBallColor} ref={eyeContainerRef} />
        <circle cx="5" cy="4.5" r="2" fill={irisColor} ref={irisRef} />
        <circle cx="5" cy="4.5" r={pupilSize} fill={pupilColor} ref={pupilRef} />
      </motion.g>
    </svg>
  )
};

export {Eye};
export default Eye;
