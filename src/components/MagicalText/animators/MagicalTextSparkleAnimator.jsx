import React, {useCallback, useMemo, useRef} from 'react';
import {motion} from 'framer-motion';
import useEvent from "../../../hooks/useEvent";
import { randomIntFromInterval } from '../../utils';
import StarCrossSVG from "../../svgs/StarCrossSVG";

const MagicalTextSparkleAnimator = ({
                                      Adornment = StarCrossSVG,
                                      container,
                                      colors,
                                      delay = 0,
                                      duration = 1,
                                      getColor = () => null,
                                      width = 16,
                                      height = 16,
                                    }) => {
  const starRef = useRef(null);
  const pathRef = useRef(null)

  const variants = {
    on: () => {
      return {
        rotate: [0, 180],
        scale: [0, 1, 0],
        opacity: 0.7,
        transition: {
          rotate: {
            repeat: Infinity,
            duration,
            ease: 'linear',
            delay,
          },
          scale: {
            animationFillMode: 'forwards',
            duration,
            repeat: Infinity,
            delay,
          }
        },
      };
    },
    off: () => {
      return {
      }
    },
  };

  const setPosition = useCallback(() => {
    if (container.current) {
      const rect = container.current.getBoundingClientRect();

      const halfWidth = width / 2;
      const halfHeight = height / 2;
      const leftStart = -halfWidth;
      const leftEnd = rect.width - halfWidth;
      const left = randomIntFromInterval(leftStart, leftEnd);
      const top = randomIntFromInterval(-halfHeight, rect.height - halfHeight);

      starRef.current.style.left = left + 'px';
      starRef.current.style.top = top + 'px';

      const color = getColor((left - leftStart)/(leftEnd - leftStart));
      if (pathRef.current) pathRef.current.style.fill = color;
    }
  }, [container, starRef, pathRef]);

  const setup = useEvent((variant) => {
    if (variant === 'on') {
      setPosition();
    }
  })

  const onUpdate = useEvent((latest) => {
    const {scale} = latest;
    if (scale === 0) {
      setPosition();
    }
  });

  return (
    <motion.div
      style={{
        position: 'absolute',
      }}
      ref={starRef}
      initial={{opacity: 0}}
      variants={variants}
      animate={'on'}
      exit={{opacity: 0, scale: 0, transition:{duration: 1}}}
      onAnimationStart={setup}
      onUpdate={onUpdate}
    >
      <Adornment
        pathRef={pathRef}
        width={width}
        height={height}
      />
    </motion.div>
  )
}
export {MagicalTextSparkleAnimator};
export default MagicalTextSparkleAnimator;
