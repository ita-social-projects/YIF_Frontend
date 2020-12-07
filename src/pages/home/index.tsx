import React from 'react';
import {Slider} from "../../components/slider";
import styles from './home.module.scss';
import { Header, Banner, BannerLower } from '../../components';


const Home = () => {
  return (
    <>
      <Header />
      <Banner />
      <div className={styles.filter}>Filter</div>
      <div className={styles.about}>About</div>
      <div className={styles.cta}>Call to action</div>
      <Slider />
      <BannerLower />
      <div className={styles.partners}>Partners</div>
      <div className={styles.footer}>Footer</div>
    </>
  );
};

export default Home;
