import React, { Fragment } from 'react';
import styles from './graduateCabinetPage.module.scss';
import {
  Header,
  Footer,
  UserWorksSpace,
  UniversityMaps,
} from '../../components';

const UserCabinet = () => {
  return (
    <Fragment>
      <Header />
      <UserWorksSpace />
      <UniversityMaps />
      <Footer />
    </Fragment>
  );
};
export default UserCabinet;
