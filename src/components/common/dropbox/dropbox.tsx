import React from 'react'
import './dropbox.scss';
import {ReactComponent as Arrow} from './arrow.svg'

type Props={
   data:string[];
   keyId:number;
   listName?:string; 
   width?:number;
   inputWidth?:number
}

class DropboxElement extends React.Component<Props,{}>{
    
    constructor(props:Props) {
        super(props);
    }
    
    componentDidMount(){
        const ul = document.querySelectorAll('.combolist-li');
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
        const list = document.querySelectorAll('.combolist-li');
        const li = list[this.props.keyId].querySelectorAll('li'); 
        const input = document.querySelectorAll('input');
        const listBox = document.querySelectorAll('.list-box');
        
        for(let i:number = 0; i<li.length;i++){   
            li[i].addEventListener('mousedown',()=>{
            input[this.props.keyId].value=li[i].innerHTML;
            list[this.props.keyId].classList.toggle('show');
            listBox[this.props.keyId].classList.toggle('show-list-box');
            input[this.props.keyId].classList.toggle('gray-color-text'); 
            })
        }
    }

    showHideArrow=()=>{
        const arrow = document.querySelectorAll('.arrow');
        arrow[this.props.keyId].classList.toggle('arrow-up');
    }

    showHideList=()=>{
        const combolistLi = document.querySelectorAll('.combolist-li');
        const listBox = document.querySelectorAll('.list-box');
        const input = document.querySelectorAll('input');
        
        combolistLi[this.props.keyId].classList.toggle('show');
        listBox[this.props.keyId].classList.toggle('show-list-box');
        input[this.props.keyId].classList.toggle('gray-color-text');
    }

    render(){

        let {listName,width,inputWidth} = this.props;
        const {showHideArrow,showHideList} = this;
        
        //customise width of our dropbox element
        if(width===null){
            width = 260;
            inputWidth= width-80;
        }else
        if((width!=null)){
            inputWidth= width-80;
        }

        return(
            <div className='box'>
                <ul className='dropboxMenu' style={{width: `${width}px`}}>
                    <li className='input-li' onMouseDown={showHideArrow}>
                        <div className="dropbox-title">
                            <input type='text' name={listName} style={{width: `${inputWidth}px`}} value={listName} readOnly onMouseDown={showHideList}></input>
                            <div className='arrow' onMouseDown={showHideList}><Arrow/></div>
                        </div>
                        <div className="list-box">
                            <ul className='combolist-li'>
                                <li>{listName}</li>
                            </ul>
                        </div>                    
                    </li>
                </ul>
            </div>
        )
    }
}

export default DropboxElement;