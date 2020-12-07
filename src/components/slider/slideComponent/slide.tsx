import React from "react";

interface Props {
  src: any
}

const Slide: React.FunctionComponent<Props> = (props)  =>  {

  let imgStyles = {
    width: 300 + "px",
    height: "auto",
  }
    return ( <img src={props.src} alt='imgSlide' style={imgStyles}/>
  );
}

export default Slide;
