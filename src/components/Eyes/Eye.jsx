import React, {useEffect, useRef} from 'react';
import {motion} from "framer-motion";
import useEvent from "../../hooks/useEvent";

const Eye = ({animationTime, open, openedClipPath, closedClipPath, width}) => {
  const pupilRef = useRef(null);
  const eyeContainerRef = useRef(null);
  const irisRef = useRef(null);
  const groupRef = useRef(null);

  useEffect(() => {

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
  }, [pupilRef])

  const variants = {
    opened: () => {
      return {
        clipPath: openedClipPath,
        transition: {
          clipPath: {
            duration: animationTime
          },
        },
      };
    },
    closed: () => {
      return {
        clipPath: closedClipPath,
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
      <motion.g
        variants={variants}
        initial={{clipPath: closedClipPath}}
        animate={open ? 'opened' : 'closed'}
        ref={groupRef}
      >
        <rect width="10" height="14" fill="white" />
        <circle id="inner-eye" cx="5" cy="4.5" r="2" fill="white" ref={eyeContainerRef} />
        <circle id="inner-eye" cx="5" cy="4.5" r="2" fill="#333" ref={irisRef} />
        <circle id="inner-eye" cx="5" cy="4.5" r="1" fill="black" ref={pupilRef} />
      </motion.g>
    </svg>
  )
};

export {Eye};
export default Eye;
