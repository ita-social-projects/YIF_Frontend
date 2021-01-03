import React from 'react';
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

import {
  FakeLogin,
  FakeRegistration,
} from '../../components/_fakeRequest/fakeLogin'; // delete later

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
        <BannerLower />
        <Partners />
        <Footer />
        {/* Delete lower component later: */}
        <FakeLogin />
        <FakeRegistration />
      </ErrorBoundry>
    </>
  );
};

export default Home;
