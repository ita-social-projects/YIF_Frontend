import React from 'react';
import styles from './home.module.scss';
import {
  Header,
  Banner,
  BannerLower,
  Partners,
  AboutUs,
} from '../../components';
import ErrorBoundry from '../../errorBoundry';

import FakeRequest from '../../components/_fakeRequest'; // delete later

const Home = () => {
  return (
    <>
      <ErrorBoundry>
        <Header />
        <Banner />
        <div className={styles.filter}>Filter</div>
        <AboutUs />
        <BannerLower />
        <Partners />
        <div className={styles.footer}>Footer</div>
        {/* Delete lower component later: */}
        <FakeRequest />
      </ErrorBoundry>
    </>
  );
};

export default Home;
