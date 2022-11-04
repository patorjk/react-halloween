import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSkull } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faSkull);

const SkullIcon = () => {
  return (
    <FontAwesomeIcon icon="fa-solid fa-skull" />
  )
}

export {SkullIcon};
export default SkullIcon;
