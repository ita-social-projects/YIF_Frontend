import React from 'react';
import styles from './home.module.css';
import BannerLower from '../../components/bannerLower';

const Home = () => {
  return (
    <>
      <div className={styles.header}>Header</div>
      <div className={styles.banner}>Banner</div>
      <div className={styles.filter}>Filter</div>
      <div className={styles.about}>About</div>
      <BannerLower  />
      <div className={styles.partners}>Partners</div>
      <div className={styles.footer}>Footer</div>
    </>
  );
};

export default Home;
