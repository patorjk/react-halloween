import React, {useMemo, useRef} from 'react';
import {motion} from 'framer-motion';
import useEvent from "../../hooks/useEvent";
import { randomIntFromInterval } from '../utils';

const MagicStar = ({container, colors, delay = 0, duration = 1, width = 16, height = 16}) => {
  const starRef = useRef(null);
  const pathRef = useRef(null)

  const variants = {
    on: () => {
      return {
        rotate: [0, 180],
        scale: [0, 1, 0],
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

  const onUpdate = useEvent((latest) => {
    const {scale} = latest;
    if (scale === 0 && container.current) {
      const rect = container.current.getBoundingClientRect();

      const halfWidth = width / 2;
      const halfHeight = height / 2;

      starRef.current.style.left = randomIntFromInterval(-halfWidth, rect.width - halfWidth) + 'px';
      starRef.current.style.top = randomIntFromInterval(-halfHeight, rect.height - halfHeight) + 'px';

      pathRef.current.style.fill = colors[randomIntFromInterval(0,colors.length - 1)];

    }
  });

  return (
    <motion.svg
      style={{
        position: 'absolute',
        opacity: 0.5,
      }}
      ref={starRef}
      variants={variants}
      animate={'on'}
      width={width}
      height={height}
      viewBox="0 0 16 16"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsSvg="http://www.w3.org/2000/svg"
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
export {MagicStar};
export default MagicStar;
