import React from 'react';
import styles from './home.module.scss';
import { Header, Banner } from '../../components';

const Home = () => {
  return (
    <>
      <Header />
      <Banner />
      <div className={styles.filter}>Filter</div>
      <div className={styles.about}>About</div>
      <div className={styles.cta}>Call to action</div>
      <div className={styles.partners}>Partners</div>
      <div className={styles.footer}>Footer</div>
    </>
  );
};

export default Home;
