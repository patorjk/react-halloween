import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, Easing } from 'framer-motion';
import { MagicalTextSparkleAnimator } from './animators';
import { StarCrossSVG } from '../svgs/StarCrossSVG';
import { MagicalTextScaleAnimator } from './animators';
import { multiColorFade, parseCSSColor } from '../utils';

const defaultColors = ['darkorange', 'purple'];

const defaultAdornmentOptions = {
  animationType: 'sparkle',
  width: 16,
  height: 16,
  opacity: 0.7,
  duration: 1.25,
  numberOf: 3,
};

export interface MagicalTextProps {
  text: string;
  animationTime?: number;
  colors?: string[];
  style?: React.CSSProperties;
  disableFun?: boolean;
  fadeText?: boolean;
  Adornment?: React.ElementType;
  showAdornments?: boolean;
  adornmentOptions?: {
    animationType?: string | React.ElementType;
  };
}

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
  showAdornments = true,
  Adornment = StarCrossSVG,
  adornmentOptions,
}: MagicalTextProps) {
  const {
    animationType,
    width: adornmentWidth,
    height: adornmentHeight,
    opacity: adornmentOpacity,
    duration: adornmentDuration,
    numberOf: numberOfAdornments,
  } = {
    ...defaultAdornmentOptions,
    ...adornmentOptions,
  };

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
  if (typeof animationType === 'string') {
    AdornmentAnimator = animationType === 'sparkle' ? MagicalTextSparkleAnimator : MagicalTextScaleAnimator;
  } else if (typeof animationType === 'object') {
    AdornmentAnimator = animationType;
  } else {
    throw new Error('Invalid value for animationType');
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
          ease: 'linear' as Easing,
          duration: animationTime,
        },
      },
    }),
    off: () => ({}),
  };

  const getColor = useCallback(
    (pos) => {
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
    },
    [colors, fadeOffset, fadeReference],
  );

  const onUpdate = useCallback((param) => {
    const matches = param.backgroundPosition.match(/[0-9]+/);
    if (matches) {
      const val = parseInt(matches[0], 10);
      setFadeOffset(val);
    }
  }, []);

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
          onUpdate={animationType === 'sparkle' ? onUpdate : null}
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

export { MagicalText };
