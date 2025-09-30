import React, { type CSSProperties, useCallback, useRef, useState } from 'react';
import { type Easing, motion } from 'motion/react';
import { GhostAnimator } from './GhostAnimator';

const defaultGlowOptions = {
  animationTime: 3,
  boxShadowOff: '0px 0px 0px rgba(255,0,0,0)',
  boxShadowOn: '0px 0px 40px rgba(255,0,0,1)',
};
const defaultCreatureOptions = {
  animationTime: 1.5,
  numberOf: 6,
  distance: 200,
  repeat: true,
  dimensions: { width: 44, height: 44 },
};

export interface HauntedProps {
  glowOptions?: {
    animationTime?: number;
    boxShadowOff?: string;
    boxShadowOn?: string;
  };
  creatureOptions?: {
    distance?: number;
    numberOf?: number;
    animationTime?: number;
    repeat?: boolean;
    dimensions?: {
      width: number;
      height: number;
    };
  };
  disableFun?: boolean;
  Creature?: React.ElementType | null;
  style?: CSSProperties;
  children?: React.ReactNode;
}

/**
 * @component
 */
function Haunted({
  glowOptions = defaultGlowOptions,
  creatureOptions = defaultCreatureOptions,
  disableFun = false,
  Creature = null,
  style = {},
  children,
}: HauntedProps) {
  const fullGlowOptions = {
    ...defaultGlowOptions,
    ...glowOptions,
  };
  const fullCreatureOptions = {
    ...defaultCreatureOptions,
    ...creatureOptions,
  };
  const [mouseOver, setMouseOver] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const creatureRefs = useRef<HTMLElement[]>([]);

  const onMouseEnter = useCallback(() => {
    if (!container.current) return;

    const rect = container.current.getBoundingClientRect();

    const halfCreatureWidth = (fullCreatureOptions?.dimensions?.width || 0) / 2;
    const halfCreatureHeight = (fullCreatureOptions?.dimensions?.height || 0) / 2;

    const newX = Math.round(rect.width / 2) - halfCreatureWidth;
    const newY = Math.round(rect.height / 2) - halfCreatureHeight;

    const rotationAmount = 360 / creatureRefs.current.length;
    let rotation = 0;
    creatureRefs.current.forEach((item) => {
      rotation += rotationAmount;
      // eslint-disable-next-line no-param-reassign
      item.style.transform = `translateX(${newX}px) translateY(${newY}px) rotate(${Math.round(rotation)}deg)`;
    });

    setMouseOver(true);
  }, [fullCreatureOptions?.dimensions?.width, fullCreatureOptions?.dimensions?.height]);
  const onMouseLeave = useCallback(() => {
    setMouseOver(false);
  }, []);

  const variants = {
    on: () => ({
      boxShadow: [fullGlowOptions.boxShadowOff, fullGlowOptions.boxShadowOn, fullGlowOptions.boxShadowOff],
      transition: {
        boxShadow: {
          repeat: Infinity,
          duration: fullGlowOptions?.animationTime || 0,
          ease: 'easeInOut' as Easing,
        },
      },
    }),
    off: () => ({
      boxShadow: fullGlowOptions.boxShadowOff,
      transition: {
        boxShadow: {
          duration: fullGlowOptions?.animationTime || 0,
        },
      },
    }),
  };

  return (
    <motion.div
      variants={variants}
      animate={glowOptions && disableFun === false ? (mouseOver ? 'on' : 'off') : ''}
      ref={container}
      style={{
        ...style,
        display: 'inline-block',
        position: 'relative',
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {disableFun === false && (
        <div
          style={{
            zIndex: 0,
            position: 'absolute',
          }}
        >
          {creatureOptions &&
            Array(fullCreatureOptions.numberOf)
              .fill(0)
              .map((val, index) => (
                <GhostAnimator
                  key={index}
                  index={index}
                  container={container}
                  ref={(el: HTMLDivElement) => {
                    creatureRefs.current[index] = el;
                  }}
                  animationTimeMax={fullCreatureOptions.animationTime}
                  mouseOver={mouseOver}
                  distance={fullCreatureOptions.distance}
                  Creature={Creature}
                  dimensions={fullCreatureOptions.dimensions}
                  repeat={fullCreatureOptions.repeat}
                />
              ))}
        </div>
      )}
      <div style={{ zIndex: 1, position: 'relative' }}>{children}</div>
    </motion.div>
  );
}

export { Haunted };
