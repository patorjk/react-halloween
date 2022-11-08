import {motion} from 'framer-motion';
import Eye from "./Eye";

/*
  const leftOpenedClipPath = "path('M 0 2 C 3 4 6 5 10 2 C 6 1 3 1 0 2')";
  const leftClosedClipPath = "path('M 0 2 C 3 2 6 2 10 2 C 6 2 3 2 0 2')";

  const rightOpenedClipPath = "path('M 0 2 C 4 5 7 4 10 2 C 7 1 4 1 0 2')";
  const rightClosedClipPath = "path('M 0 2 C 3 2 6 2 10 2 C 6 2 3 2 0 2')";
 */

const Eyes = ({open, animationTime = 0.75, width = 400, style = {}}) => {
  const leftOpenedClipPath = "path('M 0 4 C 3 6 6 7 10 4 C 6 3 3 3 0 4')";
  const leftClosedClipPath = "path('M 0 4 C 4 4 7 4 10 4 C 7 4 4 4 0 4')";

  const rightOpenedClipPath = "path('M 0 4 C 4 7 7 6 10 4 C 7 3 4 3 0 4')";
  const rightClosedClipPath = "path('M 0 4 C 4 4 7 4 10 4 C 7 4 4 4 0 4')";


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
        openedClipPath={leftOpenedClipPath}
        closedClipPath={leftClosedClipPath}
      />
      <Eye
        open={open}
        width={width/10 * 4.5}
        animationTime={animationTime}
        openedClipPath={rightOpenedClipPath}
        closedClipPath={rightClosedClipPath}
      />
    </div>
  );
}

export {Eyes};
export default Eyes;
