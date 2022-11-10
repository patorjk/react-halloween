import React, {useRef} from 'react';
import {motion} from 'framer-motion';
import {MagicStar} from './MagicStar';

/**
 * Inspiration:
 * https://linear.app/readme
 * https://www.youtube.com/watch?v=yu0Cm4BqQv0
 *
 */

const defaultColors = ['purple', 'violet'];

const MagicalText = ({text, animationTime = 5, colors = defaultColors, style = {}}) => {

  const containerRef = useRef(null);
  const backgroundSize = '200%';
  const completeColors = [...colors, colors[0]];

  const divStyle = {
    display: 'inline-block',
    background: `linear-gradient(to right, ${completeColors.join(',')})`,
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundSize,
  };

  const variants = {
    on: () => ({
      backgroundPosition: ['0% center', `-${backgroundSize} center`],
      transition: {
        backgroundPosition: {
          repeat: Infinity,
          ease: 'linear',
          duration: animationTime,
        }
      }
    }),
    off: () => ({

    })
  };

  return (
    <div
      ref={containerRef}
      style={{
        display: 'inline-block',
        position: 'relative',
        ...style,
      }}
    >
      <motion.div
        style={divStyle}
        variants={variants}
        animate={'on'}
      >{text}</motion.div>
      <MagicStar
        colors={colors}
        container={containerRef}
      />
      <MagicStar
        colors={colors}
        container={containerRef}
        delay={0.3334}
      />
      <MagicStar
        colors={colors}
        container={containerRef}
        delay={0.6667}
      />
    </div>
  );
};

export {MagicalText};
export default MagicalText;
