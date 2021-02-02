import React, { useState } from 'react';
import classes from './tooltip.module.scss';
import {useAuth} from "../../../services/tokenValidator";

interface Props {
  content: string;
}

 const Tooltips: React.FC<Props> = (props) => {

   const { token } = useAuth();
   const [ active, setActive ] = useState(false);

   const showTip = () => {
     if (!token) setActive(true);

   };
    const hideTip = () => {
      setActive(false);
    }

  return(
      <div className={classes.tooltipWrapper}
        onMouseEnter={ showTip }
        onMouseLeave = { hideTip }
        >
        {props.children}
        { active && (
            <div className={classes.tooltip}>

              {props.content}
            </div>
        )}
        </div>
  );
};

export default Tooltips;
