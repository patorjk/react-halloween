import React, { useCallback, useRef, useState } from 'react';
import { motion, Easing } from 'framer-motion';
import { randomIntFromInterval } from '../../utils';
import { StarCrossSVG } from '../../svgs/StarCrossSVG';

const defaultGetColor = () => null;

export interface MagicalTextSparkleAnimatorProps {
  Adornment?: React.ElementType;
  container?: React.RefObject<HTMLElement>;
  delay?: number;
  duration?: number;
  getColor?: (pos: number) => string;
  width?: number;
  height?: number;
}

function MagicalTextSparkleAnimator({
  Adornment = StarCrossSVG,
  container,
  delay = 0,
  duration = 1,
  getColor = defaultGetColor,
  width = 16,
  height = 16,
}: MagicalTextSparkleAnimatorProps) {
  const starRef = useRef(null);
  const pathRef = useRef(null);
  const [leftPos, setLeftPos] = useState(0);
  const [leftMax, setLeftMax] = useState(0);
  const [leftMin, setLeftMin] = useState(0);

  const variants = {
    on: () => ({
      rotate: [0, 180],
      scale: [0, 1, 0],
      opacity: 0.7,
      transition: {
        rotate: {
          repeat: Infinity,
          duration,
          ease: 'linear' as Easing,
          delay,
        },
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
    if (container.current) {
      const rect = container.current.getBoundingClientRect();

      const halfWidth = width / 2;
      const halfHeight = height / 2;
      const leftStart = -halfWidth;
      const leftEnd = rect.width - halfWidth;
      const left = randomIntFromInterval(leftStart, leftEnd);
      const top = randomIntFromInterval(-halfHeight, rect.height - halfHeight);

      starRef.current.style.left = `${left}px`;
      starRef.current.style.top = `${top}px`;

      setLeftPos(left);
      setLeftMin(leftStart);
      setLeftMax(leftEnd);
    }
  }, [container, starRef, width, height]);

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
      const color = getColor((leftPos - leftMin) / (leftMax - leftMin));

      if (pathRef.current) pathRef.current.style.fill = color;
      if (scale < 0.01) {
        setPosition();
      }
    },
    [setPosition, getColor, leftMax, leftMin, leftPos],
  );

  return (
    <motion.div
      style={{
        position: 'absolute',
      }}
      ref={starRef}
      initial={{ opacity: 0 }}
      variants={variants}
      animate="on"
      exit={{ opacity: 0, scale: 0, transition: { duration: 1 } }}
      onAnimationStart={setup}
      onUpdate={onUpdate}
    >
      <Adornment pathRef={pathRef} width={width} height={height} />
    </motion.div>
  );
}

export { MagicalTextSparkleAnimator };
