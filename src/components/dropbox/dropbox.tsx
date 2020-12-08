import React,{Fragment} from 'react'
import './dropboxModule.scss';
import { useSelector} from 'react-redux';
import {
  selectData,
} from '../../store/reducers/dropboxReducer';
import DropboxElement from '../common/dropbox/dropbox'
import {ReactComponent as SearchIcon} from './search.svg'

const Dropbox =()=>{
    
    const state = useSelector(selectData); 
    
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
                  <button type={"submit"}>
                      <span className='searchText'>Search</span>
                      <span className='searchIcon'><SearchIcon></SearchIcon></span>
                  </button> 
                </div>      
            </form>
        </div>
      </Fragment>
    )
}
export default Dropbox;
