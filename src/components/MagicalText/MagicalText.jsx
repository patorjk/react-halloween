import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { MagicalTextSparkleAnimator } from './animators/MagicalTextSparkleAnimator';
import { StarCrossSVG } from '../svgs/StarCrossSVG';
import { MagicalTextScaleAnimator } from './animators';
import { useEvent } from '../../hooks/useEvent';
import { multiColorFade, parseCSSColor } from '../utils';

const defaultColors = ['darkorange', 'purple'];

/**
 * @component
 * This is a component that displays text in a faded fashion with optional adornments (such as sparkles or hearts).
 *
 * Inspiration:
 * https://patorjk.com/text-color-fader - Initial goal
 * https://www.youtube.com/watch?v=yu0Cm4BqQv0 - Idea for the sparkles and movement of the color fade
 * https://linear.app/readme - What inspired the above youtube video
 *
 */
function MagicalText({
  text,
  animationTime = 10,
  colors = defaultColors,
  style = {},
  disableFun = false,
  fadeText = true,
  adornmentType = 'sparkle',
  Adornment = StarCrossSVG,
  showAdornments = true,
  adornmentWidth = 16,
  adornmentHeight = 16,
  adornmentOpacity = 0.7,
  adornmentDuration = 1,
  numberOfAdornments = 3,
}) {
  const rgbColors = useMemo(
    () => colors.map((color) => parseCSSColor(color)).concat(parseCSSColor(colors[0])),
    [colors],
  );
  const fadeReference = useMemo(() => multiColorFade(rgbColors, 200), [rgbColors]);
  const [fadeOffset, setFadeOffset] = useState(0);

  const containerRef = useRef(null);
  const backgroundSize = '200%';
  const completeColors = [...colors, colors[0]];
  const [adornmentKey, setAdornmentKey] = useState(`_akey${Math.random()}`);
  let AdornmentAnimator = null;
  if (typeof adornmentType === 'string') {
    AdornmentAnimator = adornmentType === 'sparkle' ? MagicalTextSparkleAnimator : MagicalTextScaleAnimator;
  } else if (typeof adornmentType === 'object') {
    AdornmentAnimator = adornmentType;
  } else {
    throw new Error('Invalid value for adornmentType');
  }

  useEffect(() => {
    setAdornmentKey(`_akey${Math.random()}`);
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
        },
      },
    }),
    off: () => ({}),
  };

  const getColor = useEvent((pos) => {
    const position = pos || 0;
    let offsetPos = Math.round(200 - fadeOffset + position * 100);
    if (offsetPos >= 200) {
      offsetPos -= 200;
    }
    const color = fadeReference[offsetPos];
    if (color) {
      return `rgb(${Math.round(color.r)},${Math.round(color.g)},${Math.round(color.b)})`;
    }
    // if color not found, use first color
    return colors[0];
  });

  const onUpdate = useEvent((param) => {
    const matches = param.backgroundPosition.match(/[0-9]+/);
    if (matches) {
      const val = parseInt(matches[0], 10);
      setFadeOffset(val);
    }
  });

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
      ) : (
        <motion.div
          style={fadeText ? divStyle : {}}
          variants={variants}
          animate={fadeText ? 'on' : 'off'}
          onUpdate={adornmentType === 'sparkle' ? onUpdate : null}
        >
          {text}
        </motion.div>
      )}

      <AnimatePresence>
        {!disableFun &&
          showAdornments &&
          Array(numberOfAdornments)
            .fill(0)
            .map((item, idx) => (
              <AdornmentAnimator
                Adornment={Adornment}
                key={`${adornmentKey}_${idx}`}
                getColor={getColor}
                duration={adornmentDuration}
                container={containerRef}
                colors={colors}
                delay={idx * (adornmentDuration / numberOfAdornments)}
                width={adornmentWidth}
                height={adornmentHeight}
                opacity={adornmentOpacity}
              />
            ))}
      </AnimatePresence>
    </div>
  );
}

MagicalText.propTypes = {
  // the text to display
  text: PropTypes.string,
  // duration for the fading of the text
  animationTime: PropTypes.number,
  colors: PropTypes.arrayOf(PropTypes.string),
  // CSS styles to spread onto the containing div
  style: PropTypes.object,
  // true to disable the effect
  disableFun: PropTypes.bool,
  adornmentType: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
  // component to use as the adornment
  Adornment: PropTypes.elementType,
  // boolean variable that governs if the adornments should be shown
  showAdornments: PropTypes.bool,
  adornmentWidth: PropTypes.number,
  adornmentHeight: PropTypes.number,
  adornmentOpacity: PropTypes.number,
  adornmentDuration: PropTypes.number,
  numberOfAdornments: PropTypes.number,
  fadeText: PropTypes.bool,
};

export { MagicalText };
export default MagicalText;
