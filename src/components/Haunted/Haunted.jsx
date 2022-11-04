import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import { useEvent } from '../../hooks/useEvent';
import { Ghost } from './Ghost';

/**
 * @component
 */
const Haunted = ({ animationTime = 1.5, distance = 200, GhostIcon = null, ghostAmount = 6, ghostStyle = {}, children }) => {
  const [mouseOver, setMouseOver] = useState(false);
  const container = useRef(null);
  const ghosts = useRef([]);

  const onMouseEnter = useEvent(() => {
    const rect = container.current.getBoundingClientRect();

    const newX = Math.round(rect.width / 2);
    const newY = Math.round(rect.height / 2);

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
        display: 'inline-block',
        position: 'relative',
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div style={{
        zIndex: 0,
        position: 'absolute',
      }}>
        {Array(ghostAmount).fill(0).map((val, index) => (
          <Ghost
            key={index}
            container={container}
            ref={(el) => ghosts.current[index] = el}
            animationTimeMax={animationTime}
            mouseOver={mouseOver}
            distance={distance}
            style={ghostStyle}
            GhostIcon={GhostIcon}
          />
        ))}
      </div>
      <div style={{zIndex:1, position: 'relative'}}>{children}</div>
    </div>
  );
};

Haunted.propTypes = {
  // Length of animation
  animationTime: PropTypes.number,
  // Number of ghosts
  ghostAmount: PropTypes.number,
  // Distance a ghost travels in pixels
  distance: PropTypes.number,
  // styling to apply to ghost
  ghostStyle: PropTypes.object,
  // Override for the ghost icon
  GhostIcon: PropTypes.any,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export { Haunted };
export default Haunted;
