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
      </ErrorBoundry>
    </>
  );
};

export default Home;
