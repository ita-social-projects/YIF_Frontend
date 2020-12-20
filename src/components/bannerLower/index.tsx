import React, { Component } from 'react';
import style from './bannerLower.module.scss';

export default class BannerLower extends Component<any> {
  scrollRef: any = React.createRef();

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = (event: any) => {
    const yCenterOfWindow: number = document.documentElement.clientHeight / 2;
    const boundingRectOfBanner: any = this.scrollRef.current.getBoundingClientRect();
    const yTopOfBanner: number = boundingRectOfBanner.y;

    // SET PROCENTEG OF ANIMATION and puting it in css property:
    // Formula = (starting point of animation - offset of starting point) / (length of animation)
    // You can look it lower if you uncoment log:
    // console.log(`(yCenterOfWindow ${document.documentElement.clientHeight} * 1.5 ) ${document.documentElement.clientHeight * 1.5} / (boundingRectOfBanner.height ${boundingRectOfBanner.height} / 2) ${boundingRectOfBanner.height / 2} = ${(document.documentElement.clientHeight * 1.5) / (boundingRectOfBanner.height / 2)}`);
    const presntegOfAnimation: number =
      (yCenterOfWindow * 1.2 - yTopOfBanner) /
      (boundingRectOfBanner.height / 1.9);
    document.body.style.setProperty('--scroll', presntegOfAnimation.toString());
  };

  render() {
    const { handleClick } = this.props;
    return (
      <div className={style.container}>
        <div
          ref={this.scrollRef}
          className={`${style.banner} ${style.animationBg} ${style.animationBounce}`}
        >
          <h1>Your IT Future</h1>
          <p>
            Існують легенди (записи яких збереглися в античних храмах), згідно з
            якими людська раса походить від cтворінь, які нагадують амфібій.
            Їхні тіла були вкриті лускою й дихали вони через зябра. У низці
            міфів риби виконують функцію деміурга.
          </p>
          <button onClick={() => handleClick()}>Зареєструйся</button>
        </div>
      </div>
    );
  }
}
