import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { GhostSVG as GhostDefault } from '../svgs/GhostSVG';
import { randomIntFromInterval, randomNumber } from '../utils';

export interface GhostAnimatorProps {
  animationTimeMax: number;
  distance: number;
  container: React.RefObject<HTMLDivElement>;
  mouseOver: boolean;
  Creature?: React.ElementType;
  index: number;
  dimensions: {
    width: number;
    height: number;
  };
}

/**
 * @component
 */
const GhostAnimator = React.forwardRef(
  (
    { animationTimeMax, distance, container, mouseOver, Creature = null, index = 0, dimensions }: GhostAnimatorProps,
    ref: React.RefObject<HTMLDivElement>,
  ) => {
    const basicStyles: Record<string, string> = useMemo(
      () => ({
        position: 'absolute',
        transformOrigin: 'center',
        fontSize: '2em',
      }),
      [],
    );
    const [containerStyles, setContainerStyles] = useState(basicStyles);
    // eslint-disable-next-line max-len
    const animationTime = animationTimeMax === 0 ? 0 : randomNumber(animationTimeMax / 2, animationTimeMax);
    const waveAmount = randomIntFromInterval(5, 10);
    const waves = [`${waveAmount}px`, `-${waveAmount}px`];

    const waveKeyFrames = new Array(randomIntFromInterval(3, 5)).fill(0).reduce((prev) => [...prev, ...waves], []);

    const variants = {
      on: () => {
        const rect = container.current?.getBoundingClientRect() || {
          width: 0,
          height: 0,
        };
        const initY = (Math.round(Math.min(rect.width, rect.height)) * -1) / 2;
        return {
          x: waveKeyFrames,
          y: distance * -1 + initY,
          opacity: [0, 1, 0],
          transition: {
            x: {
              duration: animationTime,
            },
            y: {
              duration: animationTime,
            },
            opacity: {
              duration: animationTime,
            },
          },
        };
      },
      off: () => {
        const rect = container.current?.getBoundingClientRect() || {
          width: 0,
          height: 0,
        };
        const initY = (Math.round(Math.min(rect.width, rect.height)) * -1) / 2;
        return {
          x: 0,
          y: `${initY}px`,
          opacity: 0,
          transition: {
            duration: 0.3,
          },
        };
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
        };
      }
      return undefined;
    }, [mouseOver, setContainerStyles, animationTime, basicStyles]);

    const GhostComponent = Creature || GhostDefault;

    let initY = 0;
    if (container.current) {
      const rect = container.current?.getBoundingClientRect();
      initY = (Math.round(Math.min(rect.width, rect.height)) * -1) / 2;
    }

    return (
      <div ref={ref} style={containerStyles}>
        <motion.div
          initial={{ opacity: 0, x: 0, y: `${initY}px` }}
          variants={variants}
          animate={mouseOver ? 'on' : 'off'}
        >
          <GhostComponent width={dimensions.width} height={dimensions.height} index={index} />
        </motion.div>
      </div>
    );
  },
);

export { GhostAnimator };
