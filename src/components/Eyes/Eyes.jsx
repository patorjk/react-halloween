import React from 'react';
import Eye from "./Eye";
import PropTypes from 'prop-types';

// design path with: https://yqnn.github.io/svg-path-editor/
const eyeVariants = [
  {
    leftOpened: 'M 0 4 C 3 6 6 7 10 4 C 6 3 3 3 0 4',
    leftClosed: 'M 0 4 C 4 4 7 4 10 4 C 7 4 4 4 0 4',
    rightOpened: 'M 0 4 C 4 7 7 6 10 4 C 7 3 4 3 0 4',
    rightClosed: 'M 0 4 C 4 4 7 4 10 4 C 7 4 4 4 0 4',
  },
  {
    leftOpened: 'M 0 4 C 3 7 6 7 10 4 C 6 3 3 2 0 4',
    leftClosed: 'M 0 4 C 4 4 7 4 10 4 C 7 4 4 4 0 4',
    rightOpened: 'M 0 4 C 4 7 7 7 10 4 C 7 2 4 3 0 4',
    rightClosed: 'M 0 4 C 4 4 7 4 10 4 C 7 4 4 4 0 4',
  }
]

const Eyes = ({
                open = true,
                variant = 0,
                animationTime = 0.75,
                width = 200,
                irisColor = '#333',
                eyeBallColor = 'white',
                pupilColor = 'black',
                style = {},
                pupilSize = 1,
                follow = true,
              }) => {

  if (typeof pupilSize !== 'number') throw new Error('pupilSize must be a number');
  if (pupilSize < 0 || pupilSize > 2) throw new Error('pupilSize must be between 0 and 2');

  let eyeVariant;
  if (typeof variant === 'number') {
    eyeVariant = eyeVariants[variant];
  } else {
    eyeVariant = variant;
  }

  const {
    leftOpened,
    leftClosed,
    rightOpened,
    rightClosed
  } = eyeVariant;

  const containerStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    width: `${width}px`,
    ...style,
  };

  return (
    <div
      style={containerStyles}
    >
      <Eye
        open={open}
        width={width/10 * 4.5}
        animationTime={animationTime}
        openedClipPath={leftOpened}
        closedClipPath={leftClosed}
        irisColor={irisColor}
        eyeBallColor={eyeBallColor}
        pupilColor={pupilColor}
        pupilSize={pupilSize}
        follow={follow}
      />
      <Eye
        open={open}
        width={width/10 * 4.5}
        animationTime={animationTime}
        openedClipPath={rightOpened}
        closedClipPath={rightClosed}
        irisColor={irisColor}
        eyeBallColor={eyeBallColor}
        pupilColor={pupilColor}
        pupilSize={pupilSize}
        follow={follow}
      />
    </div>
  );
}

Eyes.propTypes = {
  // if the eyes are open or closed
  open: PropTypes.bool,
  // The shape of the eye. There are numbers that represent various varients, or a custom object can be passed in
  variant: PropTypes.oneOf([
    PropTypes.number,
    PropTypes.shape({
      leftOpened: PropTypes.string,
      leftClosed: PropTypes.string,
      rightOpened: PropTypes.string,
      rightClosed: PropTypes.string,
    })
  ]),
  // time of the open/close animation in seconds
  animationTime: PropTypes.number,
  // CSS string for iris color
  irisColor: PropTypes.string,
  // CSS string for eyeball color
  eyeBallColor: PropTypes.string,
  // CSS string for pupil color
  pupilColor: PropTypes.string,
  // object styles to spread onto container
  style: PropTypes.object,
  // size of pupil - between 0 and 2
  pupilSize: PropTypes.number,
  // if the eyes should follow the cursor or not
  follow: PropTypes.bool,
}

export {Eyes};
export default Eyes;
