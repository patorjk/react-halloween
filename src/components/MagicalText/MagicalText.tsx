import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, type Easing } from 'motion/react';
import { type ResolvedValues } from 'motion';
import { MagicalTextSparkleAnimator, MagicalTextScaleAnimator } from './animators';
import { StarCrossSVG } from '../svgs';
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
  const fadeOffsetRef = useRef<number>(0);

  const colorsStr = colors.join('█');
  const rgbColors = useMemo(() => {
    const parsedColors = colorsStr.split('█');
    return parsedColors.map((color) => parseCSSColor(color)).concat(parseCSSColor(parsedColors[0]));
  }, [colorsStr]);
  const fadeReference = useMemo(() => multiColorFade(rgbColors, 200), [rgbColors]);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const backgroundSize = '200%';
  const completeColors = [...colors, colors[0]];
  const [adornmentKey, setAdornmentKey] = useState(`_akey${Math.random()}`);
  const AdornmentAnimator: React.ElementType =
    animationType === 'sparkle'
      ? MagicalTextSparkleAnimator
      : typeof animationType === 'object'
        ? animationType
        : MagicalTextScaleAnimator;

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
    (pos: number) => {
      const position = pos || 0;
      let offsetPos = Math.round(200 - fadeOffsetRef.current + position * 100);
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
    [colors, fadeReference],
  );

  const onUpdate = useCallback((param: ResolvedValues) => {
    if (typeof param.backgroundPosition !== 'string') return;
    const matches = param.backgroundPosition.match(/[0-9]+/);
    if (matches) {
      fadeOffsetRef.current = parseInt(matches[0], 10);
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
          onUpdate={animationType === 'sparkle' ? onUpdate : undefined}
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
