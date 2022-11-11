import React, {useCallback, useMemo, useRef} from 'react';
import {motion} from 'framer-motion';
import useEvent from "../../../hooks/useEvent";
import { randomIntFromInterval } from '../../utils';

const MagicalTextStarAnimator = ({container, colors, delay = 0, duration = 1, width = 16, height = 16}) => {
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

      starRef.current.style.left = randomIntFromInterval(-halfWidth, rect.width - halfWidth) + 'px';
      starRef.current.style.top = randomIntFromInterval(-halfHeight, rect.height - halfHeight) + 'px';

      pathRef.current.style.fill = colors[randomIntFromInterval(0,colors.length - 1)];
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
    <motion.svg
      style={{
        position: 'absolute',
      }}
      ref={starRef}
      initial={{opacity: 0}}
      variants={variants}
      animate={'on'}
      exit={{opacity: 0, scale: 0, transition:{duration: 1}}}
      width={width}
      height={height}
      viewBox="0 0 16 16"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsSvg="http://www.w3.org/2000/svg"
      onAnimationStart={setup}
      onUpdate={onUpdate}
    >
      <g
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <path
          ref={pathRef}
          d="M 9.601,6.4 8,0 6.398,6.4 0,8 6.398,9.601 8,16 9.601,9.601 16,8 Z"
          fill={colors[0]}
        />
      </g>
    </motion.svg>
  )
}
export {MagicalTextStarAnimator};
export default MagicalTextStarAnimator;
