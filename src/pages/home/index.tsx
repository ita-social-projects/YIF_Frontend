import React from 'react';
import styles from './home.module.scss';
import { Header, Banner, BannerLower, Slider } from '../../components';


const Home = () => {
  return (
    <>
      <Header />
      <Banner />
      <div className={styles.filter}>Filter</div>
      <div className={styles.about}>About</div>
      <Slider />
      <BannerLower />
      <div className={styles.partners}>Partners</div>
      <div className={styles.footer}>Footer</div>
    </>
  );
};

export default Home;
