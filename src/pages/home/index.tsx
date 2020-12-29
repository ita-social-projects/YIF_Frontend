import React from 'react';
import styles from './home.module.scss';
import {
  Header,
  Banner,
  BannerLower,
  Partners,
  Filter,
  AboutUs,
  Footer,
} from '../../components';
import ErrorBoundry from '../../errorBoundry';

import FakeLogin from '../../components/_fakeRequest/fakeLogin'; // delete later

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
        <AboutUs />
        <BannerLower handleClick={handleClick} />
        <Partners />
        <Footer />
        {/* Delete lower component later: */}
        <FakeLogin />
      </ErrorBoundry>
    </>
  );
};

export default Home;
