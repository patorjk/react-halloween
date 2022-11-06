import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Ghost as GhostDefault } from './Ghost';

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 * @component
 */
const GhostAnimator = React.forwardRef(({
                                          animationTimeMax,
                                          distance,
                                          container,
                                          mouseOver,
                                          Creature = null,
                                          index = 0,
                                          dimensions,
                                        }, ref) => {
  const basicStyles = {
    position: 'absolute',
    transformOrigin: 'center',
    fontSize: '2em',
  };
  const [containerStyles, setContainerStyles] = useState(basicStyles);
  const animationTime = animationTimeMax === 0 ? 0 : randomNumber(animationTimeMax / 2, animationTimeMax);
  const waveAmount = randomIntFromInterval(5, 10);
  const waves = [`${waveAmount}px`, `-${waveAmount}px`];

  const waveKeyFrames = new Array(randomIntFromInterval(3,5)).fill(0).reduce((prev, current) => {
    return [
      ...prev,
      ...waves,
    ]
  }, []);

  const variants = {
    on: () => {
      const rect = container.current?.getBoundingClientRect() || {width: 0, height: 0};
      const initY = (Math.round(Math.min(rect.width, rect.height)) * -1) / 2;
      return {
        x: waveKeyFrames,
        y: (distance * -1) + initY,
        opacity: [0, 1, 0],
        transition: {
          x: {
            duration: animationTime
          },
          y: {
            duration: animationTime
          },
          opacity: {
            duration: animationTime,
          },
        },
      };
    },
    off: () => {
      const rect = container.current?.getBoundingClientRect() || {width: 0, height: 0};
      const initY = (Math.round(Math.min(rect.width, rect.height)) * -1) / 2;
      return {
        x: 0,
        y: initY + 'px',
        opacity: 0,
        transition: {
          duration: 0.3,
        },
      }
    },
  };

  /*
    Hide the div after the animation is done. This is to prevent scrollbars on any outer containers.
    As an aside, for some reason the x animation takes much longer than the others. I can't figure out
    what's going on with it.
   */
  useEffect(() => {
    if (mouseOver === true) {
      setContainerStyles({
        ...basicStyles,
        display: 'block',
      });

      const timer = setTimeout(() => {
        setContainerStyles({
          ...basicStyles,
          display: 'none',
        });
      }, animationTime * 1000);
      return () => {
        window.clearTimeout(timer);
      }
    }

  }, [mouseOver, setContainerStyles]);

  const GhostComponent = Creature ? Creature : GhostDefault;

  let initY = 0;
  if (container.current) {
    const rect = container.current?.getBoundingClientRect();
    initY = (Math.round(Math.min(rect.width, rect.height)) * -1) / 2;
  }

  return (
    <div
      ref={ref}
      style={containerStyles}
    >
      <motion.div
        initial={{ opacity: 0, x: 0, y: initY + 'px' }}
        variants={variants}
        animate={mouseOver ? 'on' : 'off'}
      ><GhostComponent dimensions={dimensions} index={index} /></motion.div>
    </div>
  )
});

GhostAnimator.propTypes = {
  // length of animation
  animationTimeMax: PropTypes.number,
  // distance to travel in pixels
  distance: PropTypes.number,
  // Ref to the container
  container: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]),
  // If true we run the animation
  mouseOver: PropTypes.bool,
  // an override for the ghost component/svg
  Creature: PropTypes.any,
  // size of the ghost
  dimensions: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
  })
};

export {GhostAnimator};
export default GhostAnimator;
