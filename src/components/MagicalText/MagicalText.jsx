import React, {useEffect, useRef, useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import {MagicalTextStarAnimator} from './animators/MagicalTextStarAnimator';

/**
 * Inspiration:
 * https://linear.app/readme
 * https://www.youtube.com/watch?v=yu0Cm4BqQv0
 *
 */

const defaultColors = ['darkorange', 'purple'];

const MagicalText = ({
                       text,
                       animationTime = 5,
                       colors = defaultColors,
                       style = {},
                       disableFun = false,
                       Adornment = MagicalTextStarAnimator,
                       showAdornments = true,
                       adornmentDuration = 1,
                       numberOfAdornments = 3,
                     }) => {

  const containerRef = useRef(null);
  const backgroundSize = '200%';
  const completeColors = [...colors, colors[0]];
  const [adornmentKey, setAdornmentKey] = useState('_akey'+Math.random());

  useEffect(() => {
    setAdornmentKey('_akey'+Math.random());
  }, [showAdornments]);

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
      {disableFun ? (
          <span>{text}</span>
      )
      :
        <motion.div
          style={divStyle}
          variants={variants}
          animate={'on'}
        >{text}</motion.div>
      }

      <AnimatePresence>
        {!disableFun && showAdornments && Array(numberOfAdornments).fill(0).map((item, idx) => (
          <Adornment
            key={`${adornmentKey}_${idx}`}
            colors={colors}
            duration={adornmentDuration}
            container={containerRef}
            delay={idx * (adornmentDuration/numberOfAdornments)}
          />
        ))}
      </AnimatePresence>

    </div>
  );
};

export {MagicalText};
export default MagicalText;
