import React, {useState} from "react";
import classes from "./partners.module.scss";
import PartnersComponent from "./partnersComponent/partnerComponent";


const Partners: React.FunctionComponent = () => {

  let sliderList = [
    <PartnersComponent src="assets/icons/logoNUWGP.png" />,
    <PartnersComponent src="assets/icons/logoSoftServe.png" />,
    <PartnersComponent src="assets/icons/logoRDGU.png" />,
    <PartnersComponent src="assets/icons/logoItCluster.png" />,
    <PartnersComponent src="assets/icons/ba.png" />,
    <PartnersComponent src="assets/icons/step.svg" />,
    <PartnersComponent src="assets/icons/logoNUWGP.png" />,
    <PartnersComponent src="assets/icons/logoSoftServe.png" />,
    <PartnersComponent src="assets/icons/logoRDGU.png" />,
  ];

  let arrow = <svg width="50" height="51" viewBox="0 0 50 51" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M44.2708 0.976562H5.72917C2.56875 0.976562 0 3.54531 0 6.70573L0 45.2474C0 48.4078 2.56875 50.9766 5.72917 50.9766H44.2708C47.4312 50.9766 50 48.4078 50 45.2474V6.70573C50 3.54531 47.4312 0.976562 44.2708 0.976562ZM31.25 34.8307C31.25 35.387 30.9542 35.9016 30.475 36.1807C30.2312 36.3224 29.9604 36.3932 29.6875 36.3932C29.4208 36.3932 29.1562 36.3266 28.9167 36.1891L13.2917 27.3349C12.8042 27.0599 12.5 26.5411 12.5 25.9766C12.5 25.412 12.8042 24.8932 13.2917 24.6182L28.9167 15.7641C29.4021 15.4891 29.9937 15.4953 30.475 15.7724C30.9542 16.0516 31.25 16.5661 31.25 17.1224V34.8307Z" fill="#AABACB" fillOpacity='1'/>
  </svg>;

  let slideWidth = (sliderList.length / 3) - 1;

  const [x, setX] = useState(0);

  const goLeft: React.MouseEventHandler = () => {
    x === 0 ? setX(-100 * slideWidth) : setX(x + 100);
    console.log(x);
  }

  const goRight: React.MouseEventHandler = () => {
    x === -100 * slideWidth ? setX(0) : setX(x - 100);
    console.log(x);
  }

  return (
      <div className={classes.blockPartners}>
        <h1>Наші партнери</h1>
        <div className={classes.wrapperSlider}>
          <div className={classes.slider} style={{transform: `translate( ${x}%)`}}>
            <div className={classes.inner}>
              {
                sliderList.map((item, index) => {
                  return (
                      <div key={index} className={classes.slide}>
                        {item}
                      </div>
                  );
                })
              }
            </div>
          </div>
          <button data-testid='buttonLeft' className={classes.left} onClick={goLeft}>
            {arrow}
          </button>
          <button data-testid='buttonRight' className={classes.right} onClick={goRight}>
            {arrow}
          </button>
        </div>
      </div>
  )
}

export default Partners;
