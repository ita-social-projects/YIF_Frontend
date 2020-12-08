import React, {useState} from "react";
import classes from "./slider.module.scss";
import Slide from "./slideComponent/slide"
import imgSlide1 from "./image/imgSlide1.svg"
import imgSlide2 from "./image/imgSlide2.png"
import imgSlide3 from "./image/imgSlide3.png"
import imgSlide4 from "./image/imgSlide4.jpg"
import imgSlide5 from "./image/imgSlide5.jpg"
import imgSlide6 from "./image/imgSlide6.jpg"
import imgSlide7 from "./image/imgSlide7.svg"
import imgSlide8 from "./image/imgSlide8.svg"
import imgSlide9 from "./image/imgSlide9.svg"
import arrow from "./image/arrow.svg"

const Slider: React.FunctionComponent = () => {

  let sliderList = [
    <Slide src={imgSlide1}/>,
    <Slide src={imgSlide2}/>,
    <Slide src={imgSlide3}/>,
    <Slide src={imgSlide4}/>,
    <Slide src={imgSlide5}/>,
    <Slide src={imgSlide6}/>,
    <Slide src={imgSlide7}/>,
    <Slide src={imgSlide8}/>,
    <Slide src={imgSlide9}/>,
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
            <img src={arrow} alt='arrow'/>
          </button>
          <button data-testid='buttonRight' className={classes.right} onClick={goRight}>
            <img src={arrow} alt='arrow'/>
          </button>
        </div>
      </div>
  )
}

export default Slider;