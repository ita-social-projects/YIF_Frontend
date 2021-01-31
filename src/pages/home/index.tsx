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
      <Header />
      <Banner handleClick={handleClick} />
      <Filter />
      <AboutUs />
      <BannerLower />
      <Partners />
      <Footer />
    </>
  );
};

export default Home;
