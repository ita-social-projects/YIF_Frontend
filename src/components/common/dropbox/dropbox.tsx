import React from 'react'
import styles from './dropbox.module.scss';
import {ReactComponent as Arrow} from './arrow.svg'

type Props={
   data:string[]; // data from Props witch needed to upload in dropbox
   keyId:number; // unique keyId witch indentify for what dropbox we will upload data
   listName:string; // needed for naming our input
   listTitle?:string; // optional - needed for naming 'reset - state' filed
   width?:number; // optional - for setting custom width of our dropbox
   inputWidth?:number // optional - for setting custom width of our input
}


class DropboxElement extends React.Component<Props,{}>{
  
    // when component is mounted - upload data to our dropbox
    
    componentDidMount(){
        const ul = document.querySelectorAll(`.${styles.combolist_li}`);    
        this.addElementsNew(ul[this.props.keyId],this.props.data);
        this.select();
    }
    
    // dynamic uploading data to our dropbox from props
    addElementsNew=(element:Element,data:string[])=>{
        for(let i:number = 0;i<data.length;i++){
            let li:Element = document.createElement('li');
            li.innerHTML=data[i];
            element.appendChild(li);
        }
    }

    // dynamic uploading data to our dropbox from props
    ElementsUpdate=(element:Element,data:string[])=>{
        for(let i:number = 0;i<data.length;i++){
            const li = element.querySelectorAll('li');
            const liLength:number=li.length;
            console.log(li.length);
            if((li.length-1)===data.length){
                li[i+1].innerHTML=data[i];
            }
            if((li.length-1)<data.length){
                let liNew:Element = document.createElement('li');
                element.appendChild(liNew);
                li[i+1].innerHTML=data[i]; 
            }
            if((li.length-1)>data.length){
                let difference = (li.length-1)-data.length;
                for(let j:number=0;j<difference;j++){
                    element.removeChild(li[(liLength-1)-j]);
                    li[i+1].innerHTML=data[i];
                } 
            }
        }
    }
    
    componentDidUpdate(){
        const ul = document.querySelectorAll(`.${styles.combolist_li}`);
        this.ElementsUpdate(ul[this.props.keyId],this.props.data);
        this.select();
    }
    
    // function that will call if we click on option in dropbox
    select =()=>{
        
        const list = document.querySelectorAll(`.${styles.combolist_li}`); 
        const listBox = document.querySelectorAll(`.${styles.list_box}`);
        const arrow = document.querySelectorAll(`.${styles.arrow}`);
        const input = document.querySelectorAll<HTMLInputElement>(`.${styles.dropbox_title} input`);
        const li = list[this.props.keyId].querySelectorAll(`.${styles.combolist_li} li`);
        
        for(let i:number = 0; i<li.length;i++){   
            li[i].addEventListener('click',()=>{ 
                
                input[this.props.keyId].value=li[i].innerHTML;
                listBox[this.props.keyId].classList.remove(styles.show_list_box);
                input[this.props.keyId].classList.remove(styles.gray_color_text);
                arrow[this.props.keyId].classList.remove(styles.arrow_up);
                
            })
        }
    }

    // function that will make our option list hide/visible
    showHideList=()=>{
        const combolistLi = document.querySelectorAll(`.${styles.combolist_li}`);
        const listBox = document.querySelectorAll(`.${styles.list_box}`);
        const input = document.querySelectorAll<HTMLInputElement>(`.${styles.dropbox_title} input`);
        const arrow = document.querySelectorAll(`.${styles.arrow}`);
        
        //hide all(before) dropboxes 
        for(let c:number = 0; c<this.props.keyId;c++){
            listBox[c].classList.remove(styles.show_list_box);
            input[c].classList.remove(styles.gray_color_text);
            arrow[c].classList.remove(styles.arrow_up);
        }
        
        //hide all(after) dropboxes 
        for(let c:number = this.props.keyId+1; c<combolistLi.length;c++){
            listBox[c].classList.remove(styles.show_list_box);
            input[c].classList.remove(styles.gray_color_text);
            arrow[c].classList.remove(styles.arrow_up);
        }
        
        //show dropbox that we need 
        listBox[this.props.keyId].classList.toggle(styles.show_list_box);
        input[this.props.keyId].classList.toggle(styles.gray_color_text);
        arrow[this.props.keyId].classList.toggle(styles.arrow_up);
        
    }
    
    render(){

        let {listName,width,inputWidth,listTitle} = this.props;
        const {showHideList} = this;
        
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
