import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useEvent } from '../../hooks/useEvent';
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
  dimensions: { width: 44, height: 44 },
};

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
}) {
  const fullGlowOptions = {
    ...defaultGlowOptions,
    ...glowOptions,
  };
  const fullCreatureOptions = {
    ...defaultCreatureOptions,
    ...creatureOptions,
  };
  const [mouseOver, setMouseOver] = useState(false);
  const container = useRef(null);
  const creatureRefs = useRef([]);

  const onMouseEnter = useEvent(() => {
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
  });
  const onMouseLeave = useEvent(() => {
    setMouseOver(false);
  });

  const variants = {
    on: () => ({
      boxShadow: [fullGlowOptions.boxShadowOff, fullGlowOptions.boxShadowOn, fullGlowOptions.boxShadowOff],
      transition: {
        boxShadow: {
          repeat: Infinity,
          duration: fullGlowOptions?.animationTime || 0,
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
                  ref={(el) => (creatureRefs.current[index] = el)}
                  animationTimeMax={fullCreatureOptions.animationTime}
                  mouseOver={mouseOver}
                  distance={fullCreatureOptions.distance}
                  Creature={Creature}
                  dimensions={fullCreatureOptions.dimensions}
                />
              ))}
        </div>
      )}
      <div style={{ zIndex: 1, position: 'relative' }}>{children}</div>
    </motion.div>
  );
}

Haunted.propTypes = {
  glowOptions: PropTypes.shape({
    // glow animation time
    animationTime: PropTypes.number,
    // the box shadow at full glow
    boxShadowOn: PropTypes.string,
    // the box shadow when its off
    boxShadowOff: PropTypes.string,
  }),
  creatureOptions: PropTypes.shape({
    // distance the creature/ghost should travel
    distance: PropTypes.number,
    // number of creatures/ghosts
    numberOf: PropTypes.number,
    animationTime: PropTypes.number,
    // the size of the ghost svg
    dimensions: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
    }),
  }),
  // Override for the ghost icon
  Creature: PropTypes.any,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  // turn off halloween decorations
  disableFun: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
};

export { Haunted };
