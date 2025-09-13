import React, { useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { randomIntFromInterval } from '../../utils';
import { GhostSVG } from '../../svgs/GhostSVG';

export interface MagicalTextScaleAnimatorProps {
  Adornment?: React.ElementType;
  container?: React.RefObject<HTMLElement>;
  delay?: number;
  duration?: number;
  opacity?: number;
  width?: number;
  height?: number;
}

function MagicalTextScaleAnimator({
  Adornment = GhostSVG,
  container,
  delay = 0,
  duration = 1,
  opacity = 0.7,
  width = 16,
  height = 16,
}: MagicalTextScaleAnimatorProps) {
  const ghostRef = useRef(null);

  const variants = {
    on: () => ({
      scale: [0, 1, 0],
      opacity,
      transition: {
        scale: {
          animationFillMode: 'forwards',
          duration,
          repeat: Infinity,
          delay,
        },
      },
    }),
    off: () => ({}),
  };

  const setPosition = useCallback(() => {
    if (container?.current) {
      const rect = container.current.getBoundingClientRect();

      const halfWidth = width / 2;
      const halfHeight = height / 2;

      ghostRef.current.style.left = `${randomIntFromInterval(-halfWidth, rect.width - halfWidth)}px`;
      ghostRef.current.style.top = `${randomIntFromInterval(-halfHeight, rect.height - halfHeight)}px`;
    }
  }, [ghostRef, container, width, height]);

  const setup = useCallback(
    (variant) => {
      if (variant === 'on') {
        setPosition();
      }
    },
    [setPosition],
  );

  const onUpdate = useCallback(
    (latest) => {
      const { scale } = latest;
      if (scale === 0) {
        setPosition();
      }
    },
    [setPosition],
  );

  return (
    <motion.div
      ref={ghostRef}
      variants={variants}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0, scale: 0, transition: { duration: 1 } }}
      animate="on"
      style={{ position: 'absolute', pointerEvents: 'none', width: `${width}px`, height: `${height}px` }}
      onUpdate={onUpdate}
      onAnimationStart={setup}
    >
      <Adornment width={width} height={height} />
    </motion.div>
  );
}

export { MagicalTextScaleAnimator };
