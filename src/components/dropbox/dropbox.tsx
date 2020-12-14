import React,{Fragment} from 'react'
//import './dropboxModule.scss';
import { useSelector} from 'react-redux';
import {
  selectData,
} from '../../store/reducers/dropboxReducer';
import DropboxElement from '../common/dropbox/dropbox'
//import styles from './dropbox.module.scss';
import styles from './dropboxModule.module.scss';


import {ReactComponent as SearchIcon} from './search.svg'


import {ReactComponent as Filter1} from './filter1.svg'
import {ReactComponent as Filter2} from './filter2.svg'
import {ReactComponent as Filter3} from './filter3.svg'


const Dropbox =()=>{
    
    const state = useSelector(selectData); 
    
    let university:string[] = state.university;
    let direction:string[] = state.direction;
    let speciality:string[] = state.speciality;
              
    return(
      <Fragment>
        <div className={styles.dropbox}>
            <div className={styles.title_}>
                <h3>University filter</h3>
            </div>
            <form  action='#' method='POST' id='univ_filter'> 
                <div className={styles.selectors}>
                  <div className={styles.box}>
                  <DropboxElement data={direction} keyId={0} listName={'Direction'} ></DropboxElement>
                  </div>
                  <div className={styles.box}>
                  <DropboxElement data={speciality} keyId={1} listName={'Speciality'} width={21.75}></DropboxElement>
                  </div>
                  <div className={styles.box}>
                  <DropboxElement data={university} keyId={2} listName={'University'} ></DropboxElement>  
                  </div>
                  <button type={"submit"} form='univ_filter'>
                      <span className={styles.searchText}>Search</span>
                      <span className={styles.searchIcon}><SearchIcon></SearchIcon></span>
                  </button>  
                </div>      
            </form>
            <div className={styles.filter1}><Filter1></Filter1></div>
            <div className={styles.filter2}><Filter2></Filter2></div>
            <div className={styles.filter3}><Filter3></Filter3></div>                
        </div>
      </Fragment>
    )
}
export default Dropbox;
