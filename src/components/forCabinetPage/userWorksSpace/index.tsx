import React, { Fragment } from "react";
import styles from "./userWorkSpace.module.scss";
import {
  UserOption,
  UnivListOption,
  SpecListOption,
} from "../../../components";
type Props = {};

let homeIcon = (
  <svg
    height='22px'
    viewBox='0 0 512 512'
    width='22px'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path d='m498.195312 222.695312c-.011718-.011718-.023437-.023437-.035156-.035156l-208.855468-208.847656c-8.902344-8.90625-20.738282-13.8125-33.328126-13.8125-12.589843 0-24.425781 4.902344-33.332031 13.808594l-208.746093 208.742187c-.070313.070313-.140626.144531-.210938.214844-18.28125 18.386719-18.25 48.21875.089844 66.558594 8.378906 8.382812 19.445312 13.238281 31.277344 13.746093.480468.046876.964843.070313 1.453124.070313h8.324219v153.699219c0 30.414062 24.746094 55.160156 55.167969 55.160156h81.710938c8.28125 0 15-6.714844 15-15v-120.5c0-13.878906 11.289062-25.167969 25.167968-25.167969h48.195313c13.878906 0 25.167969 11.289063 25.167969 25.167969v120.5c0 8.285156 6.714843 15 15 15h81.710937c30.421875 0 55.167969-24.746094 55.167969-55.160156v-153.699219h7.71875c12.585937 0 24.421875-4.902344 33.332031-13.808594 18.359375-18.371093 18.367187-48.253906.023437-66.636719zm0 0' />
  </svg>
);

let userIcon = (
  <svg
    height='24px'
    width='21px'
    viewBox='-42 0 512 512.002'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path d='m210.351562 246.632812c33.882813 0 63.222657-12.152343 87.195313-36.128906 23.972656-23.972656 36.125-53.304687 36.125-87.191406 0-33.875-12.152344-63.210938-36.128906-87.191406-23.976563-23.96875-53.3125-36.121094-87.191407-36.121094-33.886718 0-63.21875 12.152344-87.191406 36.125s-36.128906 53.308594-36.128906 87.1875c0 33.886719 12.15625 63.222656 36.132812 87.195312 23.976563 23.96875 53.3125 36.125 87.1875 36.125zm0 0' />
    <path d='m426.128906 393.703125c-.691406-9.976563-2.089844-20.859375-4.148437-32.351563-2.078125-11.578124-4.753907-22.523437-7.957031-32.527343-3.308594-10.339844-7.808594-20.550781-13.371094-30.335938-5.773438-10.15625-12.554688-19-20.164063-26.277343-7.957031-7.613282-17.699219-13.734376-28.964843-18.199219-11.226563-4.441407-23.667969-6.691407-36.976563-6.691407-5.226563 0-10.28125 2.144532-20.042969 8.5-6.007812 3.917969-13.035156 8.449219-20.878906 13.460938-6.707031 4.273438-15.792969 8.277344-27.015625 11.902344-10.949219 3.542968-22.066406 5.339844-33.039063 5.339844-10.972656 0-22.085937-1.796876-33.046874-5.339844-11.210938-3.621094-20.296876-7.625-26.996094-11.898438-7.769532-4.964844-14.800782-9.496094-20.898438-13.46875-9.75-6.355468-14.808594-8.5-20.035156-8.5-13.3125 0-25.75 2.253906-36.972656 6.699219-11.257813 4.457031-21.003906 10.578125-28.96875 18.199219-7.605469 7.28125-14.390625 16.121094-20.15625 26.273437-5.558594 9.785157-10.058594 19.992188-13.371094 30.339844-3.199219 10.003906-5.875 20.945313-7.953125 32.523437-2.058594 11.476563-3.457031 22.363282-4.148437 32.363282-.679688 9.796875-1.023438 19.964844-1.023438 30.234375 0 26.726562 8.496094 48.363281 25.25 64.320312 16.546875 15.746094 38.441406 23.734375 65.066406 23.734375h246.53125c26.625 0 48.511719-7.984375 65.0625-23.734375 16.757813-15.945312 25.253906-37.585937 25.253906-64.324219-.003906-10.316406-.351562-20.492187-1.035156-30.242187zm0 0' />
  </svg>
);

let univListIcon = (
  <svg
    version='1.1'
    id='Icons'
    xmlns='http://www.w3.org/2000/svg'
    xmlnsXlink='http://www.w3.org/1999/xlink'
    x='0px'
    y='0px'
    viewBox='0 0 32 32'
    style={{ enableBackground: "new :new 0 0 32 32" }}
    xmlSpace='preserve'
    width='30px'
  >
    <style type='text/css'>.st0{`fill:#FFFFFF`}</style>
    <g>
      <path d='M31,26c-0.6,0-1-0.4-1-1V12c0-0.6,0.4-1,1-1s1,0.4,1,1v13C32,25.6,31.6,26,31,26z' />
    </g>
    <g>
      <path
        d='M16,21c-0.2,0-0.3,0-0.5-0.1l-15-8C0.2,12.7,0,12.4,0,12s0.2-0.7,0.5-0.9l15-8c0.3-0.2,0.6-0.2,0.9,0l15,8
      c0.3,0.2,0.5,0.5,0.5,0.9s-0.2,0.7-0.5,0.9l-15,8C16.3,21,16.2,21,16,21z'
      />
    </g>
    <path d='M17.4,22.6C17,22.9,16.5,23,16,23s-1-0.1-1.4-0.4L6,18.1V22c0,3.1,4.9,6,10,6s10-2.9,10-6v-3.9L17.4,22.6z' />
  </svg>
);

let specListIcon = (
  <svg
    version='1.1'
    id='Capa_1'
    xmlns='http://www.w3.org/2000/svg'
    xmlnsXlink='http://www.w3.org/1999/xlink'
    x='0px'
    y='0px'
    viewBox='0 0 426.667 426.667'
    style={{ enableBackground: "new 0 0 426.667 426.667" }}
    xmlSpace='preserve'
    height='24px'
    width='22px'
  >
    <g>
      <g>
        <path
          d='M362.667,42.667h-89.28C264.64,17.92,241.173,0,213.333,0s-51.307,17.92-60.053,42.667H64
			c-23.573,0-42.667,19.093-42.667,42.667V384c0,23.573,19.093,42.667,42.667,42.667h298.667c23.573,0,42.667-19.093,42.667-42.667
			V85.333C405.333,61.76,386.24,42.667,362.667,42.667z M213.333,42.667c11.733,0,21.333,9.493,21.333,21.333
			c0,11.84-9.6,21.333-21.333,21.333S192,75.84,192,64C192,52.16,201.6,42.667,213.333,42.667z M256,341.333H106.667v-42.667H256
			V341.333z M320,256H106.667v-42.667H320V256z M320,170.667H106.667V128H320V170.667z'
        />
      </g>
    </g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
  </svg>
);

class UserWorksSpace extends React.Component<Props, {}> {
  state = {
    chosenFrame: -1,
  };

  resetNavBar = () => {
    //reset NavBar and it elements
    let icons = document.querySelectorAll(`article .${styles.icons}`);
    let menus = document.querySelectorAll(`.${styles.menus}`);

    icons.forEach((icon) => {
      //remove white background and add hover effect for all icons
      icon.classList.remove(styles.whiteBackground);
      icon.classList.add(styles.hoverEffectIcons);
    });

    menus.forEach((menu) => {
      // hide all side menus
      menu.classList.remove(styles.mainMenuWidth);
    });
  };

  setMenu = (menu: Element | null, icon: Element | null) => {
    icon?.classList.toggle(styles.whiteBackground);
    icon?.classList.toggle(styles.hoverEffectIcons);
    menu?.classList.toggle(styles.mainMenuWidth);
  };

  showMenu = () => {
    this.resetNavBar();
    let mainMenu = document.querySelector(`.${styles.mainMenu}`);
    this.setMenu(mainMenu, null);
  };

  whiteBackground = (icon: Element | null) => {
    let icons = document.querySelectorAll(`article .${styles.icons}`);

    icons.forEach((icon) => {
      //remove white background and add hover effect for all icons
      icon.classList.remove(styles.whiteBackground);
    });
    icon?.classList.toggle(styles.whiteBackground);
  };

  hideBar = () => {
    this.resetNavBar();
  };

  onChangeFrame = (chosenFrame: number) => {
    const copyState = this.state;
    copyState.chosenFrame = chosenFrame;
    this.setState(() => {
      return {
        chosenFrame: copyState.chosenFrame,
      };
    });
  };

  render() {
    let box;
    switch (this.state.chosenFrame) {
      case 0: {
        box = <UserOption />;
        break;
      }
      case 1: {
        box = <UnivListOption />;
        break;
      }
      case 2: {
        box = <SpecListOption />;
        break;
      }
      default:
        box = <UserOption />;
    }

    return (
      <Fragment>
        <section
          className={styles.mainWorkingFiled}
          onMouseLeave={this.hideBar}
        >
          <article className={styles.mainMenuBar} onMouseEnter={this.showMenu}>
            <div
              className={`${styles.userIcon} ${styles.hoverEffectIcons} ${styles.icons}`}
              onClick={() => this.onChangeFrame(0)}
            >
              {userIcon}{" "}
            </div>
            <div
              className={`${styles.univIcon} ${styles.hoverEffectIcons} ${styles.icons}`}
              onClick={() => this.onChangeFrame(1)}
            >
              {univListIcon}{" "}
            </div>
            <div
              className={`${styles.specIcon} ${styles.hoverEffectIcons} ${styles.icons}`}
              onClick={() => this.onChangeFrame(2)}
            >
              {specListIcon}{" "}
            </div>
          </article>
          <article className={`${styles.mainMenu} ${styles.menus}`}>
            <section>
              <article className={styles.optionList}>
                <ul>
                  <li onClick={() => this.onChangeFrame(0)}>
                    <p className={styles.underlineAnimation}>
                      Меню&nbsp;користувача
                    </p>
                  </li>
                  <li onClick={() => this.onChangeFrame(1)}>
                    <p className={styles.underlineAnimation}>Університети</p>
                  </li>
                  <li onClick={() => this.onChangeFrame(2)}>
                    <p className={styles.underlineAnimation}>Спеціальності</p>
                  </li>
                </ul>
              </article>
            </section>
          </article>
          <article className={styles.mainFiled} onMouseEnter={this.hideBar}>
            {box}
          </article>
        </section>
      </Fragment>
    );
  }
}

export default UserWorksSpace;
