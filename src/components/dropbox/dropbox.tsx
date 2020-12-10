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
                <h3>University filter</h3>
            </div>
            <div className="filter-form">
            <form  action='#' method='POST' id='univ_filter'> 
                <div className="selectors">
                  <DropboxElement data={direction} keyId={0} listName={'Direction'} ></DropboxElement>               
                  <DropboxElement data={speciality} keyId={1} listName={'Speciality'} width={348}></DropboxElement>
                  <DropboxElement data={university} keyId={2} listName={'University'}  ></DropboxElement>       
                </div>      
            </form>
            <button type={"submit"} form='univ_filter'>
                  <span className='searchText'>Search</span>
                  <span className='searchIcon'><SearchIcon></SearchIcon></span>
            </button>
            
            </div>           
            
             
        </div>
      </Fragment>
    )
}
export default Dropbox;
