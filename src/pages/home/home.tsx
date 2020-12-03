import React from 'react';
import { Dropbox } from '../../components';
import styles from './home.module.css';

//this is a dummy data. When we will have fetch() to the database - delete them
let university:string[]=['u1','u2','u3','u4'];
let direction:string[]=['d1','d2','d3','d4'];
let speciality:string[]=['s1','s2','s3','s4'];

const resetFilter =()=>{
  const selectors = document.querySelectorAll('select');
  for(let a:number = 0;a<3;a++){
      selectors[a].selectedIndex=0;
      for(let b:number = 0; b<5;b++){
          selectors[a].options[b].hidden=false;
      }
  }
  
}

const filter1 =()=>{
  const selectors = document.querySelectorAll('select');
  if(selectors[0].selectedIndex===1){
      selectors[1].options[2].hidden=true
      selectors[1].options[3].hidden=true
      selectors[1].selectedIndex=1;

      selectors[2].options[1].hidden=true
      selectors[2].options[2].hidden=true
      selectors[2].selectedIndex=1;
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

const Home = () => { 
  return (
    <>
      <div className={styles.header}>Header</div>
      <div className={styles.banner}>Banner</div>
      <Dropbox 
          university={university} 
          direction={direction}
          speciality={speciality}
          filter1={filter1}
          resetFilter={resetFilter}
      ></Dropbox>
      <div className={styles.about}>About</div>
      <div className={styles.cta}>Call to action</div>
      <div className={styles.partners}>Partners</div>
      <div className={styles.footer}>Footer</div>
    </>
  );
};

export default Home;
