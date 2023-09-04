import React, { useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { randomIntFromInterval } from '../../utils';
import { GhostSVG } from '../../svgs/GhostSVG';

function MagicalTextScaleAnimator({
  Adornment = GhostSVG,
  container,
  delay = 0,
  duration = 1,
  opacity = 0.7,
  width = 16,
  height = 16,
}) {
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
      width={`${width}`}
      height={`${height}`}
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 512 512"
      style={{ position: 'absolute', pointerEvents: 'none' }}
      onUpdate={onUpdate}
      onAnimationStart={setup}
      xmlSpace="preserve"
    >
      <Adornment width={width} height={height} />
    </motion.div>
  );
}

MagicalTextScaleAnimator.propTypes = {
  Adornment: PropTypes.elementType,
  container: PropTypes.oneOfType([
    // Either a function
    PropTypes.func,
    // Or the instance of a DOM native element (see the note about SSR)
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  delay: PropTypes.number,
  duration: PropTypes.number,
  opacity: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
};

export { MagicalTextScaleAnimator };
export default MagicalTextScaleAnimator;
