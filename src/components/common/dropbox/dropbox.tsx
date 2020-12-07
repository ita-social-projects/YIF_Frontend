import React,{Fragment,useEffect} from 'react'
import './dropbox.scss';

type Props={
   data:string[];
   keyId:number;
   listName?:string; 
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
        for(let i:number = 0; i<li.length;i++){
             li[i].addEventListener('click',()=>{
                input[this.props.keyId].value=li[i].innerHTML;
                list[this.props.keyId].classList.toggle('show');
             })
        }
    }

    showHide=()=>{
        const input = document.querySelectorAll('.combolist-li');
        input[this.props.keyId].classList.toggle('show');
    }

    render(){

        const {listName} = this.props;
        return(
            <div className='box'>
            <ul className='dropboxMenu'>
                <li className='input-li'><input type='text' value={listName} readOnly onClick={this.showHide}></input>
                    <ul className='combolist-li'>
                        <li>{listName}</li>
                    </ul>
                </li>
            </ul>
            </div>
        )
    }

}

export default DropboxElement;