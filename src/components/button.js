import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { config, library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
const  Button = (props) => {  
config.autoAddCss = false;
library.add(fas, fab); 
return(
<button class={ props.classcss}  >
   <FontAwesomeIcon icon={[props.libicon, props.iconbutton]} />
   <span classcss="text-center">{props.name}
   </span>
</button>
)
}
export default Button