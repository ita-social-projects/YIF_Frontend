import React,{Fragment} from 'react'
import { useSelector} from 'react-redux';
import {
  selectData,
} from '../../store/reducers/dropboxReducer';
import DropboxElement from '../common/dropbox/dropbox'
import styles from './filter.module.scss';

import {ReactComponent as SearchIcon} from './search.svg'
import { useHistory } from "react-router-dom";

const Filter =()=>{
    
    const state = useSelector(selectData);
    const history = useHistory();

    let university:string[] = state.university;
    let direction:string[] = state.direction;
    let speciality:string[] = state.speciality;

    //submit our form and redirect to the filterPage
    const onSubmit=(event:any)=>{
      event.preventDefault();
      history.push('/404');
    }    
    

    return(
      <Fragment>
        <div className={styles.dropbox}>
            <div className={styles.title_}>
                <h3>Обери своє майбутнє</h3>
            </div>
            <form  onSubmit={onSubmit}> 
                <div className={styles.selectors}>
                  <div className={styles.box}>
                  <DropboxElement data={direction} keyId={0} listName={'Direction'} listTitle={'Напрями'}></DropboxElement>
                  </div>
                  <div className={styles.box}>
                  <DropboxElement data={speciality} keyId={1} listName={'Speciality'} width={21.75} listTitle={'Спеціальності'}></DropboxElement>
                  </div>
                  <div className={styles.box}>
                  <DropboxElement data={university} keyId={2} listName={'University'} listTitle={'Університети'}></DropboxElement>  
                  </div>
                  <button type={"submit"}>
                      <span className={styles.searchText}>Пошук</span>
                      <span className={styles.searchIcon}><SearchIcon></SearchIcon></span>
                  </button>
                </div>      
            </form>
            <div className={styles.filter1}><img src='../assets/images/filter1.svg' alt='filter1'></img></div>
            <div className={styles.filter2}><img src='../assets/images/filter2.svg' alt='filter2'></img></div>
            <div className={styles.filter3}><img src='../assets/images/filter3.svg' alt='filter3'></img></div>                
        </div>
      </Fragment>
    )
}
export default Filter;
