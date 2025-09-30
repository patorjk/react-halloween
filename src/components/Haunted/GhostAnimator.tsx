import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { motion, useAnimation, type Easing } from 'motion/react';
import { GhostSVG as GhostDefault } from '../svgs/GhostSVG';
import { randomIntFromInterval, randomNumber } from '../utils';

export interface GhostAnimatorProps {
  animationTimeMax: number;
  distance: number;
  container: React.RefObject<HTMLDivElement | null>;
  mouseOver: boolean;
  Creature?: React.ElementType | null;
  index: number;
  repeat: boolean;
  dimensions: {
    width: number;
    height: number;
  };
  ref: React.Ref<HTMLDivElement>;
}

/**
 * @component
 */
const GhostAnimator = ({
  animationTimeMax,
  distance,
  container,
  mouseOver,
  Creature = null,
  index = 0,
  repeat = true,
  dimensions,
  ref,
}: GhostAnimatorProps) => {
  const basicStyles: Record<string, string> = useMemo(
    () => ({
      position: 'absolute',
      transformOrigin: 'center',
      fontSize: '2em',
      pointerEvents: 'none',
    }),
    [],
  );
  const [canPlayAnimation, setCanPlayAnimation] = useState<boolean>(true);
  const [containerStyles, setContainerStyles] = useState(basicStyles);
  const controls = useAnimation();
  const [animationStarted, setAnimationStarted] = useState(false);

  const animationTime = animationTimeMax === 0 ? 0 : randomNumber(animationTimeMax / 2, animationTimeMax);

  const waveKeyFrames = useMemo(() => {
    const waveAmount = randomIntFromInterval(5, 10);
    const waves = [`${waveAmount}px`, `-${waveAmount}px`];
    return new Array(randomIntFromInterval(3, 5)).fill(0).reduce((prev) => [...prev, ...waves], []);
  }, []);

  // Calculate initial Y position
  const getInitY = useCallback(() => {
    const rect = container.current?.getBoundingClientRect() || {
      width: 0,
      height: 0,
    };
    return (Math.round(Math.min(rect.width, rect.height)) * -1) / 2;
  }, [container]);

  // Define full animation sequence with proper fade-out timing
  const getAnimationSequence = useCallback(() => {
    const initY = getInitY();
    const endY = distance * -1 + initY;

    // Calculate key points in the animation sequence
    // The ghost should be fully visible in the middle of the journey
    // and completely faded out at the end
    return {
      x: waveKeyFrames,
      y: [initY, endY],
      opacity: [0, 1, 0], // Start invisible, become visible, end invisible
      transition: {
        x: {
          duration: animationTime,
        },
        y: {
          duration: animationTime,
          // Using easier-out timing to make the ghost move faster initially
          // and slower as it approaches the edge
          ease: 'easeOut' as Easing,
        },
        opacity: {
          duration: animationTime,
          // Custom times for opacity to ensure ghost is visible during most of the animation
          // but completely faded out at the end
          times: [0, 0.3, 1],
        },
      },
    };
  }, [getInitY, waveKeyFrames, animationTime, distance]);

  const getOffVariant = useCallback(() => {
    const initY = getInitY();
    return {
      x: 0,
      y: `${initY}px`,
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    };
  }, [getInitY]);

  /*
    Handle animation start/stop and container visibility
    */
  useEffect(() => {
    if (mouseOver === true && !animationStarted && canPlayAnimation === true) {
      // don't allow future repeats of animation
      setCanPlayAnimation(repeat);

      // Show the container
      setContainerStyles({
        ...basicStyles,
        display: 'block',
      });

      // Start animation and mark it as started
      controls.start(getAnimationSequence());
      setAnimationStarted(true);

      // Hide the container after animation completes
      const timer = setTimeout(() => {
        setContainerStyles({
          ...basicStyles,
          display: 'none',
        });
        setAnimationStarted(false);
      }, animationTime * 1000);

      return () => {
        window.clearTimeout(timer);
      };
    }
    if (!mouseOver && !animationStarted) {
      // Only reset to off state if animation hasn't started
      controls.start(getOffVariant());
    }
    return undefined;
  }, [
    mouseOver,
    canPlayAnimation,
    animationStarted,
    controls,
    animationTime,
    basicStyles,
    getAnimationSequence,
    getOffVariant,
    repeat,
  ]);

  useEffect(() => {
    if (!mouseOver) {
      setCanPlayAnimation(true);
    }
  }, [mouseOver]);

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
        animate={controls}
        onAnimationComplete={() => {
          if (animationStarted) {
            // Animation is complete, reset the flag and ensure ghost is hidden
            setAnimationStarted(false);
            controls.set({ opacity: 0 }); // Ensure ghost is completely invisible
          }
        }}
      >
        <GhostComponent width={dimensions.width} height={dimensions.height} index={index} />
      </motion.div>
    </div>
  );
};

export { GhostAnimator };
