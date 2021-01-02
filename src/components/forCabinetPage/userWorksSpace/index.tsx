import React,{Fragment} from 'react'
import styles from './userWorkSpace.module.scss';
import {
    Option1MainMenu,
    Option2MainMenu,
    Option3MainMenu,
    Option4MainMenu,
    Option5MainMenu,
    Option1UserMenu,
    Option2UserMenu,
    Option3UserMenu,
    Option4UserMenu,
    Option5UserMenu,
  } from '../../../components';

type Props={
    
}

let homeIcon= (
   <svg height="22px" viewBox="0 0 512 512" width="22px" xmlns="http://www.w3.org/2000/svg"><path d="m498.195312 222.695312c-.011718-.011718-.023437-.023437-.035156-.035156l-208.855468-208.847656c-8.902344-8.90625-20.738282-13.8125-33.328126-13.8125-12.589843 0-24.425781 4.902344-33.332031 13.808594l-208.746093 208.742187c-.070313.070313-.140626.144531-.210938.214844-18.28125 18.386719-18.25 48.21875.089844 66.558594 8.378906 8.382812 19.445312 13.238281 31.277344 13.746093.480468.046876.964843.070313 1.453124.070313h8.324219v153.699219c0 30.414062 24.746094 55.160156 55.167969 55.160156h81.710938c8.28125 0 15-6.714844 15-15v-120.5c0-13.878906 11.289062-25.167969 25.167968-25.167969h48.195313c13.878906 0 25.167969 11.289063 25.167969 25.167969v120.5c0 8.285156 6.714843 15 15 15h81.710937c30.421875 0 55.167969-24.746094 55.167969-55.160156v-153.699219h7.71875c12.585937 0 24.421875-4.902344 33.332031-13.808594 18.359375-18.371093 18.367187-48.253906.023437-66.636719zm0 0"/></svg>
);

let userIcon = (
   <svg height="24px" width="24px" viewBox="-42 0 512 512.002" xmlns="http://www.w3.org/2000/svg"><path d="m210.351562 246.632812c33.882813 0 63.222657-12.152343 87.195313-36.128906 23.972656-23.972656 36.125-53.304687 36.125-87.191406 0-33.875-12.152344-63.210938-36.128906-87.191406-23.976563-23.96875-53.3125-36.121094-87.191407-36.121094-33.886718 0-63.21875 12.152344-87.191406 36.125s-36.128906 53.308594-36.128906 87.1875c0 33.886719 12.15625 63.222656 36.132812 87.195312 23.976563 23.96875 53.3125 36.125 87.1875 36.125zm0 0"/><path d="m426.128906 393.703125c-.691406-9.976563-2.089844-20.859375-4.148437-32.351563-2.078125-11.578124-4.753907-22.523437-7.957031-32.527343-3.308594-10.339844-7.808594-20.550781-13.371094-30.335938-5.773438-10.15625-12.554688-19-20.164063-26.277343-7.957031-7.613282-17.699219-13.734376-28.964843-18.199219-11.226563-4.441407-23.667969-6.691407-36.976563-6.691407-5.226563 0-10.28125 2.144532-20.042969 8.5-6.007812 3.917969-13.035156 8.449219-20.878906 13.460938-6.707031 4.273438-15.792969 8.277344-27.015625 11.902344-10.949219 3.542968-22.066406 5.339844-33.039063 5.339844-10.972656 0-22.085937-1.796876-33.046874-5.339844-11.210938-3.621094-20.296876-7.625-26.996094-11.898438-7.769532-4.964844-14.800782-9.496094-20.898438-13.46875-9.75-6.355468-14.808594-8.5-20.035156-8.5-13.3125 0-25.75 2.253906-36.972656 6.699219-11.257813 4.457031-21.003906 10.578125-28.96875 18.199219-7.605469 7.28125-14.390625 16.121094-20.15625 26.273437-5.558594 9.785157-10.058594 19.992188-13.371094 30.339844-3.199219 10.003906-5.875 20.945313-7.953125 32.523437-2.058594 11.476563-3.457031 22.363282-4.148437 32.363282-.679688 9.796875-1.023438 19.964844-1.023438 30.234375 0 26.726562 8.496094 48.363281 25.25 64.320312 16.546875 15.746094 38.441406 23.734375 65.066406 23.734375h246.53125c26.625 0 48.511719-7.984375 65.0625-23.734375 16.757813-15.945312 25.253906-37.585937 25.253906-64.324219-.003906-10.316406-.351562-20.492187-1.035156-30.242187zm0 0"/></svg>
)

class UserWorksSpace extends React.Component<Props,{}>{
    
    state={
        chosenBlock:-1,
        homeMenuFrame:0,
        userMenuFrame:0,
    }

    resetNavBar =()=>{  //reset NavBar and it elements
        let icons = document.querySelectorAll(`article .${styles.icons}`);
        let menus = document.querySelectorAll(`.${styles.menus}`);

        icons.forEach((icon)=>{  //remove white background and add hover effect for all icons
            icon.classList.remove(styles.whiteBackground);
            icon.classList.add(styles.hoverEffectIcons);
        })

        menus.forEach((menu)=>{ // hide all side menus
            menu.classList.remove(styles.mainMenuWidth);
        })
    }

    setMenu=(menu:Element|null,icon:Element|null)=>{
        icon?.classList.toggle(styles.whiteBackground);
        icon?.classList.toggle(styles.hoverEffectIcons);
        menu?.classList.toggle(styles.mainMenuWidth); 
    }

    homeSelect =()=>{
        this.resetNavBar();
        let mainMenu = document.querySelector(`.${styles.mainMenu}`);
        let homeIcon = document.querySelector(`.${styles.homeIcon}`);
        this.setMenu(mainMenu,homeIcon);      
    }

    userSelect =()=>{
        this.resetNavBar();
        let userIcon = document.querySelector(`.${styles.userIcon}`);
        let userMenu = document.querySelector(`.${styles.userMenu}`);
        this.setMenu(userMenu,userIcon);
    }

    hideBar=()=>{
        this.resetNavBar();  
    }

    onChangeFrame = (frame:number,chosenBlock:number) =>{
        const copyState = this.state;
        copyState.chosenBlock = chosenBlock;
        if(chosenBlock===0){
            copyState.homeMenuFrame = frame;
        } else 
        if(chosenBlock===1){
            copyState.userMenuFrame = frame;
        }
        this.setState(()=>{
            return{
                chosenBlock:copyState.chosenBlock,
                homeMenuFrame:copyState.homeMenuFrame,
                userMenuFrame:copyState.userMenuFrame,
            }
        })
    }

    render(){
        let box;
        switch(this.state.chosenBlock){     //will show frame based on user selection 
            case 0:{
                switch(this.state.homeMenuFrame){
                    case 0:{
                        box = <Option1MainMenu/>;
                    break 
                    }
                    case 1:{
                        box = <Option2MainMenu/>;
                    break 
                    }
                    case 2:{
                        box = <Option3MainMenu/>;
                    break 
                    }
                    case 3:{
                        box = <Option4MainMenu/>;
                    break 
                    }
                    case 4:{
                        box = <Option5MainMenu/>;
                    break 
                    }
                    default:
                    break;
                }
            break
            }
            case 1:{
                switch(this.state.userMenuFrame){
                    case 0:{
                        box = <Option1UserMenu/>;
                    break 
                    }
                    case 1:{
                        box = <Option2UserMenu/>;
                    break 
                    }
                    case 2:{
                        box = <Option3UserMenu/>;
                    break 
                    }
                    case 3:{
                        box = <Option4UserMenu/>;
                    break 
                    }
                    case 4:{
                        box = <Option5UserMenu/>;
                    break 
                    }
                    default:
                    break;
                }
            break
            }
            default:
            box = <Option1MainMenu/>;
        }
    
        return(
            <Fragment>
                <section className={styles.mainWorkingFiled} onMouseLeave={this.hideBar}>
                            <article className={styles.mainMenuBar} onMouseEnter={this.hideBar}>
                                <div className={styles.logo}>YIF</div>
                                <div className={`${styles.homeIcon} ${styles.hoverEffectIcons} ${styles.icons}`} onClick={this.homeSelect}>{homeIcon} </div>
                                <div className={`${styles.userIcon} ${styles.hoverEffectIcons} ${styles.icons}`} onClick={this.userSelect}>{userIcon} </div>
                            </article>
                            <article className={`${styles.mainMenu} ${styles.menus}`} >
                                <section>
                                    <article className={styles.userFiled}>
                                        <div className={styles.icon}></div>
                                        <p>Користувач</p>
                                    </article>
                                    <article className={styles.optionList}>
                                        <ul>
                                            <li onClick={()=>this.onChangeFrame(0,0)}>Опція 1 (головне меню)</li>
                                            <li onClick={()=>this.onChangeFrame(1,0)}>Опція 2 (головне меню)</li>
                                            <li onClick={()=>this.onChangeFrame(2,0)}>Опція 3 (головне меню)</li>
                                            <li onClick={()=>this.onChangeFrame(3,0)}>Опція 4 (головне меню)</li>
                                            <li onClick={()=>this.onChangeFrame(4,0)}>Опція 5 (головне меню)</li>
                                        </ul>
                                    </article>
                                </section>
                            </article>
                            <article className={`${styles.userMenu} ${styles.menus}`} >
                                <section>
                                    <article className={styles.userFiled}>
                                        <div className={styles.icon}></div>
                                        <p>Користувач</p>
                                    </article>
                                    <article className={styles.optionList}>
                                        <ul>
                                            <li onClick={()=>this.onChangeFrame(0,1)}>Опція 1 (меню користувача)</li>
                                            <li onClick={()=>this.onChangeFrame(1,1)}>Опція 2 (меню користувача)</li>
                                            <li onClick={()=>this.onChangeFrame(2,1)}>Опція 3 (меню користувача)</li>
                                            <li onClick={()=>this.onChangeFrame(3,1)}>Опція 4 (меню користувача)</li>
                                            <li onClick={()=>this.onChangeFrame(4,1)}>Опція 5 (меню користувача)</li>
                                        </ul>
                                    </article>
                                </section>
                            </article>
                            <article className={styles.mainFiled} onMouseEnter={this.hideBar}>{box}</article>
                        </section>
            </Fragment>
        )
    }
}

export default UserWorksSpace;
