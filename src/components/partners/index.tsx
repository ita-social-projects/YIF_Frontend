import React, {useState} from "react";
import classes from "./partners.module.scss";
import PartnersComponent from "./partnersComponent/partnerComponent";


const Partners: React.FunctionComponent = () => {

  let sliderList = [
    <PartnersComponent src="assets/icons/logoItCluster.png" />,
    <PartnersComponent src="assets/icons/logoSoftServe.png" />,
    <PartnersComponent src="assets/icons/logoRDGU.png" />,
    <PartnersComponent src="assets/icons/logoNUWGP.png" />,
    <PartnersComponent src="assets/icons/logoSoftServe.png" />,
    <PartnersComponent src="assets/icons/logoRDGU.png" />,
    <PartnersComponent src="assets/icons/logoItCluster.png" />,
    <PartnersComponent src="assets/icons/logoSoftServe.png" />,
    <PartnersComponent src="assets/icons/logoRDGU.png" />,
  ];

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
        <h1>Our partners</h1>
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
            <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.72917 50L44.2708 50C47.4313 50 50 47.4313 50 44.2708L50 5.72917C50 2.56875 47.4313 0 44.2708 0L5.72917 0C2.56875 0 0 2.56875 0 5.72917L0 44.2708C0 47.4313 2.56875 50 5.72917 50ZM18.75 16.1458C18.75 15.5896 19.0458 15.075 19.525 14.7958C19.7688 14.6542 20.0396 14.5833 20.3125 14.5833C20.5792 14.5833 20.8437 14.65 21.0833 14.7875L36.7083 23.6417C37.1958 23.9167 37.5 24.4354 37.5 25C37.5 25.5646 37.1958 26.0833 36.7083 26.3583L21.0833 35.2125C20.5979 35.4875 20.0063 35.4812 19.525 35.2042C19.0458 34.925 18.75 34.4104 18.75 33.8542V16.1458Z" fill="#656565" fill-opacity="0.3"/>
            </svg>
          </button>
          <button data-testid='buttonRight' className={classes.right} onClick={goRight}>
           <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.72917 50L44.2708 50C47.4313 50 50 47.4313 50 44.2708L50 5.72917C50 2.56875 47.4313 0 44.2708 0L5.72917 0C2.56875 0 0 2.56875 0 5.72917L0 44.2708C0 47.4313 2.56875 50 5.72917 50ZM18.75 16.1458C18.75 15.5896 19.0458 15.075 19.525 14.7958C19.7688 14.6542 20.0396 14.5833 20.3125 14.5833C20.5792 14.5833 20.8437 14.65 21.0833 14.7875L36.7083 23.6417C37.1958 23.9167 37.5 24.4354 37.5 25C37.5 25.5646 37.1958 26.0833 36.7083 26.3583L21.0833 35.2125C20.5979 35.4875 20.0063 35.4812 19.525 35.2042C19.0458 34.925 18.75 34.4104 18.75 33.8542V16.1458Z" fill="#656565" fill-opacity="0.3"/>
            </svg>
          </button>
        </div>
      </div>
  )
}

export default Partners;