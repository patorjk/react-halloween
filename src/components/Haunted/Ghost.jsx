import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGhost } from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion/dist/framer-motion';
import { library } from '@fortawesome/fontawesome-svg-core';

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}

library.add(faGhost);

/**
 * @component
 */
const Ghost = React.forwardRef(({animationTimeMax, distance, container, mouseOver, GhostIcon = null, style = {}}, ref) => {
  const basicStyles = {
    ...style,
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
    opened: () => {
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
    closed: () => {
      const rect = container.current?.getBoundingClientRect() || {width: 0, height: 0};
      const initY = (Math.round(Math.min(rect.width, rect.height)) * -1) / 2;
      return {
        x: 0,
        y: initY + 'px',
        opacity: 0,
        transition: {
          duration: 0,
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

  const ghostIcon = GhostIcon ? GhostIcon : <FontAwesomeIcon icon="fa-solid fa-ghost" />;

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
        animate={mouseOver ? 'opened' : 'closed'}
      >{ghostIcon}</motion.div>
    </div>
  )
});

Ghost.propTypes = {
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
  // an override for the ghost icon
  GhostIcon: PropTypes.any,
};

export {Ghost};
export default Ghost;
