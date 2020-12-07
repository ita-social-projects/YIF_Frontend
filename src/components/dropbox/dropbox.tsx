import React,{Fragment,useEffect} from 'react'
import './dropboxModule.scss';
import { useSelector, useDispatch } from 'react-redux';
import {
  SET_DATA,
  selectData,
} from '../../store/reducers/dropboxReducer';
import DropboxElement from '../common/dropbox/dropbox'


//This is proto for filter function. When we developt better filter - change it
const filter1 =()=>{
  const selectors = document.querySelectorAll('select'); 
 if(selectors[0].selectedIndex===2){
      selectors[1].options[3].hidden=true
      selectors[1].options[4].hidden=true
      selectors[1].selectedIndex=2;

      selectors[2].options[2].hidden=true
      selectors[2].options[3].hidden=true
      selectors[2].selectedIndex=5;
  }else
  if((selectors[0].selectedIndex===0)||(selectors[1].selectedIndex===0)||(selectors[2].selectedIndex===0)){
    
    for(let a:number = 0;a<3;a++){
      selectors[a].selectedIndex=0;
      for(let b:number = 0; b<5;b++){
          selectors[a].options[b].hidden=false;
      }
    
  }
  }
}

const Dropbox =()=>{
    const state = useSelector(selectData);
    const dispatch = useDispatch();  
    
    let university:string[] = state.university;
    let direction:string[] = state.direction;
    let speciality:string[] = state.speciality;
              
    return(
        <Fragment>
             <div className='dropbox'>
             <div className='title_'>
                  <h2>University filter</h2>
             </div>           
            <form  action='#' method='POST'> 
            <div className="selectors">
                    <DropboxElement data={direction} keyId={0} listName={'Direction'} ></DropboxElement>               
                    <DropboxElement data={speciality} keyId={1} listName={'Speciality'} ></DropboxElement>
                    <DropboxElement data={university} keyId={2} listName={'University'}  ></DropboxElement>    
                    <button type={"submit"}>Search</button> 
            </div>
                  
            </form>
             </div>
            </Fragment>
    )
}
export default Dropbox;
