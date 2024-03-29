import React from "react";

interface Props {
  src: string;
}

const PartnerComponent: React.FunctionComponent<Props> = (props)  =>  {

  let imgStyles = {
    height: "auto",
    padding: 10 +'px',
  }
    return ( <img src={props.src} alt='imgSlide' style={imgStyles} />
  );
}

export default PartnerComponent;
