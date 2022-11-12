import React, {useEffect, useMemo, useRef, useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import {MagicalTextSparkleAnimator} from './animators/MagicalTextSparkleAnimator';
import StarCrossSVG from "../svgs/StarCrossSVG";
import {MagicalTextScaleAnimator} from "./animators";
import useEvent from "../../hooks/useEvent";
import {multiColorFade, parseCSSColor} from "../utils";

/**
 * Inspiration:
 * https://linear.app/readme
 * https://www.youtube.com/watch?v=yu0Cm4BqQv0
 *
 */

const defaultColors = ['darkorange', 'purple'];

const MagicalText = ({
                       text,
                       animationTime = 10,
                       colors = defaultColors,
                       style = {},
                       disableFun = false,
                       adornmentType = 'sparkle',
                       Adornment = StarCrossSVG,
                       showAdornments = true,
                       adornmentWidth,
                       adornmentHeight,
                       adornmentOpacity,
                       adornmentDuration = 1,
                       numberOfAdornments = 3,
                     }) => {

  const rgbColors = useMemo(() => colors.map(color => parseCSSColor(color)), [colors]);
  const fadeReference = useMemo(() => multiColorFade(rgbColors, 200), [rgbColors]);
  const [fadeOffset, setFadeOffset] = useState(0);

  const containerRef = useRef(null);
  const backgroundSize = '200%';
  const completeColors = [...colors, colors[0]];
  const [adornmentKey, setAdornmentKey] = useState('_akey'+Math.random());
  let AdornmentAnimator = null;
  if (typeof adornmentType === 'string') {
    AdornmentAnimator = adornmentType === 'sparkle' ? MagicalTextSparkleAnimator : MagicalTextScaleAnimator;
  } else if (typeof adornmentType === 'object') {
    AdornmentAnimator = adornmentType;
  } else {
    throw new Error('Invalid value for adornmentType');
  }

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

  const getColor = useEvent((pos) => {
    let offsetPos = Math.round((200 - fadeOffset) + (pos * 100));
    if (offsetPos >= 200) {
      offsetPos = offsetPos - 200;
    }
    let color = fadeReference[offsetPos];
    return `rgb(${Math.round(color.r)},${Math.round(color.g)},${Math.round(color.b)})`;
  })

  const onUpdate = useEvent((param) => {
    let matches = param.backgroundPosition.match(/[0-9]+/);
    if (matches) {
      let val = parseInt(matches[0]);
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
      )
      :
        <motion.div
          style={divStyle}
          variants={variants}
          animate={'on'}
          onUpdate={adornmentType === 'sparkle' ? onUpdate : null}
        >{text}</motion.div>
      }

      <AnimatePresence>
        {!disableFun && showAdornments && Array(numberOfAdornments).fill(0).map((item, idx) => (
          <AdornmentAnimator
            Adornment={Adornment}
            key={`${adornmentKey}_${idx}`}
            getColor={getColor}
            duration={adornmentDuration}
            container={containerRef}
            colors={colors}
            delay={idx * (adornmentDuration/numberOfAdornments)}
            width={adornmentWidth}
            height={adornmentHeight}
            opacity={adornmentOpacity}
          />
        ))}
      </AnimatePresence>

    </div>
  );
};

export {MagicalText};
export default MagicalText;
