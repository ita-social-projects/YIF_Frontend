import React from 'react';
import { Dropbox } from '../../components';
import styles from './home.module.css';


const Home = () => { 
  return (
    <>
      <div className={styles.header}>Header</div>
      <div className={styles.banner}>Banner</div>
      <Dropbox/>
      <div className={styles.about}>About</div>
      <div className={styles.cta}>Call to action</div>
      <div className={styles.partners}>Partners</div>
      <div className={styles.footer}>Footer</div>
    </>
  );
};

export default Home;
