import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { selectData } from '../../store/reducers/dropboxReducer';
import DropboxElement from '../common/dropbox/dropbox';
import styles from './filter.module.scss';

import { useHistory } from "react-router-dom";

const Filter = () => {
  const state = useSelector(selectData);
  const history = useHistory();

  let university: string[] = state.university;
  let direction: string[] = state.direction;
  let speciality: string[] = state.speciality;

    //our search Icon for button
    let searchIcont= (
      <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0)">
      <path d="M27.6997 4.74556C21.3713 -1.58263 11.0743 -1.58251 4.746 4.74556C-1.58233 11.0739 -1.58233 21.3708 4.746 27.699C10.1147 33.0677 18.0994 33.8808 24.3346 30.1405C24.3346 30.1405 24.7853 29.8718 25.1479 30.2346C27.2179 32.3047 33.4287 38.5154 33.4287 38.5154C35.0768 40.1636 37.3814 40.556 38.8433 39.0944L39.0947 38.8427C40.5566 37.3811 40.1643 35.0763 38.5161 33.4283C38.5161 33.4283 32.3185 27.2307 30.2527 25.1649C29.8725 24.7846 30.1411 24.334 30.1411 24.334C33.8814 18.099 33.0684 10.1143 27.6997 4.74556ZM24.7031 24.7025C20.0271 29.3785 12.4188 29.3784 7.74285 24.7024C3.06699 20.0264 3.06686 12.4181 7.74285 7.74228C12.4187 3.0663 20.0271 3.0663 24.7031 7.74228C29.3788 12.4183 29.3788 20.0264 24.7031 24.7025Z" fill="white" fillOpacity="1"/>
      <path d="M15.2598 23.6674C15.2598 23.885 15.217 24.1063 15.127 24.3195C14.7664 25.1714 13.7835 25.57 12.9315 25.2094C7.5763 22.9433 5.06319 16.7431 7.32928 11.388C7.68982 10.5361 8.67275 10.1376 9.52476 10.4981C10.3768 10.8588 10.7751 11.8415 10.4146 12.6937C8.86861 16.3474 10.5833 20.578 14.237 22.1239C14.876 22.3944 15.2598 23.0147 15.2598 23.6674Z" fill="white" fillOpacity="1"/>
      </g>
      <defs>
      <clipPath id="clip0">
      <rect width="40" height="40" fill="white" transform="translate(0 40) rotate(-90)"/>
      </clipPath>
      </defs>
      </svg>
    );

    //submit our form and redirect to the filterPage
    const onSubmit=(event:any)=>{
      event.preventDefault();      
      history.push('/404');
    }    
    

  return (
    <Fragment>
      <div className={styles.dropbox} id='filter'>
        <div className={styles.title_}>
          <h3>Обери своє майбутнє</h3>
        </div>
        <form onSubmit={onSubmit} className={styles.form}>
          <div className={styles.selectors}>
            <div className={styles.box}>
              <DropboxElement
                data={direction}
                keyId={0}
                listName={'Direction'}
                listTitle={'Напрями'}
              ></DropboxElement>
            </div>
            <div className={styles.box}>
              <DropboxElement
                data={speciality}
                keyId={1}
                listName={'Speciality'}
                width={21.75}
                listTitle={'Спеціальності'}
              ></DropboxElement>
            </div>
            <div className={styles.box}>
              <DropboxElement
                data={university}
                keyId={2}
                listName={'University'}
                listTitle={'Університети'}
              ></DropboxElement>
            </div>
            <button type={'submit'}>
              <span className={styles.searchText}>Пошук</span>
              <span className={styles.searchIcon}>
              {searchIcont}
              </span>
            </button>
          </div>
        </form>
        <div className={styles.filter1}>
          <img src='../assets/images/filter1.svg' alt='filter1'></img>
        </div>
        <div className={styles.filter2}>
          <img src='../assets/images/filter2.svg' alt='filter2'></img>
        </div>
        <div className={styles.filter3}>
          <img src='../assets/images/filter3.svg' alt='filter3'></img>
        </div>
      </div>
    </Fragment>
  );
};
export default Filter;
