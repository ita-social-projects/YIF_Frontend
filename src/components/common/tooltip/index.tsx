import React, { useState } from 'react';
import classes from './tooltip.module.scss';

interface Props {
  message: string;
  direction: string;
  content: string;
}


 const Tooltips: React.FC<Props> = (props) => {
   let timeout: any;
   const [ active, setActive ] = useState(false);

   const showTip = () => {
     timeout = setTimeout(() => {
       setActive(true);
     },  400);
   };
    const hideTip = () => {
      clearInterval(timeout);
      setActive(false);
    }

  return(
      <div className={classes.tooltipWrapper}
        onMouseEnter={ showTip }
        onMouseLeave = { hideTip }
        >
        {props.children}
        { active && (
            <div className={`Tooltip ${props.direction || 'top'}`}>

              {props.content}
            </div>
        )}
        </div>
  );
};

export default Tooltips;
