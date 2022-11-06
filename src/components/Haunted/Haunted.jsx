import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import { useEvent } from '../../hooks/useEvent';
import { GhostAnimator } from './GhostAnimator';

/**
 * @component
 */
const Haunted = ({
                   animationTime = 1.5,
                   disableFun = false,
                   distance = 200,
                   Ghost = null,
                   ghostDimensions = {width: 44, height: 44},
                   numberOfGhosts = 6,
                   style = {},
                   children,
                 }) => {
  const [mouseOver, setMouseOver] = useState(false);
  const container = useRef(null);
  const ghosts = useRef([]);

  const onMouseEnter = useEvent(() => {
    const rect = container.current.getBoundingClientRect();

    const newX = Math.round(rect.width / 2) - (ghostDimensions.width/2);
    const newY = Math.round(rect.height / 2) - (ghostDimensions.height/2);

    const rotationAmount = 360 / ghosts.current.length;
    let rotation = 0;
    ghosts.current.forEach(item => {
      rotation = rotation + rotationAmount;
      item.style.transform = `translateX(${newX}px) translateY(${newY}px) rotate(${Math.round(rotation)}deg)`;
    });

    setMouseOver(true);
  });
  const onMouseLeave = useEvent(() => {
    setMouseOver(false);
  });

  return (
    <div
      ref={container}
      style={{
        ...style,
        display: 'inline-block',
        position: 'relative',
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {disableFun === false &&
        <div style={{
          zIndex: 0,
          position: 'absolute',
        }}>
          {Array(numberOfGhosts).fill(0).map((val, index) => (
            <GhostAnimator
              key={index}
              index={index}
              container={container}
              ref={(el) => ghosts.current[index] = el}
              animationTimeMax={animationTime}
              mouseOver={mouseOver}
              distance={distance}
              Ghost={Ghost}
              ghostDimensions={ghostDimensions}
            />
          ))}
        </div>
      }
      <div style={{zIndex:1, position: 'relative'}}>{children}</div>
    </div>
  );
};

Haunted.propTypes = {
  // Length of animation
  animationTime: PropTypes.number,
  // Number of ghosts
  numberOfGhosts: PropTypes.number,
  // Distance a ghost travels in pixels
  distance: PropTypes.number,
  // Override for the ghost icon
  Ghost: PropTypes.any,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  // turn off halloween decorations
  disableFun: PropTypes.bool,
  // the size of the ghost
  ghostDimensions: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number
  }),
  style: PropTypes.object,
};

export { Haunted };
export default Haunted;
