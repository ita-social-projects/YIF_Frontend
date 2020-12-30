import React,{Fragment} from 'react'
import Frame from 'react-frame-component';
import { getJSDocReturnType } from 'typescript'
import styles from './graduateCabinetPage.module.scss';
import styless from '../../components/footer/footer.module.scss'
import {
    Header,
    Banner,
    BannerLower,
    Partners,
    Filter,
    AboutUs,
    Footer,
  } from '../../components';

type Props={
    
 }
 
 
 class DropboxElement extends React.Component<Props,{}>{

    constructor(props:Props){
        super(props)
    }

    state={
        show:1,
    }

    onChangeState = (a:number) =>{
        const copyState = this.state;
        if(a===1){
            copyState.show = 1;
        }
        else if(a===2){
            copyState.show = 2;
        }
        this.setState((state)=>{
            return{
                show:copyState.show,
            }
        })
    }

    render(){
        let box
        if(this.state.show === 1){
            box = <Header></Header>;
        }
        else if(this.state.show === 2){
            box = <Footer></Footer>
        }

        return(
            <Fragment>
                <Header></Header>
                   <div className={styles.page}>
                        <section className={styles.mainWorkingFiled}>
                            <article className={styles.mainMenuBar}>
                            <div className={styles.icon}></div>
                            </article>
                            <article className={styles.mainMenu}>
                                <section>
                                    <article className={styles.userFiled}>
                                        <div className={styles.icon}></div>
                                        <p>Користувач</p>
                                    </article>
                                    <article className={styles.optionList}>
                                        <ul>
                                            <li onClick={()=>this.onChangeState(1)}>Графік подачі документів</li>
                                            <li onClick={()=>this.onChangeState(2)}>Профіль</li>
                                            <li>Опція 3</li>
                                            <li>Опція 4</li>
                                            <li>Опція 5</li>
                                        </ul>
                                    </article>
                                </section>
                            </article>
                            <article className={styles.mainFiled}>{box}</article>
                        </section>
                        <div className={styles.univMap}>Карти університетів</div>
                   </div>
                <Footer></Footer>
            </Fragment>
        )
    }
 }


export default DropboxElement;

/*
<Fragment>
                <div>Cabinet</div>
                <div className={styles.frame}>{box}</div>
                <button onClick={()=>this.onChangeState(1)}>Show header</button>
                <button onClick={()=>this.onChangeState(2)}>Show footer</button>
            </Fragment>
*/