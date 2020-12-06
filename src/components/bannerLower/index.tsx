import React, { Component } from 'react';

import './grid.scss';
import './bannerLower.scss';

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
      (yCenterOfWindow * 1.5 - yTopOfBanner) /
      (boundingRectOfBanner.height / 2);
    document.body.style.setProperty('--scroll', presntegOfAnimation.toString());
  };

  render() {
    return (
      <div ref={this.scrollRef} className='banner'>
        <div className='two-col-grid label'>
          <div className='grid-item wordAnimation leftWord'>Your IT</div>
          <div className='grid-item wordAnimation rightWord'>Future</div>
        </div>
        <div className='description'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </div>
        <a href='/somewhere' className='bannerButton' rel='call to action'>
          Call to action
        </a>
      </div>
    );
  }
}
