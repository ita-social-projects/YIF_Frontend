import React from 'react';
import styles from './home.module.scss';
import { Header, Banner, BannerLower, Partners,Filter,Footer} from '../../components';
import ErrorBoundry from '../../errorBoundry';

import FakeRequest from '../../components/_fakeRequest'; // delete later


const Home = () => { 
  return (
    <>
      <ErrorBoundry>
        <Header />
        <Banner />
        <Filter/>
        <div className={styles.about}>About</div>
        <BannerLower />
        <Partners />
        <Footer />
        {/* Delete lower component later: */}
        {/* <FakeRequest />*/}
      </ErrorBoundry>
    </>
  );
};

export default Home;
