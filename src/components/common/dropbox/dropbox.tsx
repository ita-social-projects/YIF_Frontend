import React from 'react'
import './dropbox.scss';
import styles from './dropbox.module.scss';

import {ReactComponent as Arrow} from './arrow.svg'

type Props={
   data:string[];
   keyId:number;
   listName?:string;
   listTitle?:string; 
   width?:number;
   inputWidth?:number
}

class DropboxElement extends React.Component<Props,{}>{
    
    constructor(props:Props) {
        super(props);
    }
    
    componentDidMount(){
        const ul = document.querySelectorAll('.'+styles.combolist_li);
        this.addElementsNew(ul[this.props.keyId],this.props.data);
        this.select();
    }

    addElementsNew=(element:Element,data:string[])=>{
        for(let i:number = 0;i<data.length;i++){   
            let li:Element = document.createElement('li');
            li.innerHTML=data[i];
            element.appendChild(li);
        }
    }

    select =()=>{
        
        const list = document.querySelectorAll('.'+styles.combolist_li); 
        const input = document.querySelectorAll('input'); 
        const listBox = document.querySelectorAll('.'+styles.list_box);
        const arrow = document.querySelectorAll('.'+styles.arrow);

        //const input = document.querySelectorAll('.dropbox-title')[this.props.keyId].querySelectorAll('input'); 
        const li = list[this.props.keyId].querySelectorAll('.'+styles.combolist_li+' li');
        for(let i:number = 0; i<li.length;i++){   
            li[i].addEventListener('click',()=>{ 
                input[this.props.keyId].value=li[i].innerHTML;
                
                list[this.props.keyId].classList.toggle(styles.show);
                listBox[this.props.keyId].classList.toggle(styles.show_list_box);
                input[this.props.keyId].classList.toggle(styles.gray_color_text);
                arrow[this.props.keyId].classList.toggle(styles.arrow_up);
                
            })
        }
    }
    
    //this func here for history
    showHideArrow=()=>{
        const arrow = document.querySelectorAll('.arrow');
        arrow[this.props.keyId].classList.toggle('arrow-up');
    }
    

    showHideList=()=>{
        const combolistLi = document.querySelectorAll('.'+styles.combolist_li);
        const listBox = document.querySelectorAll('.'+styles.list_box);
        const input = document.querySelectorAll('input');
        const arrow = document.querySelectorAll('.'+styles.arrow);
              
        for(let c:number = 0; c<this.props.keyId;c++){
            combolistLi[c].classList.remove(styles.show);
            listBox[c].classList.remove(styles.show_list_box);
            input[c].classList.remove(styles.gray_color_text);
            arrow[c].classList.remove(styles.arrow_up);
        }

        for(let c:number = this.props.keyId+1; c<combolistLi.length;c++){
            combolistLi[c].classList.remove(styles.show);
            listBox[c].classList.remove(styles.show_list_box);
            input[c].classList.remove(styles.gray_color_text);
            arrow[c].classList.remove(styles.arrow_up);
        }
        
        combolistLi[this.props.keyId].classList.toggle(styles.show);
        listBox[this.props.keyId].classList.toggle(styles.show_list_box);
        input[this.props.keyId].classList.toggle(styles.gray_color_text);
        arrow[this.props.keyId].classList.toggle(styles.arrow_up);
        
    }
    
    render(){

        let {listName,width,inputWidth,listTitle} = this.props;
        const {showHideArrow,showHideList} = this;
        
        //customise width of our dropbox element
        if(width===null){
            width = 16.25;
            inputWidth= width-5;
        }else
        if((width!=null)){
            inputWidth= width-5;
        }

        return(
            <div className={styles.box}>
                <ul className={styles.dropboxMenu} style={{width: `${width}rem`}}>
                    <li className={styles.input_li}>
                        <div className={styles.dropbox_title}>
                            <input type='text' name={listName} style={{width: `${inputWidth}rem`}} value={listTitle} readOnly onClick={showHideList}></input>
                            <div className={styles.arrow} onClick={showHideList}><Arrow/></div>
                        </div>
                        <div className={styles.list_box}>
                            <ul className={styles.combolist_li}>
                                <li>{listTitle}</li>
                            </ul>
                        </div>                    
                    </li>
                </ul>
            </div>
        )
    }
}

export default DropboxElement;