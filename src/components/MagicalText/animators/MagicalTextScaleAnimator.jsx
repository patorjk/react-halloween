import React, {useCallback, useMemo, useRef} from 'react';
import useEvent from "../../../hooks/useEvent";
import { randomIntFromInterval } from '../../utils';
import {GhostSVG} from '../../svgs/GhostSVG';
import {motion} from 'framer-motion';

const MagicalTextScaleAnimator = ({
                                    Adornment = GhostSVG,
                                    container,
                                    delay = 0,
                                    duration = 1,
                                    opacity = 0.7,
                                    width = 16,
                                    height = 16,
                                  }) => {
  const ghostRef = useRef(null);

  const variants = {
    on: () => {
      return {
        scale: [0, 1, 0],
        opacity,
        transition: {
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
    if (container?.current) {
      const rect = container.current.getBoundingClientRect();

      const halfWidth = width / 2;
      const halfHeight = height / 2;

      ghostRef.current.style.left = randomIntFromInterval(-halfWidth, rect.width - halfWidth) + 'px';
      ghostRef.current.style.top = randomIntFromInterval(-halfHeight, rect.height - halfHeight) + 'px';
    }
  }, [ghostRef, container]);

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
      ref={ghostRef}
      variants={variants}
      initial={{opacity: 0}}
      exit={{opacity: 0, scale: 0, transition:{duration: 1}}}
      animate={'on'}
      width={`${width}`}
      height={`${height}`}
      version="1.1" id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px" y="0px"
      viewBox="0 0 512 512"
      style={{position:'absolute', pointerEvents: 'none'}}
      onUpdate={onUpdate}
      onAnimationStart={setup}
      xmlSpace="preserve"
    >
    <Adornment
      width={width}
      height={height}
    />
    </motion.div>
  )
}
export {MagicalTextScaleAnimator};
export default MagicalTextScaleAnimator;
