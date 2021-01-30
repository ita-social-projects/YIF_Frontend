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
import {useGetAllListData} from '../../services/useFilter';
import { APIUrl } from '../../services/endpoints';

const handleClick = () => {
  const elem = document.getElementById('filter') as HTMLDivElement;

  elem.scrollIntoView({
    block: 'center',
    behavior: 'smooth',
  });
};



const Home = () => {
  useGetAllListData(`${APIUrl}University/Abbreviations`,'setUniversity');
  useGetAllListData(`${APIUrl}Specialty/Names`,'setSpeciality');
  useGetAllListData(`${APIUrl}Direction/Names`,'setDirection');
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
