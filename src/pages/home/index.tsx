import React from 'react';
import styles from './home.module.scss';
import {
  Header,
  Banner,
  BannerLower,
  Partners,
  Filter,
} from '../../components';
import ErrorBoundry from '../../errorBoundry';

import FakeRequest from '../../components/_fakeRequest'; // delete later

const handleClick = () => {
  const elem = document.getElementById('filter') as HTMLDivElement;

  elem.scrollIntoView({
    block: 'center',
    behavior: 'smooth',
  });
};

const Home = () => {
  return (
    <>
      <ErrorBoundry>
        <Header />
        <Banner handleClick={handleClick} />
        <Filter />
        <div className={styles.about}>About</div>
        <BannerLower handleClick={handleClick} />
        <Partners />
        <div className={styles.footer}>Footer</div>
        {/* Delete lower component later: */}
        {/* <FakeRequest /> */}
      </ErrorBoundry>
    </>
  );
};

export default Home;
