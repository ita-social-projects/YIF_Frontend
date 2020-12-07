import React from 'react';
import styles from './home.module.scss';
import { Header, Banner, BannerLower,Dropbox } from '../../components';


const Home = () => { 
  return (
    <>
      <Header />
      <Banner />
      <Dropbox/>
      <div className={styles.about}>About</div>
      <BannerLower />
      <div className={styles.partners}>Partners</div>
      <div className={styles.footer}>Footer</div>
    </>
  );
};

export default Home;
