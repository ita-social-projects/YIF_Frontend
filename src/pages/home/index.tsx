import React,{useState} from 'react';
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
import {useGetAllListData} from '../../services/useFilter';

const handleClick = () => {
  const elem = document.getElementById('filter') as HTMLDivElement;

  elem.scrollIntoView({
    block: 'center',
    behavior: 'smooth',
  });
};



const Home = () => {
  useGetAllListData('https://localhost:44324/api/University/Abbreviations','setUniversity');
  useGetAllListData('https://localhost:44324/api/Specialty/Names','setSpeciality');
  useGetAllListData('https://localhost:44324/api/Direction/Names','setDirection');
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
